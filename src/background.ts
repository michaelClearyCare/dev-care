import { ContentMessageTypes, sendContentMessage } from './contentScript'
import { handleNetRequests } from './messageHandlers/netRequests'
import { GoRequestPayload, handleGoServerRequest } from './serverActions'
import { DevtoolsPayload } from './devtools/Devtools'

export type BackgroundMessagePayload = GoRequestPayload | DevtoolsPayload
export interface BackgroundMessage { type: BackgroundMessageTypes, payload: BackgroundMessagePayload }

export enum BackgroundMessageTypes {
  REQUEST_CONTENT = 'REQUEST_CONTENT', // Send content from a web request
  INJECTION_TEST = 'INJECTION_TEST',
  GO_REQUEST = 'GO_REQUEST'
}

// TODO test this to replace if checks in the switch statement that are needed to prevent type errors because typescript cannot determine payload type at compile time
const validatePayload = (payload: BackgroundMessagePayload, expectedType: BackgroundMessagePayload) => {
  return Object.keys(payload).every((key) => key in expectedType)
}

chrome.runtime.onMessage.addListener(({ type, payload }: BackgroundMessage, sender, sendResponse) => {
  if (!Object.values(BackgroundMessageTypes).includes(type)) return

  switch (type) {
    case BackgroundMessageTypes.GO_REQUEST:
      // payload should look like this: { action: GoRequestActions, data }
      //   ex:   { action: GoRequestActions.GET_LOCAL_AUTH_TOKEN, data: 'Bearer xxxxxxxxxxx' }
      if (('action' in payload)) handleGoServerRequest(payload)
      break

    case BackgroundMessageTypes.REQUEST_CONTENT:
      // TODO -- probably should move this case to a port and open comms between devtools and content scripts. Background can act as gatekeeper and router.
      if (('request' in payload)) handleNetRequests(payload)
      break

    case BackgroundMessageTypes.INJECTION_TEST: 
      console.log(payload)
      break

    default: console.error('Invalid message type', { type, payload, sender })
  }

  return true
})

const interceptBearerToken = (req: chrome.webRequest.WebRequestHeadersDetails) => {
  let hasBearerToken = false
  if (!hasBearerToken && req.method === 'POST') {
    const bearerToken = req.requestHeaders.filter( header => header.name === 'authorization')?.[0]?.value
    if (bearerToken) {
      hasBearerToken = true
      sendContentMessage({ type: ContentMessageTypes.STORE_BEARER_TOKEN, payload: { bearerToken }})
    }
  }
}

if (chrome.webRequest) {
  // Intercept Bearer Token Listener - passes message to content script to store
  chrome.webRequest.onBeforeSendHeaders.addListener( req => {
    interceptBearerToken(req)
  }, { urls: ['https://*.carezen.net/api/graphql'] }, ['requestHeaders'])
  
  // Amplitude Logging Listener - passes message on to devtools
  chrome.webRequest.onBeforeRequest.addListener( details => {
    const amplitudeEvents = JSON.parse(details.requestBody.formData.e[0])
    sendContentMessage({ type: ContentMessageTypes.AMPLITUDE_LOGGING, payload: amplitudeEvents })
  
  }, {urls: ['https://*.amplitude.com/*']}, ['requestBody'])
}
