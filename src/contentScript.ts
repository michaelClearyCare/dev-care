import { ephemeralScript } from './utils/scriptInjection'
import { DevtoolsMessageTypes } from './devtools/Devtools'
import {getCLS, getFID, getLCP} from 'web-vitals';

// Need to preserve logs to view some of this data, JSON strigify works too but hard to visually parse
getCLS(({ delta, entries, id, name, value }) => {
  console.log('CLS:', { delta, entries, id, name, value })

  const layoutShiftEntries = entries.filter( ({ entryType }) => entryType === 'layout-shift')

  console.log('hello')
  console.log(JSON.stringify(layoutShiftEntries))
  layoutShiftEntries.forEach((entry) => {
    const el = document.createElement('p')
    el.innerHTML = `${entry.duration} ${entry.entryType} ${entry.name}`
    document.body.appendChild(el)
  })

  // const layoutShifts = layoutShiftEntries.map((entry) => ({
  //   elements: entry.sources.map(({ currentRect, node, previouseRect }) => ({
  //     node,
  //     delta,
  //     duration: sources.duration
  //   }))
  // }))

  // console.log('LAYOUT SHIFTS:', layoutShifts, true)

  getFID(data => console.log('FID:', data))
  getLCP(data => console.log('LCP:', data))
})

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
    default:
      console.error(`contentScript received invalid message`, { type, payload, sender })
  }

  return true
})