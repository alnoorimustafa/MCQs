<script setup lang="ts">
import { ref, defineProps } from "vue";
import ChapterMCQs from "./ChapterMCQs.vue";

const props = defineProps<{
  selectedPaper: string; // New prop for the selected image name
}>();

let questionsData = ref<Record<string, any>>({});
let selectedChapter = ref("0-0");

// Function to dynamically load the questions data
const loadQuestionsData = async (
  selectedBook: string,
  selectedChapter: string
) => {
  console.log(selectedChapter);

  try {
    const data = await import(
      `../mcqs/${selectedBook}/${selectedChapter}.json`
    );
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
    <h2>Selected Image: {{ selectedPaper }}</h2>
    <select
      name="select"
      aria-label="Select"
      required
      class="primary"
      v-model="selectedChapter"
      @change="
        loadQuestionsData(
          selectedPaper,
          ($event.target as HTMLSelectElement).value
        )
      "
    >
      <option selected disabled value="0-0">Select Chapter</option>
      <option v-if="selectedPaper === 'bof1'" value="1-1">
        Chapter 1: Clinical Skills
      </option>
      <option v-if="selectedPaper === 'bof1'" value="1-2">
        Chapter 2: Core Clinical Psychiatry
      </option>
      <option v-if="selectedPaper === 'bof1'" value="1-3">
        Chapter 3: Psychopathology
      </option>
      <option v-if="selectedPaper === 'bof1'" value="1-4">
        Chapter 4: Psychology
      </option>
      <option v-if="selectedPaper === 'bof1'" value="1-5">
        Chapter 5: Psychopharmacology
      </option>
      <option v-if="selectedPaper === 'bof1'" value="1-6">
        Chapter 6: History, Social Psychiatry and Ethics
      </option>
      <option v-if="selectedPaper === 'bof2'" value="2-1">
        Chapter 1: Psychiatric Genetics
      </option>
      <option v-if="selectedPaper === 'bof2'" value="2-2">
        Chapter 2: Epidemiology
      </option>
      <option v-if="selectedPaper === 'bof2'" value="2-3">
        Chapter 3: Advanced Psychology
      </option>
      <option v-if="selectedPaper === 'bof2'" value="2-4">
        Chapter 4: Pharmacology
      </option>
      <option v-if="selectedPaper === 'bof2'" value="2-5">
        Chapter 5: Neurosciences
      </option>
      <option v-if="selectedPaper === 'bof3'" value="3-1">
        Chapter 1: General Adult Psychiatry
      </option>
      <option v-if="selectedPaper === 'bof3'" value="3-2">
        Chapter 2: Forensic and Rehabilitation Psychiatry
      </option>
      <option v-if="selectedPaper === 'bof3'" value="3-3">
        Chapter 3: Child Psychiatry and Learning Disabilities
      </option>
      <option v-if="selectedPaper === 'bof3'" value="3-4">
        Chapter 4: Old Age Psychiatry
      </option>
      <option v-if="selectedPaper === 'bof3'" value="3-5">
        Chapter 5: Substance Use Disorders
      </option>
      <option v-if="selectedPaper === 'bof3'" value="3-6">
        Chapter 6: Organic, Liaison, and Perinatal Psychiatry
      </option>
      <option v-if="selectedPaper === 'bof3'" value="3-7">
        Chapter 7: Psychotherapy
      </option>
    </select>

    <ChapterMCQs
      v-if="
        questionsData && Object.keys(questionsData).length > 0 && selectedPaper
      "
      :key="JSON.stringify(questionsData[0].question)"
      :questionsData="questionsData"
    />
  </div>
</template>
