<script setup lang="ts">
import PocketBase from "pocketbase";
import { ref } from "vue";

let user = ref("");
let password = ref("");
let login = ref(false);

const pb = new PocketBase("https://mcq-db.dakakean.com");

const authenticate = async () => {
  console.log("clicked");

  if (user.value !== "" && password.value !== "") {
    console.log("trying");
    console.log(user.value);
    console.log(password.value);

    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(user.value, password.value);

      console.log(pb.authStore.isValid);
      console.log(pb.authStore.token);
      console.log(pb.authStore.record?.id);

      login.value = pb.authStore.isValid;
    } catch (error) {
      console.error(error);
    }
  }
};

const deauthenticate = () => {
  console.log("de auth");

  if (pb.authStore.isValid) {
    console.log("de auth 2");
    try {
      pb.authStore.clear();
      login.value = pb.authStore.isValid;
    } catch (error) {
      console.log(error);
    }
  }
};
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
    <input type="button" value="Login" @click.prevent="authenticate" />
  </div>
  <div class="container" v-else>
    <input
      type="button"
      value="Logout"
      class="secondary"
      @click.prevent="deauthenticate"
    />
  </div>
</template>
