// chrome-extension://ehlanpbjmhapnhehikcnejcfngffpalh/popup.html
import React from "react"
import CopyBearerTokenButton from "./components/CopyBearerTokenButton"
import "./styles.scss"

export const Popup = () => (
  <main>
    <CopyBearerTokenButton />
  </main>
)

export default Popup