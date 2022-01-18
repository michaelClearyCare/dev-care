import { BackgroundMessageTypes } from './background'

const extensionId = document.currentScript.dataset.id
const port = chrome.runtime.connect(extensionId)

// TODO not working ... haven't even looked into it yet, probably wrong listener in background script
port.postMessage({ name: BackgroundMessageTypes.INJECTION_TEST, payload: { message: 'test open port message from injection script'}})
