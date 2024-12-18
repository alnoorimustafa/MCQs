<script setup lang="ts">
import { ref } from "vue";
import BestOfFive from "./BestOfFive.vue";

const emit = defineEmits(["logout"]);

let page = ref("");

let selectedImage = ref<string | null>(null);

const selectImage = (image: string) => {
  page.value = image;
  selectedImage.value = new URL(
    `../assets/small/${image}.webp`,
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
  <div class="container">
    <div class="grid mt-2">
      <div class="center" v-if="!selectedImage" @click="selectImage('bof1')">
        <img loading="lazy" src="../assets/small/bof1.webp" alt="" />
      </div>
      <div class="center" v-if="!selectedImage" @click="selectImage('bof2')">
        <img
          loading="lazy"
          @click="page = 'bof2'"
          src="../assets/small/bof2.webp"
          alt=""
        />
      </div>
      <div class="center" v-if="!selectedImage" @click="selectImage('bof3')">
        <img loading="lazy" @click="" src="../assets/small/bof3.webp" alt="" />
      </div>
      <div class="center" v-if="!selectedImage" @click="selectImage('501')">
        <img loading="lazy" src="../assets/small/501.webp" alt="" />
      </div>
      <div class="center" v-if="!selectedImage" @click="selectImage('600-1')">
        <img loading="lazy" src="../assets/small/600-1.webp" alt="" />
      </div>
      <div class="center" v-if="!selectedImage" @click="selectImage('600-2')">
        <img loading="lazy" src="../assets/small/600-2.webp" alt="" />
      </div>
    </div>
    <div class="grid mt-2">
      <div class="center" v-if="!selectedImage" @click="selectImage('spmm')">
        <img loading="lazy" src="../assets/small/spmm.webp" alt="" />
      </div>
      <div class="center" v-if="!selectedImage" @click="selectImage('gt1')">
        <img loading="lazy" src="../assets/small/gt1.webp" alt="" />
      </div>
      <div class="center" v-if="!selectedImage" @click="selectImage('gt2')">
        <img loading="lazy" src="../assets/small/gt2.webp" alt="" />
      </div>
      <div class="center" v-if="!selectedImage" @click="selectImage('gt3')">
        <img loading="lazy" src="../assets/small/gt3.webp" alt="" />
      </div>
      <div class="center" v-if="!selectedImage" @click="selectImage('ghazi')">
        <img loading="lazy" src="../assets/small/ghazi.webp" alt="" />
      </div>
      <div class="center" v-if="!selectedImage" @click="selectImage('focus')">
        <img loading="lazy" src="../assets/small/focus.webp" alt="" />
      </div>
      <div class="center" v-if="selectedImage">
        <div class="image-container">
          <img loading="lazy" :src="selectedImage" alt="Selected Image" />
          <button class="cancel-button" @click="cancelSelection">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
  <BestOfFive v-if="page !== ''" :selectedBook="selectedImage ? page : ''" />
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
  max-width: 400px;
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

/* Media query for iPhone to show two columns */
@media (max-width: 800px) {
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Two columns */
    gap: 20px; /* Adjust gap as needed */
  }
}

.cancel-button {
  position: absolute;
  top: 10px; /* Adjust as needed */
  right: 10px; /* Adjust as needed */
  background: #d93526;
  border: none;
  cursor: pointer;
  color: white; /* Change color as needed */
}

.background-azure {
  background-color: #017fc0;
}

nav ul {
  color: white;
}
</style>
