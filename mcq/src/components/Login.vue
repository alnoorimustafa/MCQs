<script setup lang="ts">
import { ref, defineEmits } from "vue";
import PocketBase from "pocketbase";

let user = ref("samah@mcq.com");
let password = ref("12345678");
let login = ref(false);
let loading = ref(false);

const emit = defineEmits(["login"]);
const pb = new PocketBase("https://mcq-db.dakakean.com");

const authenticate = async () => {
  loading.value = true;
  if (user.value !== "" && password.value !== "") {
    console.log("trying to log in");

    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(user.value, password.value);

      console.log(pb.authStore.isValid);
      console.log(pb.authStore.token);
      console.log(pb.authStore.record?.id);

      login.value = pb.authStore.isValid;

      if (login.value) {
        emit("login");
      }
    } catch (error) {
      console.error(error);
    }
  }
};
loading.value = false;
</script>

<template>
  <div class="container" v-if="!login">
    <input
      name="login"
      placeholder="Login"
      aria-label="Login"
      autocomplete="username"
      v-model="user"
    />
    <input
      type="password"
      name="password"
      placeholder="Password"
      aria-label="Password"
      autocomplete="current-password"
      v-model="password"
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
</style>
