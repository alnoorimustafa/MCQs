<script setup lang="ts">
import { ref } from "vue";
import BestOfFive from "./components/BestOfFive.vue";
import Book600 from "./components/Book600.vue";

let page = ref("");
let selectedImage = ref<string | null>(null); // Track the selected image

const selectImage = (image: string) => {
  console.log("Selected Image:", image); // Debugging line
  selectedImage.value = new URL(image, import.meta.url).href; // Use URL constructor for correct path
};

const cancelSelection = () => {
  selectedImage.value = null; // Reset the selection
};
</script>

<template>
  <div class="container">
    <nav>
      <ul>
        <li><strong>MCQs</strong></li>
      </ul>
      <ul>
        <li>
          <button
            :class="page === 'bof' ? 'primary' : 'secondary'"
            @click="page = 'bof'"
          >
            Best of Five
          </button>
        </li>
        <li>
          <button
            :class="page === 'spmm' ? 'primary' : 'secondary'"
            @click="page = 'spmm'"
          >
            SPMM
          </button>
        </li>
        <li>
          <button
            :class="page === '600' ? 'primary' : 'secondary'"
            @click="page = '600'"
          >
            600
          </button>
        </li>
      </ul>
    </nav>
  </div>
  <div class="container">
    <div class="grid mt-2">
      <div
        class="center"
        v-if="!selectedImage"
        @click="selectImage('./assets/bof1.png')"
      >
        <img src="./assets/bof1.png" alt="" />
      </div>
      <div
        class="center"
        v-if="!selectedImage"
        @click="selectImage('./assets/bof2.png')"
      >
        <img src="./assets/bof2.png" alt="" />
      </div>
      <div
        class="center"
        v-if="!selectedImage"
        @click="selectImage('./assets/bof3.png')"
      >
        <img src="./assets/bof3.png" alt="" />
      </div>
      <div
        class="center"
        v-if="!selectedImage"
        @click="selectImage('./assets/600p1.png')"
      >
        <img src="./assets/600p1.png" alt="" />
      </div>
      <div
        class="center"
        v-if="!selectedImage"
        @click="selectImage('./assets/600p2.png')"
      >
        <img src="./assets/600p2.png" alt="" />
      </div>
      <div class="center" v-if="!selectedImage">
        <img src="./assets/501.png" alt="" />
      </div>
      <div class="center" v-if="selectedImage">
        <div class="image-container">
          <img :src="selectedImage" alt="Selected Image" />
          <button class="cancel-button" @click="cancelSelection">X</button>
        </div>
      </div>
    </div>
  </div>
  <div class="hh">
    <div class="container">
      <BestOfFive v-if="page === 'bof'" />
      <Book600 v-if="page === '600'" />
    </div>
    <footer>
      <p class="copyright">
        &copy; 2024. Dr. Mustafa Alnoori. All rights are not reserved.
      </p>
    </footer>
  </div>
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
  max-width: 200px; /* set a maximum width */
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

.azure {
  color: #017fc0;
}

footer {
  text-align: center;
  padding: 1em;
  background-color: #f1f1f1;
  width: 100%;
}

.copyright {
  color: #0172ad;
}

.image-container {
  position: relative; /* Position relative for absolute positioning of the button */
}

.cancel-button {
  position: absolute;
  top: 5px; /* Adjust as needed */
  right: 5px; /* Adjust as needed */
  background: rgb(255, 45, 45);
  color: rgb(255, 255, 255); /* Change color as needed */
  font-size: 20px; /* Adjust size as needed */
  cursor: pointer;
  border-color: transparent;
  font-family: sans-serif;
}
</style>
