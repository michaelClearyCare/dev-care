import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Devtools from './Devtools'

const panelName = 'DevCare'

chrome.tabs.query({ active: true, currentWindow: true }, tab => {
  ReactDOM.render(<Devtools />, document.getElementById('devtools'))
})

chrome.devtools.panels.create(panelName, null, '/devtools.html')
