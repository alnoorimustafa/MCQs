<script setup lang="ts">
import { ref, inject } from "vue"
import { trackEvent } from "../analytics"
import BestOfFive from "./BestOfFive.vue"
import PocketBase from "pocketbase"
import Flag from "./Flag.vue"

const pb = inject("pb") as PocketBase

const emit = defineEmits(["logout"])

let page = ref("")
let flag = ref(false)
let editing = ref(true)

editing.value = pb.authStore.record?.email === "edit@mcq.com"

let selectedImage = ref<string | null>(null)

const resolveImage = (name: string) =>
  new URL(`../assets/small/${name}.webp`, import.meta.url).href

const images = [
  "flag",
  "bof1",
  "bof2",
  "bof3",
  "600-1",
  "600-2",
  "1200",
  "spmm",
  "gt1",
  "gt2",
  "gt3",
  "pretest",
  "focus",
  "501",
  "ghazi",
]

const chunkArray = (array: string[], chunkSize: number) => {
  const chunks = []
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize))
  }
  return chunks
}

const imageChunks = chunkArray(images, 6)

const selectImage = (image: string) => {
  page.value = image
  selectedImage.value = resolveImage(image)
  window.scrollTo(0, 0)

  trackEvent("image click", {
    event_category: "clicks",
    event_label: "image selected",
    value: image,
  })
}

const cancelSelection = () => {
  selectedImage.value = null
  page.value = ""
  flag.value = false
}
</script>

<template>
  <div class="container">
    <div v-if="page === ''">
      <!-- Loop through each chunk of six images -->
      <div
        class="grid mt-2"
        v-for="(chunk, index) in imageChunks"
        :key="`chunk-${index}`"
      >
        <!-- Render each image in the current chunk -->
        <div
          class="center"
          v-for="image in chunk"
          :key="image"
          @click="selectImage(image)"
        >
          <img loading="lazy" :src="resolveImage(image)" :alt="image" />
        </div>
      </div>
    </div>

    <div class="grid mt-2">
      <div class="mt-2 center" v-if="selectedImage">
        <div class="image-container">
          <img
            loading="lazy"
            :src="selectedImage"
            alt="Selected Image"
            class=""
          />
          <button class="cancel-button" @click="cancelSelection">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>

    <Flag v-if="flag" />
    <BestOfFive
      v-else-if="page !== ''"
      :selectedBook="selectedImage ? page : ''"
      :editing="editing"
    />
  </div>
</template>

<style scoped>
html,
body {
  height: 100%;
  margin: 0;
}

.p-auto {
  padding: auto;
}

.m-auto {
  margin: auto;
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

.book {
  box-shadow: 0px !important;
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
