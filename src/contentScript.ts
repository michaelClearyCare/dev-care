import { ephemeralScript } from './utils/scriptInjection'
import { DevtoolsMessageTypes } from './devtools/Devtools'
import { BackgroundMessageTypes } from './background'

let storedBearerToken: string

document.addEventListener('load', () => ephemeralScript('/dist/js/injection.js'))

export interface ContentMessage {
  type: ContentMessageTypes
  payload?: any
}

export enum ContentMessageTypes {
  STORE_BEARER_TOKEN = 'STORE_BEARER_TOKEN', // Store bearer token for use later
  GET_BEARER_TOKEN = 'GET_BEARER_TOKEN', // Get stored bearer token
  COPY_BEARER_TOKEN = 'COPY_BEARER_TOKEN', // Copy bearer token to clipboard
  AMPLITUDE_LOGGING = 'AMPLITUDE_LOGGING', // Send intercepted amplitude logging event request data
  GET_GQL_JWT_TOKEN = 'GET_GQL_JWT_TOKEN'
}

// TODO this does not work
// if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
//   // Update browser action icon for dark mode
//   chrome.browserAction.setIcon({ path: '/careLogoDark.png' })
// }

export const sendContentMessage = (message: ContentMessage, callBack?: (...params: any[]) => any) => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    if (tabs[0]) chrome.tabs.sendMessage(tabs[0].id, message, callBack)
  })
}

chrome.runtime.onMessage.addListener(({ type, payload }: ContentMessage, sender, sendResponse) => {
  if (!Object.values(ContentMessageTypes).includes(type)) return

  switch(type) {
    case ContentMessageTypes.STORE_BEARER_TOKEN:
      console.log(`Storing bearer token ${payload?.bearerToken}`);
      storedBearerToken = payload?.bearerToken || storedBearerToken
      break
    case ContentMessageTypes.GET_BEARER_TOKEN:
      sendResponse(storedBearerToken)
      break
    case ContentMessageTypes.COPY_BEARER_TOKEN:
      sendResponse(storedBearerToken)
      break
    case ContentMessageTypes.AMPLITUDE_LOGGING:
      // Send logging data to devtools to display in DevCare tab
      chrome.runtime.sendMessage({ type: DevtoolsMessageTypes.LOG_AMPLITUDE_EVENT, payload })
      break
    case ContentMessageTypes.GET_GQL_JWT_TOKEN:
      chrome.runtime.sendMessage({ type: BackgroundMessageTypes.REQUEST_GQL_JWT_TOKEN, payload }, sendResponse)
      break
    default:
      console.error(`contentScript received invalid message`, { type, payload, sender })
  }

  return true
})