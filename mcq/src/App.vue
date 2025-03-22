<script setup lang="ts">
import { ref, provide, defineAsyncComponent, computed } from "vue"
import Nav from "./components/Nav.vue"
// import Login from "./components/Login.vue";
// import Home from "./components/Home.vue";
import PocketBase from "pocketbase"
import Upload from "./components/upload.vue"

const Home = defineAsyncComponent(() => import("./components/Home.vue"))
// const Home2 = defineAsyncComponent(() => import("./components/Home2.vue"))
const Login = defineAsyncComponent(() => import("./components/Login.vue"))
const AddMCQ = defineAsyncComponent(() => import("./components/AddMCQ.vue"))

const pb = new PocketBase("https://mcq-db.dakakean.com")

provide("pb", pb)

declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

const isLoggedIn = ref(false)

async function handleLogin() {
  isLoggedIn.value = true
}

async function handleLogout() {
  isLoggedIn.value = false
}

if (pb.authStore.isValid) {
  isLoggedIn.value = pb.authStore.isValid
} else {
  console.log("User is not logged in")
}

// const isDarkMode = computed(
//   () => window.matchMedia("(prefers-color-scheme: dark)").matches
// )
</script>

<template>
  <div>
    <Nav :show="isLoggedIn" @logout="handleLogout" />
    <transition name="fade" mode="out-in">
      <div v-if="isLoggedIn && pb.authStore.record?.email !== 'amena@mcq.com'">
        <Home />
      </div>
      <div
        v-else-if="isLoggedIn && pb.authStore.record?.email === 'amena@mcq.com'"
      >
        <AddMCQ />
      </div>
      <div v-else>
        <Login @login="handleLogin" />
      </div>
    </transition>
    <!-- <Upload /> -->
  </div>
</template>

<style>
:root {
  --pico-font-family-sans-serif: Rubik, system-ui, "Segoe UI", Oxygen, Ubuntu,
    Cantarell, Helvetica, Arial, "Helvetica Neue", sans-serif,
    var(--pico-font-family-emoji);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

:root[data-theme="light"] {
  --background-color: #ffffff;
  --text-color: #000000;
}

:root[data-theme="dark"] {
  --background-color: #000000;
  --text-color: #ffffff;
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
}
</style>
