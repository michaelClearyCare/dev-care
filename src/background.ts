import { ContentMessageTypes, sendContentMessage } from './contentScript'

export enum BackgroundMessageTypes {
  INJECTION_TEST
}

chrome.runtime.onMessage.addListener(({ type, payload }, sender, sendResponse) => {
  switch(type) {
    case BackgroundMessageTypes.INJECTION_TEST: 
      console.log(payload)
      break
    default: console.error('Invalid message type', { type, payload, sender })
  }

  return true
})

chrome.webRequest.onBeforeSendHeaders.addListener(
  req => {
    if (req.method === 'POST') {
      const bearerToken = req.requestHeaders.filter( header => header.name === 'authorization')?.[0]?.value
      sendContentMessage({ type: ContentMessageTypes.STORE_BEARER_TOKEN, payload: { bearerToken } })
    }
  },
  {urls: ["https://*.carezen.net/api/graphql"]},
  ["requestHeaders"]
)