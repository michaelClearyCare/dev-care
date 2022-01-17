// chrome-extension://kbckahpkakoommammbfcehhhecjjmdcc/popup.html
import React from "react"
import CopyBearerTokenButton from "./components/CopyBearerTokenButton"
import "./styles.scss"


export const Popup = () => {

  return (
    <>
      <header>
        <h1>&lt;DevCare/&gt;</h1>
      </header>
      <main>
        <CopyBearerTokenButton />
      </main>
    </>
  )
}

export default Popup