import { ContentMessageTypes, sendContentMessage } from './contentScript'
import { handleNetRequests } from './messageHandlers/netRequests'

export enum BackgroundMessageTypes {
  REQUEST_CONTENT = 'REQUEST_CONTENT', // Send content from a web request
  INJECTION_TEST = 'INJECTION_TEST',
  REQUEST_GQL_JWT_TOKEN = 'REQUEST_GQL_JWT_TOKEN'
}

chrome.runtime.onMessage.addListener(({ type, payload }, sender, sendResponse) => {
  if (!Object.values(BackgroundMessageTypes).includes(type)) return

  switch(type) {
    case BackgroundMessageTypes.REQUEST_CONTENT:
      // TODO -- probably should move this case to a port and open comms between devtools and content scripts. Background can act as gatekeeper and router.
      const { request, content } = payload
      handleNetRequests({ request, content })
      break

    case BackgroundMessageTypes.INJECTION_TEST: 
      console.log(payload)
      break

    case BackgroundMessageTypes.REQUEST_GQL_JWT_TOKEN:
      fetchGraphqlJwtBearerToken(payload)
      break
    default: console.error('Invalid message type', { type, payload, sender })
  }

  return true
})

const interceptBearerToken = (req: chrome.webRequest.WebRequestHeadersDetails) => {
  let hasBearerToken = false
  if (!hasBearerToken && req.method === 'POST') {
    const bearerToken = req.requestHeaders.filter( header => header.name === 'authorization')?.[0]?.value
    if (bearerToken) {
      hasBearerToken = true
      sendContentMessage({ type: ContentMessageTypes.STORE_BEARER_TOKEN, payload: { bearerToken }})
    }
  }
}

const fetchGraphqlJwtBearerToken = (bearerToken: string) => {
//   var headers = new Headers();
//   headers.append("Host", "oathkeeper-httpbin.useast1.dev.omni.carezen.net");
//   headers.append("Authorization", `${bearerToken}`);

//   const fetch = require('node-fetch')
//   const https = require('https')

//   const httpsAgent = new https.Agent({
//     rejectUnauthorized: false
//   })

//   console.log('Agent value:', httpsAgent)

//   var requestOptions = {
//     method: 'GET',
//     headers: headers,
//     agent: httpsAgent,
//     redirect: 'follow' as RequestRedirect
//   };

// fetch("https://useast1-istioingressgw-int.dev.omni.carezen.net/headers", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
// }

  // const request = require('request');
  // const myArgs = process.argv.slice(2);
  // ​
  // const headers = {
  //     'Host': 'envoy-httpbin.useast1.dev.omni.carezen.net',
  //     'authorization': `${bearerToken}`
  // };
  // ​
  // const options = {
  //     url: 'https://useast1-istioingressgw-int.dev.omni.carezen.net/headers',
  //     headers: headers
  // };
  // ​
  // function callback(error, response, body) {
  //     if (!error && response.statusCode == 200) {
  //         const bodyJSON = JSON.parse(body)
  //         const bearerToken = bodyJSON?.headers?.Authorization;
  //         console.log({bearerToken})
  //         console.log("response " + {response})
  //     }
  // ​
  //     if(error){
  //         console.log({error})
  //     }
  // }
  // ​
  // request(options, callback);

  if (chrome.webRequest) {
    // Intercept Bearer Token Listener - passes message to content script to store
    chrome.webRequest.onBeforeSendHeaders.addListener( req => {
      interceptBearerToken(req)
    }, { urls: ['https://*.carezen.net/api/graphql'] }, ['requestHeaders'])
    
    // Amplitude Logging Listener - passes message on to devtools
    chrome.webRequest.onBeforeRequest.addListener( details => {
      const amplitudeEvents = JSON.parse(details.requestBody.formData.e[0])
      sendContentMessage({ type: ContentMessageTypes.AMPLITUDE_LOGGING, payload: amplitudeEvents })
    
    }, {urls: ['https://*.amplitude.com/*']}, ['requestBody'])
  }
}
