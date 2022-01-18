# Dev Care (A Chrome Extension)

## Documentation
* [**Dev Care Wiki**](https://carecom.atlassian.net/wiki/spaces/~215318667/pages/17348953856/Dev+Care+A+Chrome+Extension)
* [Chrome Extension MV2](https://developer.chrome.com/docs/extensions/mv2/)
  * Manifest version 2 is being phased out, [supposedly by January 2023](https://developer.chrome.com/docs/extensions/mv3/mv2-sunset/).
    As of the start of this project, version 3 is not near complete so we will need to rewrite the entire app eventually using [mv3](https://developer.chrome.com/docs/extensions/mv3/intro/)

## Install

1. Go to [*chrome://extensions*](chrome://extensions) in Google Chrome
2. Turn on **Developer mode** with the toggle in the top-right of the page
3. Click **Load unpacked extension...** and select the *dist* folder from this repo
4. Click on **Details** for this extension and toggle on **Allow in Incognito**
5. Click the *puzzle piece* icon at the top-right of the screen and **pin** the extension

---
## Development

### Install dependencies
`yarn install`

**Start Server**

`yarn dev` &nbsp; to compile once

&nbsp; &nbsp; &nbsp;\- *or* -

`yarn watch` &nbsp; to run in watch mode (just refresh page to see changes)

**Debug**

Open stand-alone devtools that hook into the popup

Run this from the top-level in a separate terminal while running the app

`yarn react-devtools`

**Build for Production**

`yarn build` &nbsp; to build a minified version

---
## Have Fun!
Click the Care icon in your extensions bar to open the popup window. This is where you can interact with the core functionality of the extension. New features will be added here periodically.

Some features may work behind the scenes and do not require a UI. These features will usually have configurable options and an options page may be added eventually.

---
## Issues, Comments, Questions, Requests?
Please reach out [michael.cleary@care.com](mailto:michael.cleary@care.com?subject=CareDev%20Chrome%20Extension%20Feedback)

---
> ## TODO
> * Test injection script
> * Implement, document, and test Logging
> * Build out request interceptor. Amplitude and graphql requests can be filtered (already implemented). Need to display events and create toggle in popup to control this functionality