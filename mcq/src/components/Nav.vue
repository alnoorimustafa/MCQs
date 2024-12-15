<script setup lang="ts">
import { defineProps, ref } from "vue";
import PocketBase from "pocketbase";

const emit = defineEmits(["logout"]);
const pb = new PocketBase("https://mcq-db.dakakean.com");
const props = defineProps<{
  show: boolean;
}>();

const deauthenticate = () => {
  console.log("de auth");

  if (pb.authStore.isValid) {
    console.log("de auth 2");
    try {
      pb.authStore.clear();
      emit("logout");
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<template>
  <div class="background-azure">
    <div class="container">
      <nav>
        <ul>
          <li>Psychiatry MCQs</li>
        </ul>
        <div v-if="show">
          <ul>
            <li>Dr. Mustafa Alnoori Wish You Luck</li>
            <li>
              <input
                type="button"
                value="Logout"
                class="secondary"
                @click.prevent="deauthenticate"
              />
            </li>
          </ul>
        </div>
        <ul v-else>
          <li>Login please</li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.background-azure {
  background-color: #017fc0;
}
.background-red {
  background-color: #c00101;
}

nav ul {
  color: white;
}
</style>
