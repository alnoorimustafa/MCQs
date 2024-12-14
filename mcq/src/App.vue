<script setup lang="ts">
import { ref } from "vue";
import BestOfFive from "./components/BestOfFive.vue";
import Book600 from "./components/Book600.vue";

let page = ref("");
let selectedImage = ref<string | null>(null); // Track the selected image

const selectImage = (image: string) => {
  page.value = image;
  console.log("Selected Image:", image); // Debugging line
  selectedImage.value = new URL(`./assets/${image}.png`, import.meta.url).href;
  window.scrollTo(0, 0); // Scroll to the top of the page
};

const cancelSelection = () => {
  selectedImage.value = null; // Reset the selection
};
</script>

<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
  />
  <div class="container">
    <nav>
      <ul>
        <li>Psychiatry MCQs</li>
      </ul>
      <ul>
        <li>Dr. Mustafa Alnoori Wish You Luck</li>
      </ul>
    </nav>
  </div>
  <div class="container">
    <div class="grid mt-2">
      <div class="center" v-if="!selectedImage" @click="selectImage('bof1')">
        <img src="./assets/bof1.png" alt="" />
      </div>
      <div class="center" v-if="!selectedImage" @click="selectImage('bof2')">
        <img @click="page = 'bof2'" src="./assets/bof2.png" alt="" />
      </div>
      <div class="center" v-if="!selectedImage" @click="selectImage('bof3')">
        <img @click="" src="./assets/bof3.png" alt="" />
      </div>
      <div class="center" v-if="!selectedImage" @click="selectImage('600p1')">
        <img src="./assets/600p1.png" alt="" />
      </div>
      <div class="center" v-if="!selectedImage" @click="selectImage('600p2')">
        <img src="./assets/600p2.png" alt="" />
      </div>
      <div class="center" v-if="!selectedImage">
        <img src="./assets/501.png" alt="" />
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
  <BestOfFive
    v-if="page === 'bof1' || page === 'bof2' || page === 'bof3'"
    :selectedPaper="selectedImage ? page : ''"
  />
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

.azure {
  color: #017fc0;
}

.image-container {
  position: relative; /* Position relative for absolute positioning of the button */
}

.cancel-button {
  position: absolute;
  top: 10px; /* Adjust as needed */
  right: 10px; /* Adjust as needed */
  background: red;
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
</style>
