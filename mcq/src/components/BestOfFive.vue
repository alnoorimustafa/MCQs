<script setup lang="ts">
import { ref, defineProps, computed } from "vue";
import ChapterMCQs from "./ChapterMCQs.vue";

const props = defineProps<{
  selectedBook: string;
}>();

let questionsData = ref<Record<string, any>>({});
let selectedChapter = ref("");

// Mapping chapters to their respective papers
const chapterOptions: Record<string, { value: string; label: string }[]> = {
  bof1: [
    { value: "1-1", label: "Chapter 1: Clinical Skills" },
    { value: "1-2", label: "Chapter 2: Core Clinical Psychiatry" },
    { value: "1-3", label: "Chapter 3: Psychopathology" },
    { value: "1-4", label: "Chapter 4: Psychology" },
    { value: "1-5", label: "Chapter 5: Psychopharmacology" },
    { value: "1-6", label: "Chapter 6: History, Social Psychiatry and Ethics" },
  ],
  bof2: [
    { value: "2-1", label: "Chapter 1: Psychiatric Genetics" },
    { value: "2-2", label: "Chapter 2: Epidemiology" },
    { value: "2-3", label: "Chapter 3: Advanced Psychology" },
    { value: "2-4", label: "Chapter 4: Pharmacology" },
    { value: "2-5", label: "Chapter 5: Neurosciences" },
  ],
  bof3: [
    { value: "3-1", label: "Chapter 1: General Adult Psychiatry" },
    {
      value: "3-2",
      label: "Chapter 2: Forensic and Rehabilitation Psychiatry",
    },
    {
      value: "3-3",
      label: "Chapter 3: Child Psychiatry and Learning Disabilities",
    },
    { value: "3-4", label: "Chapter 4: Old Age Psychiatry" },
    { value: "3-5", label: "Chapter 5: Substance Use Disorders" },
    {
      value: "3-6",
      label: "Chapter 6: Organic, Liaison, and Perinatal Psychiatry",
    },
    { value: "3-7", label: "Chapter 7: Psychotherapy" },
  ],
  "600-1": [
    { value: "1-1", label: "Chapter 1" },
    { value: "1-2", label: "Chapter 2" },
    { value: "1-3", label: "Chapter 3" },
    { value: "1-4", label: "Chapter 4" },
    { value: "1-5", label: "Chapter 5" },
  ],
  "600-2": [
    { value: "2-1", label: "Chapter 1" },
    { value: "2-2", label: "Chapter 2" },
    { value: "2-3", label: "Chapter 3" },
    { value: "2-4", label: "Chapter 4" },
    { value: "2-5", label: "Chapter 5" },
  ],
  "501": [
    { value: "1-1", label: "Part 1" },
    { value: "1-2", label: "Part 2" },
    { value: "1-3", label: "Part 3" },
    { value: "1-4", label: "Part 4" },
    { value: "1-5", label: "Part 5" },
    { value: "1-5", label: "Part 6" },
    { value: "1-5", label: "Part 7" },
    { value: "1-5", label: "Part 8" },
    { value: "1-5", label: "Part 9" },
    { value: "1-5", label: "Part 10" },
    { value: "1-5", label: "Part 11" },
  ],
};

// Function to dynamically load the questions data
const loadQuestionsData = async (
  selectedBook: string,
  selectedChapter: string
) => {
  try {
    const data = await import(
      `../mcqs/${selectedBook}/${selectedChapter}.json`
    );
    questionsData.value = data.default;
  } catch (error) {
    console.error("Error loading questions data:", error);
    questionsData.value = {}; // Reset questionsData on error
  }
};

// Computed property for the selected book name
const selectedBookName = computed(() => {
  return props.selectedBook === "bof1"
    ? "Best Of Five 1"
    : props.selectedBook === "bof2"
    ? "Best Of Five 2"
    : props.selectedBook === "bof3"
    ? "Best Of Five 3"
    : props.selectedBook === "600-1"
    ? "600 Paper 1"
    : props.selectedBook === "600-2"
    ? "600 Paper 2"
    : "501 Psychopharmacology";
});
</script>

<template>
  <div class="container">
    <h5>Selected Book: {{ selectedBookName }}</h5>

    <select
      name="select"
      aria-label="Select"
      required
      class="primary"
      v-model="selectedChapter"
      @change="loadQuestionsData(selectedBook, selectedChapter)"
    >
      <option selected disabled value="">Select Chapter</option>
      <option
        v-for="option in chapterOptions[selectedBook] || []"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>

    <ChapterMCQs
      v-if="
        questionsData && Object.keys(questionsData).length > 0 && selectedBook
      "
      :key="JSON.stringify(questionsData[0]?.question || '')"
      :questionsData="questionsData"
    />
  </div>
</template>
