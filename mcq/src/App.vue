<script setup lang="ts">
import { ref, provide, defineAsyncComponent } from "vue"
import Nav from "./components/Nav.vue"
// import Login from "./components/Login.vue";
// import Home from "./components/Home.vue";
import PocketBase from "pocketbase"

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

// async function createMCQs() {
//   try {
//     const data = await import(`./mcqs-archive/gt1/c6.json`)
//     let mcqs = data.default

//     const promises = mcqs.map((mcq, i) =>
//       pb.collection("mcqs").create(
//         {
//           chapter: "Psychopharmacology: antidepressants and anxiolytics",
//           book: "gt1",
//           ...mcq,
//         },
//         { requestKey: mcq.number.toString() }
//       )
//     )
//     const results = await Promise.all(promises)
//     console.log("MCQs created successfully:", results)
//   } catch (error) {
//     console.error("Error creating MCQs:", error)
//   }
// }
</script>

<template>
  <Nav :show="isLoggedIn" @logout="handleLogout" />
  <Home v-if="isLoggedIn && pb.authStore.record?.email !== 'amena@mcq.com'" />
  <!-- <Home2 v-if="isLoggedIn" /> -->
  <AddMCQ v-if="isLoggedIn && pb.authStore.record?.email === 'amena@mcq.com'" />
  <Login v-if="!isLoggedIn" @login="handleLogin" />
  <!-- <button @click="createMCQs">upload</button> -->
</template>

<style>
:root {
  --pico-font-family-sans-serif: Rubik, system-ui, "Segoe UI", Oxygen, Ubuntu,
    Cantarell, Helvetica, Arial, "Helvetica Neue", sans-serif,
    var(--pico-font-family-emoji);
}
</style>
