<script setup lang="ts">
import { ref } from "vue";
import Nav from "./components/Nav.vue";
import Login from "./components/Login.vue";
import Home from "./components/Home.vue";

const isLoggedIn = ref(false);

function handleLogin() {
  isLoggedIn.value = true;
}

function handleLogout() {
  isLoggedIn.value = false;
}
</script>

<template>
  <Nav :show="isLoggedIn" @logout="handleLogout" />
  <Home v-if="isLoggedIn" />
  <Login v-else @login="handleLogin" />
</template>
