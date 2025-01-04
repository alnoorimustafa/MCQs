import { createApp } from "vue"

// @ts-ignore
import App from "./App.vue"

import "./registerServiceWorker"

createApp(App).mount("#app")

if (window.matchMedia("(display-mode: standalone)").matches) {
  console.log("This is running as PWA standalone.")
} else {
  console.log("This is not PWA.")
}
