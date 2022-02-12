import React, { useState } from "react"
import { BackgroundMessageTypes } from '../background'
import { safeJSONParse } from '../utils/parsing'
import EventDisplay from "../shared/components/EventDisplay"
import './styles.scss'

export enum DevtoolsMessageTypes {
  LOG_AMPLITUDE_EVENT = 'LOG_AMPLITUDE_EVENT'
}

export type DevtoolsPayload = {
  request: any; // TODO add strict typing
  content: any;
}

export const Devtools = () => {
  chrome.devtools.network.onRequestFinished.addListener( request => {

    request.getContent( data => {
      if (!chrome.runtime) return console.error('Request attempted but chrome runtime is undefined', { request, data })

      const content = safeJSONParse(data).value
      // TODO -- maybe make this a port, lots of requests rapid-fire sometimes...
      chrome.runtime.sendMessage({
        type: BackgroundMessageTypes.REQUEST_CONTENT,
        payload: { request, content }
      })
    })
  })

  // const extensionId = window.localStorage.getItem('devCareExtensionId') // TODO not working -- trying to set this inside the injected script...
  // console.log(extensionId) // TODO not working

  // chrome.runtime.connect() // TODO not working -- need extension id to be able to use a port here

  const [ loggingEvents, setLoggingEvents ] = useState([])

  chrome.runtime.onMessage.addListener( ({ type, payload }: { type: DevtoolsMessageTypes, payload: any}, sender, sendResponse) => {
    if (type === DevtoolsMessageTypes.LOG_AMPLITUDE_EVENT) console.log(type, payload)
    if (!Object.values(DevtoolsMessageTypes).includes(type)) return

    switch (type) {
      case DevtoolsMessageTypes.LOG_AMPLITUDE_EVENT:
        setLoggingEvents([...loggingEvents, ...payload])
        break
      default:
        console.error('Devtools receieved invalid message:', { type, payload, sender })
        break
    }
  })

  const sampleEvent = {
    event_type: 'blah',
    event_properties: {
      screen_name: 'some page',
      web_platform: 'web',
      wps_group: 'my group'
    }
  }

  return (
    <div id='devtools'>
      <main>
        <EventDisplay loggingEvents={ loggingEvents } />
      </main>
    </div>
  )
}

export default Devtools