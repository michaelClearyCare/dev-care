export const handleNetRequests = ({ request, content }) => {
  const gqlRegex = /https:\/\/www\..+\.carezen.net\/api\/graphql/
  const amplitudeRegex = /https:\/\/api.amplitude.com\//
  const isAmplitudeRequest = request._resourceType === 'xhr' && amplitudeRegex.test(request.request.url)
  const isGraphQLRequest = request._resourceType !== 'preflight' && gqlRegex.test(request.request.url)

  if (isAmplitudeRequest) console.log('Amplitude', { request, content })
  if (isGraphQLRequest) console.log('GraphQL', { request, content })
}