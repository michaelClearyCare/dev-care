import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Devtools from './Devtools'

chrome.tabs.query({ active: true, currentWindow: true }, tab => {
  ReactDOM.render(<Devtools />, document.getElementById('devtools'))
})

chrome.devtools.panels.create('CareDev', null, '/devtools.html', null)

chrome.devtools.panels.elements.createSidebarPane("My Sidebar", function(sidebar) {
  sidebar.setObject({ some_data: "Some data to show" })
})