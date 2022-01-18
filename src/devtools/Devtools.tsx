import React from "react"
import { BackgroundMessageTypes } from '../background'
import { safeJSONParse } from '../utils/parsing'

export const Devtools = () => {
  chrome.devtools.network.onRequestFinished.addListener( request => {
    request.getContent((content) => {
      // TODO -- maybe make this a port, lots of requests rapid-fire sometimes...
      chrome.runtime.sendMessage({ type: BackgroundMessageTypes.REQUEST_CONTENT, payload: { request, content: safeJSONParse(content).value }})

      // This logs to the main devtools console but the use of `eval()` is not great
      // chrome.devtools.inspectedWindow.eval(`
      //   console.log('content', ${content})
      // `)
    })
  })

  return (
    <>
      <header>
        <h1>&lt;DevCare/&gt;</h1>
      </header>
      <main>
        <p>Hello World!</p>
      </main>
    </>
  )
}

export default Devtools