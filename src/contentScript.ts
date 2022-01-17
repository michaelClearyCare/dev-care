let storedBearerToken: string

const urlOf = (path: string) => chrome.runtime.getURL(path)

const ephemeralScript = (path: string) => {
  const script = document.createElement('script')
  script.src = urlOf(path)
  script.dataset.id = chrome.runtime.id
  script.onload = () => document.body.removeChild(script)
  document.body.appendChild(script)
}

document.addEventListener('load', () => ephemeralScript('/dist/js/injection.js'))

export interface ContentMessage {
  type: ContentMessageTypes
  payload?: any
}

export enum ContentMessageTypes {
  STORE_BEARER_TOKEN,
  GET_BEARER_TOKEN,
  COPY_BEARER_TOKEN
}

export const sendContentMessage = (message: ContentMessage, callBack?: (...params: any[]) => any) => {
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, message, callBack)
  })
}

chrome.runtime.onMessage.addListener(({ type, payload }: ContentMessage, sender, sendResponse) => {
  switch(type) {
    case ContentMessageTypes.STORE_BEARER_TOKEN: {
      const { bearerToken } = payload
      storedBearerToken = bearerToken
      break
    }
    case ContentMessageTypes.GET_BEARER_TOKEN: {
      sendResponse(storedBearerToken)
      break
    }
    case ContentMessageTypes.COPY_BEARER_TOKEN: {
      sendResponse(storedBearerToken)
      break
    }
    default:
      console.error(`contentScript received invalid message`, { type, payload, sender })
  }

  return true
})