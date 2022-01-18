export const ephemeralScript = (path: string) => {
  if (chrome?.runtime) {
    const script = document.createElement('script')
    script.src = chrome.runtime.getURL(path)
    script.dataset.id = chrome.runtime.id
    script.onload = () => document.body.removeChild(script)
    document.body.appendChild(script)
  }
}
