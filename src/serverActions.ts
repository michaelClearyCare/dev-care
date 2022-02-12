const BASE_URL = "http://127.0.0.1:8089"

// GoRequestActions must line up with the action names in actions.json
export enum GoRequestActions { GET_LOCAL_AUTH_TOKEN = 'get_local_auth_token' }
export enum GoRequestMethods { POST = 'POST', GET = 'GET' }

export interface GoRequest {
  method: GoRequestMethods;
  payload?: GoRequestPayload;
}

export type GoRequestPayload = {
  action: GoRequestActions;
  data?: any;
}

export const handleGoServerRequest = (payload: GoRequestPayload): void => {
  const { action } = payload

  switch (action) {
    case GoRequestActions.GET_LOCAL_AUTH_TOKEN:
      makeRequest({ method: GoRequestMethods.POST, payload })
      break

    default: console.error(`Invalid action received: ${action}, expected type GoRequestActions`)
  }
}

export const makeRequest = ({ method, payload: { action, data } }: GoRequest): void => {
  switch (method) {
    case GoRequestMethods.POST:
      const body = JSON.stringify({ action, data })
      fetch(`${BASE_URL}/action/`, { method: 'POST', body })
      break
      
    case GoRequestMethods.GET:
      // TODO add get requests when needed
      break

    default: console.error(`Invalid request method: ${method}, expected type GoRequestMethods`)
  }
}
