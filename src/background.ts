import { ContentMessageTypes, sendContentMessage } from './contentScript'
import { handleNetRequests } from './messageHandlers/netRequests'

export enum BackgroundMessageTypes {
  REQUEST_CONTENT = 'REQUEST_CONTENT', // Send content from a web request
  INJECTION_TEST = 'INJECTION_TEST',
  REQUEST_GQL_JWT_TOKEN = 'REQUEST_GQL_JWT_TOKEN'
}

chrome.runtime.onMessage.addListener(({ type, payload }, sender, sendResponse) => {
  if (!Object.values(BackgroundMessageTypes).includes(type)) return

  switch(type) {
    case BackgroundMessageTypes.REQUEST_CONTENT:
      // TODO -- probably should move this case to a port and open comms between devtools and content scripts. Background can act as gatekeeper and router.
      const { request, content } = payload
      handleNetRequests({ request, content })
      break

    case BackgroundMessageTypes.INJECTION_TEST: 
      console.log(payload)
      break

    case BackgroundMessageTypes.REQUEST_GQL_JWT_TOKEN:
      fetchGraphqlJwtBearerToken(payload)
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

const fetchGraphqlJwtBearerToken = (bearerToken: string) => {
  // const jwtRequest = `curl --insecure -v -H 'Host: oathkeeper-httpbin.useast1.dev.omni.carezen.net' https://useast1-istioingressgw-int.dev.omni.carezen.net/headers -H 'Authorization: ${bearerToken}'`
  fetch("https://useast1-istioingressgw-int.dev.omni.carezen.net/", {
    headers: {
      Authorization: bearerToken,
      Host: "oathkeeper-httpbin.useast1.dev.omni.carezen.net"
    }
  }).then(res => {
      console.log(res);
    });
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
