import React, { useEffect, useState } from 'react'
import { ContentMessageTypes, sendContentMessage } from '../../../contentScript'
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

  return (
    <button
      className='copyBearerTokenButton'
      disabled={ !bearerToken }
      onClick={ requestBearerToken }
      title={ title }
    >
      { text }
    </button>
  )
}

export default CopyBearerTokenButton