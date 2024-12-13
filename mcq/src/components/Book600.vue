<script setup lang="ts">
import { ref } from "vue";
import ChapterMCQs from "./BOF/ChapterMCQs.vue";

let page = ref("");
let questionsData = ref<Record<string, any>>({});

// Function to dynamically load the questions data
const loadQuestionsData = async (selectedPage: string) => {
  try {
    const data = await import(`../mcqs/600-${selectedPage}.json`);
    console.log("====================================");
    console.log(data.default);
    console.log("====================================");
    questionsData.value = data.default; // Assign the imported data to `questionsData`
  } catch (error) {
    console.error("Error loading questions data:", error);
    questionsData.value = {}; // Reset questionsData on error
  }
};
</script>

<template>
  <div class="container">
    <select
      name="select"
      aria-label="Select"
      required
      class="primary"
      @change="loadQuestionsData(($event.target as HTMLSelectElement).value)"
    >
      <option selected disabled value="">Select Chapter</option>
      <option value="1-1">Paper 1: Chapter 1</option>
      <option value="1-2">Paper 1: Chapter 2</option>
      <option value="1-3">Paper 1: Chapter 3</option>
      <option value="1-4">Paper 1: Chapter 4</option>
      <option value="2-1">Paper 2: Chapter 1</option>
      <option value="2-2">Paper 2: Chapter 2</option>
      <option value="2-3">Paper 2: Chapter 3</option>
      <option value="2-4">Paper 2: Chapter 4</option>
      <option value="2-5">Paper 2: Chapter 5</option>
    </select>

    <ChapterMCQs
      v-if="questionsData && Object.keys(questionsData).length > 0"
      :key="JSON.stringify(questionsData[0].question)"
      :questionsData="questionsData"
    />
  </div>
</template>
