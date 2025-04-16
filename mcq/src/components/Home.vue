<script setup lang="ts">
import { ref, inject } from 'vue'
import { trackEvent } from '../analytics'
import BestOfFive from './BestOfFive.vue'
import PocketBase from 'pocketbase'
import Flag from './Flag.vue'

const pb = inject('pb') as PocketBase

const emit = defineEmits(['logout'])

let page = ref('')
let flag = ref(false)
let editing = ref(true)

editing.value = pb.authStore.record?.email === 'edit@mcq.com'

let selectedImage = ref<string | null>(null)

const selectImage = (image: string) => {
  page.value = image
  selectedImage.value = new URL(
    `../assets/small/${image}.webp`,
    import.meta.url
  ).href
  window.scrollTo(0, 0)

  trackEvent('book_click', {
    event_category: 'interaction',
    event_label: 'Book Selected',
    value: pb.authStore.record?.name + image
  })
}

const cancelSelection = () => {
  selectedImage.value = null
  page.value = ''
  flag.value = false
}
</script>

<template>
  <transition mode="out-in">
    <div class="container">
      <div class="grid mt-2">
        <div
          class="center"
          v-if="!selectedImage"
          @click="
            () => {
              selectImage('flag')
              flag = true
            }
          "
        >
          <img loading="lazy" src="../assets/small/flag.webp" alt="" />
        </div>
        <div class="center" v-if="!selectedImage" @click="selectImage('bof1')">
          <img loading="lazy" src="../assets/small/bof1.webp" alt="" />
        </div>
        <div class="center" v-if="!selectedImage" @click="selectImage('bof2')">
          <img loading="lazy" src="../assets/small/bof2.webp" alt="" />
        </div>
        <div class="center" v-if="!selectedImage" @click="selectImage('bof3')">
          <img loading="lazy" src="../assets/small/bof3.webp" alt="" />
        </div>
        <div class="center" v-if="!selectedImage" @click="selectImage('600-1')">
          <img loading="lazy" src="../assets/small/600-1.webp" alt="" />
        </div>
        <div class="center" v-if="!selectedImage" @click="selectImage('600-2')">
          <img loading="lazy" src="../assets/small/600-2.webp" alt="" />
        </div>
      </div>
      <div class="grid mt-2">
        <div class="center" v-if="!selectedImage" @click="selectImage('1200')">
          <img loading="lazy" src="../assets/small/1200.webp" alt="" />
        </div>
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
        <div
          class="center"
          v-if="!selectedImage"
          @click="selectImage('pretest')"
        >
          <img loading="lazy" src="../assets/small/pretest.webp" alt="" />
        </div>
      </div>
      <div class="grid mt-2">
        <div class="center" v-if="!selectedImage" @click="selectImage('focus')">
          <img loading="lazy" src="../assets/small/focus.webp" alt="" />
        </div>
        <div class="center" v-if="!selectedImage" @click="selectImage('501')">
          <img loading="lazy" src="../assets/small/501.webp" alt="" />
        </div>
        <div class="center" v-if="!selectedImage" @click="selectImage('apa')">
          <img loading="lazy" src="../assets/small/apa.webp" alt="" />
        </div>
        <div class="center" v-if="!selectedImage" @click="selectImage('dsm')">
          <img loading="lazy" src="../assets/small/dsm.webp" alt="" />
        </div>
        <div
          class="center"
          v-if="!selectedImage"
          @click="selectImage('testprep')"
        >
          <img loading="lazy" src="../assets/small/testprep.webp" alt="" />
        </div>
        <div class="center" v-if="!selectedImage" @click="selectImage('ghazi')">
          <img loading="lazy" src="../assets/small/ghazi.webp" alt="" />
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

      <Flag v-if="flag" />
      <BestOfFive
        v-else-if="page !== ''"
        :selectedBook="selectedImage ? page : ''"
        :editing="editing"
      />
    </div>
  </transition>
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
  background: var(--pico-color-red-500);
  border: none;
  cursor: pointer;
  color: white; /* Change color as needed */
}

.background-azure {
  background-color: var(--pico-color-azure-500);
}

nav ul {
  color: white;
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
