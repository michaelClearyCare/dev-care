// chrome-extension://ehlanpbjmhapnhehikcnejcfngffpalh/popup.html
import React from "react"
import CopyBearerTokenButton from "./components/CopyBearerTokenButton"
import CopyGraphqlJwtBearerTokenButton from "./components/CopyGraphqlJwtBearerToken"
import "./styles.scss"

export const Popup = () => (
  <main>
    <CopyBearerTokenButton />
    <CopyGraphqlJwtBearerTokenButton />
  </main>
)

export default Popup