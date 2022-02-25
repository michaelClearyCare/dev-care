# Dev Care (A Chrome Extension)

## Documentation
* [**Dev Care Wiki**](https://carecom.atlassian.net/wiki/spaces/~215318667/pages/17348953856/Dev+Care+A+Chrome+Extension)
* [Chrome Extension MV2](https://developer.chrome.com/docs/extensions/mv2/)
  * Manifest version 2 is being phased out, [supposedly by January 2023](https://developer.chrome.com/docs/extensions/mv3/mv2-sunset/).
    As of the start of this project, version 3 is not near complete so we will need to rewrite the entire app eventually using [mv3](https://developer.chrome.com/docs/extensions/mv3/intro/)

## Install

1. Go to [*chrome://extensions*](chrome://extensions) in a Chrome browser
2. Turn on **Developer mode** with the toggle in the top-right of the page
3. Click **Load unpacked extension...** and select the *dist* folder from this repo
4. Click on **Details** for this extension and toggle on **Allow in Incognito**
5. Click the *puzzle piece* icon at the top-right of the screen and **pin** the extension

---
## Development

### Install dependencies
`yarn install`

**Start Server**

`yarn dev` &nbsp; to compile

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

## Contribution Guide
Please keep files small and reuse code as much as possible.

Try to avoid 3rd party libraries, keep dependancies low, and please, no semi-colons 😉

New features should have an associated Jira ticket in this epic: [**ENT-1736**](https://carecom.atlassian.net/browse/ENT-1736)

Anyone can create or pick up any open ticket.

PRs should be reviewed and approved, though there is no formal process yet.

---
## Issues, Comments, Questions, Requests?
Please reach out to [michael.cleary@care.com](mailto:michael.cleary@care.com?subject=CareDev%20Chrome%20Extension%20Feedback&body=Thank%20you%20for%20reaching%20out%20regarding%20the%20DevCare%20Chrome%20Extension.%0D%0A%0D%0A%0D%0APlease%20leave%20any%20feedback%20here.%0D%0A%20%20%0D%0A%0D%0A%0D%0AFor%20bug%20reporting,%20please%20provide%20the%20following:%0D%0A%0D%0A%20%20*%20%20Description%20of%20issue:%0D%0A%20%20%20%20%20%0D%0A%0D%0A%0D%0A%20%20*%20%20Screenshots%20(if%20applicable):%0D%0A%20%20%20%20%20%0D%0A%0D%0A%0D%0A%20%20*%20%20Steps%20to%20reproduce:%0D%0A%20%20%20%20%20%0D%0A%0D%0A%0D%0A)

---
> ## TODO
> * Build "copy local auth token" feature
> * Figure out how to detect system theme and toggle action icon accordingly
> * Figure out how to get the extension id to the devtools in order to open ports with the background/content scripts
> * Finish implementing zip folder script and add command to package.json
> * Test injection script
> * Get feedback on event logging and add to it
> * Add screenshot features
> * Add logging features (for reproducing issues later)
> * Implement data persistence for user settings
> * Implement omnibox keyword -- search wiki, perform actions (login, create user, etc.), etc.
> * Create custom text input field
> * Create options page
> * Create collapsable wrapper component for devtools and popup
> * Refactor **all** color variable names, combine appropriately in higher level shared folders
> * Build out request interceptor. Amplitude and graphql requests can be filtered (already implemented). Need to display events and create toggle in popup to control this functionality
> * Create method to log all `console.log`s to the main console. That would be dope! ( should have a way to show what context the log is from, maybe cool styling 😈 )
