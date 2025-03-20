<script setup lang="ts">
import { ref, defineEmits } from "vue"
import PocketBase from "pocketbase"

let user = ref("")
let password = ref("")
let login = ref(false)
let loading = ref(false)
let error = ref("")

const emit = defineEmits(["login"])
const pb = new PocketBase("https://mcq-db.dakakean.com")

const authenticate = async () => {
  loading.value = true
  error.value = ""
  if (user.value !== "" && password.value !== "") {
    console.log("trying to log in")

    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(user.value, password.value)

      login.value = pb.authStore.isValid

      if (login.value) {
        emit("login")
      }
    } catch (err) {
      console.error(err)
      error.value = "Login failed. Please check your credentials and try again."
    }
  } else {
    error.value = "Please enter both username and password."
  }
  loading.value = false
}
</script>

<template>
  <div class="container" v-if="!login">
    <input
      name="login"
      placeholder="Username"
      aria-label="Login"
      autocomplete="username"
      v-model="user"
      @keyup.enter="authenticate"
    />
    <input
      type="password"
      name="password"
      placeholder="Password"
      aria-label="Password"
      autocomplete="current-password"
      v-model="password"
      @keyup.enter="authenticate"
    />
    <button
      class="login"
      :aria-busy="loading"
      type="button"
      value="Login"
      @click.prevent="authenticate"
    >
      {{ loading ? "" : "Login" }}
    </button>
    <p v-if="error" class="error">{{ error }}</p>
    <p>
      Get your free account by contacting me on telegram
      <a href="https://t.me/alnoorimustafa94"> click here </a>
    </p>
  </div>
</template>

<style scoped>
.container {
  margin: auto;
  margin-top: 20%;
}

.login {
  width: 100%;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
