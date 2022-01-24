// import { ContentMessageTypes, sendContentMessage } from "../contentScript"

export const handleNetRequests = ({ request, content }) => {
  const gqlRegex = /https:\/\/www\..+\.carezen.net\/api\/graphql/
  // const amplitudeRegex = /https:\/\/api.amplitude.com\//
  // const isAmplitudeRequest = request._resourceType === 'xhr' && amplitudeRegex.test(request.request.url)
  const isGraphQLRequest = request._resourceType !== 'preflight' && gqlRegex.test(request.request.url)

  // TODO remove this if not useful. Seems like only the request is worth looking at, which is now handled in background.js
  // if (isAmplitudeRequest) {
  //   // Send data to content script to be injected into main page display
  //   console.log('Amplitude', { request, content })
  //   // chrome.runtime.sendMessage({ type: ContentMessageTypes.AMPLITUDE_LOGGING, payload: content }) TODO -- need to finish the receiving end and test this
  //   sendContentMessage({ type: ContentMessageTypes.AMPLITUDE_LOGGING, payload: { request, content } })
  // }
  if (isGraphQLRequest) {
    // TODO not sure what to do with this yet...
    console.log('GraphQL', { request, content })
  }
}