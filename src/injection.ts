import { BackgroundMessageTypes } from './background'

const extensionId = document.currentScript.dataset.id
window.localStorage.setItem('devCareExtensionId', chrome.runtime.id) // TODO not working -- need to somehow get the extension id to the devtools app to open a port
const port = chrome.runtime.connect(extensionId)

// TODO not working ... haven't even looked into it yet, probably wrong listener in background script
port.postMessage({ name: BackgroundMessageTypes.INJECTION_TEST, payload: { message: 'test open port message from injection script'}})
