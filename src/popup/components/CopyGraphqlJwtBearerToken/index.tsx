import React, { useEffect, useRef, useState } from 'react'
import { ContentMessageTypes, sendContentMessage } from '../../../contentScript'
import { FlatButton } from '../../../shared/components'

export const copyToClipboard = (text: string) => navigator.clipboard.writeText(text)

const initialText = 'Copy GraphQL JWT Token'
const successText = 'Copied to Clipboard'
const title = 'Copy the GraphQL JWT Authorization Bearer Token to the clipboard if you are logged in'
const textDelay = 3000

export const CopyGraphqlJwtBearerTokenButton = () => {
  const [ bearerToken, setBearerToken ] = useState('')
  const [ graphqlJwtBearerToken, setGraphqlJwtBearerToken ] = useState('')
  const [ text, setText ] = useState(initialText)

  const requestGraphqlJwtBearerToken = () => {
    copyToClipboard(graphqlJwtBearerToken)
    setText(successText)
    setTimeout(() => setText(initialText), textDelay)
  }

  useEffect(() => {
    sendContentMessage({ type: ContentMessageTypes.GET_BEARER_TOKEN }, setBearerToken)
  }, [bearerToken])

  const onClick = () => {
    if (bearerToken) {
      console.log('in onclick, bearer token:', bearerToken)
      sendContentMessage({ type: ContentMessageTypes.GET_GQL_JWT_TOKEN, payload: bearerToken }, setGraphqlJwtBearerToken)
      requestGraphqlJwtBearerToken()
    } // add else error state
  }

  // hiddenText is used to get max text width so text changing does not affect button width
  const hiddenText = useRef(null);
  const longestText = [ initialText, successText ].sort( (a, b) => b.length - a.length)[0]
  const width = hiddenText?.current?.clientWidth;

  return (
    <FlatButton
      className='copyGraphqlJwtBearerTokenButton'
      disabled={ !bearerToken }
      onClick={ onClick }
      title={ title }
    >
      <div style={{ width }}>{ text }</div>
      <div ref={ hiddenText } className='hidden'>{ longestText }</div>
    </FlatButton>
  )
}

export default CopyGraphqlJwtBearerTokenButton