<script setup lang="ts">
import { ref } from "vue";
import BestOfFive from "./components/BestOfFive.vue";
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
  <div class="container">
    <BestOfFive v-if="page === 'bof'" />
  </div>
</template>

<style></style>
