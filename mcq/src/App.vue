<script setup lang="ts">
import { ref } from "vue";
import BestOfFive from "./components/BestOfFive.vue";
import Book600 from "./components/Book600.vue";
let page = ref("");
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
  <div class="hh">
    <div class="container">
      <BestOfFive v-if="page === 'bof'" />
      <Book600 v-if="page === '600'" />
    </div>
    <footer>
      <p class="copyright">&copy; 2024. Dr. Mustafa Alnoori. All rights reserved.</p>
    </footer>
  </div>
</template>

<style scoped>

html, body {
  height: 100%;
  margin: 0;
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
color: #017FC0;
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
</style>
