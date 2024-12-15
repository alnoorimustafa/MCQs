<script setup lang="ts">
import { ref } from "vue";
import BestOfFive from "./BestOfFive.vue";
import Book600 from "./Book600.vue";

import PocketBase from "pocketbase";

const pb = new PocketBase("https://mcq-db.dakakean.com");

let page = ref("");
let login = ref(false);
login.value = pb.authStore.isValid;

let selectedImage = ref<string | null>(null);

const selectImage = (image: string) => {
  page.value = image;
  selectedImage.value = new URL(
    `../assets/large/${image}.png`,
    import.meta.url
  ).href;
  window.scrollTo(0, 0);
};

const cancelSelection = () => {
  selectedImage.value = null;
  page.value = "";
};
</script>

<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
  />
  <div class="container">
    <div class="grid mt-2">
      <div class="center" v-if="!selectedImage" @click="selectImage('bof1')">
        <img src="../assets/small/bof1.png" alt="" />
      </div>
      <div class="center" v-if="!selectedImage" @click="selectImage('bof2')">
        <img @click="page = 'bof2'" src="../assets/small/bof2.png" alt="" />
      </div>
      <div class="center" v-if="!selectedImage" @click="selectImage('bof3')">
        <img @click="" src="../assets/small/bof3.png" alt="" />
      </div>
      <div class="center" v-if="!selectedImage" @click="selectImage('600-1')">
        <img src="../assets/small/600-1.png" alt="" />
      </div>
      <div class="center" v-if="!selectedImage" @click="selectImage('600-2')">
        <img src="../assets/small/600-2.png" alt="" />
      </div>
      <div class="center" v-if="!selectedImage" @click="selectImage('501')">
        <img src="../assets/small/501.png" alt="" />
      </div>
      <div class="center" v-if="!selectedImage" @click="selectImage('spmm')">
        <img src="../assets/small/spmm.png" alt="" />
      </div>

      <div class="center" v-if="selectedImage">
        <div class="image-container">
          <img :src="selectedImage" alt="Selected Image" />
          <button class="cancel-button" @click="cancelSelection">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
  <BestOfFive v-if="page !== ''" :selectedBook="selectedImage ? page : ''" />
  <Book600 v-if="page === '600'" />
</template>

<style scoped>
html,
body {
  height: 100%;
  margin: 0;
}

.center {
  margin: auto;
  box-shadow: 1px 1px 3px black;
  border-radius: 2%;
}

.center img {
  width: 100%; /* or a specific width like 200px */
  height: auto; /* maintain aspect ratio */
  max-width: 300px;
  object-fit: cover; /* cover the area without distortion */
  border-radius: 2%;
}

.mt-2 {
  margin-top: 20px;
  margin-bottom: 20px;
}

.hh {
  display: flex;
  flex-direction: column;
  min-height: 90vh; /* Ensure the container takes full height */
}

.container {
  flex-grow: 1; /* Allow the main content to grow */
}

.image-container {
  position: relative; /* Position relative for absolute positioning of the button */
}

.cancel-button {
  position: absolute;
  top: 10px; /* Adjust as needed */
  right: 10px; /* Adjust as needed */
  background: #d93526;
  border: none;
  cursor: pointer;
  color: white; /* Change color as needed */
  font-size: 24px; /* Adjust size as needed */
}

/* Media query for iPhone to show two columns */
@media (max-width: 800px) {
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Two columns */
    gap: 20px; /* Adjust gap as needed */
  }
}

.background-azure {
  background-color: #017fc0;
}

nav ul {
  color: white;
}
</style>
