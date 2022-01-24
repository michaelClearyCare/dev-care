import React, { useEffect, useRef, useState } from 'react'
import { ContentMessageTypes, sendContentMessage } from '../../../contentScript'
import { FlatButton } from '../../../shared/components'
import './styles.scss'

export const copyToClipboard = (text: string) => navigator.clipboard.writeText(text)

const initialText = 'Copy Bearer Token'
const successText = 'Copied to Clipboard'
const title = 'Copy the Authorization Bearer Token to the clipboard if you are logged in'
const textDelay = 3000

export const CopyBearerTokenButton = () => {
  const [ bearerToken, setBearerToken ] = useState('')
  const [ text, setText ] = useState(initialText)

  const requestBearerToken = () => {
    copyToClipboard(bearerToken)
    setText(successText)
    setTimeout(() => setText(initialText), textDelay)
  }

  useEffect(() => {
    sendContentMessage({ type: ContentMessageTypes.GET_BEARER_TOKEN }, setBearerToken)
  }, [bearerToken])

  // hiddenText is used to get max text width so text changing does not affect button width
  const hiddenText = useRef(null);
  const longestText = [ initialText, successText ].sort( (a, b) => b.length - a.length)[0]
  const width = hiddenText?.current?.clientWidth;

  return (
    <FlatButton
      className='copyBearerTokenButton'
      disabled={ !bearerToken }
      onClick={ requestBearerToken }
      title={ title }
    >
      <div style={{ width }}>{ text }</div>
      <div ref={ hiddenText } className='hidden'>{ longestText }</div>
    </FlatButton>
  )
}

export default CopyBearerTokenButton