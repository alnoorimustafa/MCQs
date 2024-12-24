export function trackEvent(eventName: string, eventParams = {}) {
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, eventParams)
  } else {
    console.error("Google Analytics is not initialized.")
  }
}
