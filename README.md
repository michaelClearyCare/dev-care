# Dev Care (A Chrome Extension)

## Install

1. Go to [_chrome://extensions_](chrome://extensions) in Google Chrome
2. Turn on **Developer mode** with the toggle in the top-right of the page
3. Click **Load unpacked extension...** and select the _dist_ folder from this repo
4. Click on **Details** for this extension and toggle on **Allow in Incognito**

---
## Development

### Install dependencies
`yarn install`

**Start Server**

`yarn dev` &nbsp; to compile once

`yarn watch` &nbsp; to run in watch mode (just refresh page to see changes)

**Debug**

Open stand-alone devtools that hook into the popup

Run this from the top-level in a separate terminal while running the app

`yarn react-devtools`

**Build for Production**

`yarn build` &nbsp; to build a minified version

---
> ## TODO
> * Test injection script