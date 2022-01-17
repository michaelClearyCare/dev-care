import { BackgroundMessageTypes } from './background'

const extensionId = document.currentScript.dataset.id
const port = chrome.runtime.connect(extensionId)

port.postMessage({ name: BackgroundMessageTypes.INJECTION_TEST, payload: { message: 'test open port message from injection script'}})