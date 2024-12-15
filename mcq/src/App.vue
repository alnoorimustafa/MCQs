<script setup lang="ts">
import { ref, provide } from "vue";
import Nav from "./components/Nav.vue";
import Login from "./components/Login.vue";
import Home from "./components/Home.vue";
import PocketBase from "pocketbase";

const pb = new PocketBase("https://mcq-db.dakakean.com");

provide("pb", pb);

const isLoggedIn = ref(false);

async function handleLogin() {
  isLoggedIn.value = true;
}

async function handleLogout() {
  isLoggedIn.value = false;
}

if (pb.authStore.isValid) {
  isLoggedIn.value = pb.authStore.isValid;
} else {
  console.log("User is not logged in");
}

// async function createMCQs() {
//   try {
//     const data = await import(`./mcqs/spmm/spmm-2021-3.json`);
//     let mcqs = data.default;

//     const promises = mcqs.map(
//       (mcq, i) =>
//         pb.collection("mcqs").create(
//           {
//             chapter: "2021 Additional",
//             book: "spmm",
//             ...mcq,
//           },
//           { requestKey: mcq.question }
//         ) // Replace 'mcqs' with your collection name
//     );
//     const results = await Promise.all(promises);
//     console.log("MCQs created successfully:", results);
//   } catch (error) {
//     console.error("Error creating MCQs:", error);
//   }
// }
</script>

<template>
  <Nav :show="isLoggedIn" @logout="handleLogout" />
  <Home v-if="isLoggedIn" />
  <Login v-else @login="handleLogin" />
  <!-- <button @click="createMCQs">upload</button> -->
</template>

<style>
:root {
  --pico-font-family-sans-serif: Rubik, system-ui, "Segoe UI", Oxygen, Ubuntu,
    Cantarell, Helvetica, Arial, "Helvetica Neue", sans-serif,
    var(--pico-font-family-emoji);
}
</style>
