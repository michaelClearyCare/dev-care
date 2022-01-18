import { ContentMessageTypes, sendContentMessage } from './contentScript'
import { handleNetRequests } from './messageHandlers/netRequests'

export enum BackgroundMessageTypes {
  REQUEST_CONTENT,
  INJECTION_TEST
}

chrome.runtime.onMessage.addListener(({ type, payload }, sender, sendResponse) => {
  switch(type) {

    case BackgroundMessageTypes.REQUEST_CONTENT:
      // TODO -- probably should move this case to a port and open comms between devtools and content scripts. Background can act as gatekeeper and router.
      const { request, content } = payload
      handleNetRequests({ request, content })
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

chrome.webRequest.onBeforeSendHeaders.addListener( req => {
  interceptBearerToken(req)
}, { urls: ['https://*.carezen.net/api/graphql'] }, ['requestHeaders'])
