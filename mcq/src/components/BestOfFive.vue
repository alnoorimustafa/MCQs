<script setup lang="ts">
import { ref, defineProps, computed } from "vue";
import ChapterMCQs from "./ChapterMCQs.vue";
import PocketBase from "pocketbase";

const pb = new PocketBase("https://mcq-db.dakakean.com");

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
    { value: "Chapter 1", label: "Chapter 1" },
    { value: "Chapter 2", label: "Chapter 2" },
    { value: "Chapter 3", label: "Chapter 3" },
    { value: "Chapter 4", label: "Chapter 4" },
    { value: "Chapter 5", label: "Chapter 5" },
  ],
  "600-2": [
    { value: "Chapter 1", label: "Chapter 1" },
    { value: "Chapter 2", label: "Chapter 2" },
    { value: "Chapter 3", label: "Chapter 3" },
    { value: "Chapter 4", label: "Chapter 4" },
    { value: "Chapter 5", label: "Chapter 5" },
  ],
  "501": [
    { value: "Part 1", label: "Part 1" },
    { value: "Part 2", label: "Part 2" },
    { value: "Part 3", label: "Part 3" },
    { value: "Part 4", label: "Part 4" },
    { value: "Part 5", label: "Part 5" },
    { value: "Part 6", label: "Part 6" },
    { value: "Part 7", label: "Part 7" },
    { value: "Part 8", label: "Part 8" },
    { value: "Part 9", label: "Part 9" },
    { value: "Part 10", label: "Part 10" },
  ],
  spmm: [
    { value: "spmm-1-1", label: "Basic Psychology" },
    { value: "spmm-1-2", label: "Social Psychology" },
    { value: "spmm-1-3", label: "Sociocultural Psychiatry" },
    { value: "spmm-2-1", label: "Human Development" },
    { value: "spmm-3-1", label: "Neuroanatomy" },
    { value: "spmm-3-2", label: "Neuroaphysiology" },
    { value: "spmm-3-3", label: "Neurochemistry" },
    { value: "spmm-3-4", label: "Molecular Genetics" },
    { value: "spmm-3-5", label: "Neuropathology" },
    { value: "spmm-3-6", label: "Applied Neurosciences" },
    { value: "spmm-4-1", label: "Basic Pharmacology" },
    { value: "spmm-4-2", label: "Pharmacokinetics" },
    { value: "spmm-4-3", label: "Pharmacodynamics" },
    { value: "spmm-4-4", label: "Adverse Effects" },
    { value: "spmm-5-1", label: "Classification" },
    { value: "spmm-5-2", label: "Clinical Examination" },
    { value: "spmm-5-3", label: "Descriptive Psychopathology" },
    { value: "spmm-5-4", label: "Dynamic Psychopathology" },
    { value: "spmm-5-5", label: "Rating scales" },
    { value: "spmm-2016-1", label: "2016 paper 1" },
    { value: "spmm-2016-2", label: "2016 paper 2" },
    { value: "spmm-2016-3", label: "2016 paper 3" },
    { value: "spmm-2017-1", label: "2017 paper 1" },
    { value: "spmm-2017-2", label: "2017 paper 2" },
    { value: "spmm-2018-1", label: "2018 paper 1" },
    { value: "spmm-2018-2", label: "2018 paper 2" },
    { value: "spmm-2019-1", label: "2019 paper 1" },
    { value: "spmm-2019-2", label: "2019 paper 2" },
    { value: "spmm-2020-1", label: "2020 paper 1" },
    { value: "spmm-2020-2", label: "2020 paper 2" },
    { value: "spmm-2021-1", label: "2021 paper 1" },
    { value: "spmm-2021-2", label: "2021 paper 2" },
    { value: "spmm-2021-3", label: "2021 paper 3" },
  ],
};

// Function to dynamically load the questions data
const loadQuestionsData = async (
  selectedBook: string,
  selectedChapter: string
) => {
  try {
    if (selectedBook === "501") {
      console.log("501");
      const records = await pb.collection("mcqs").getFullList({
        filter: `book = '${selectedBook}' && chapter = '${selectedChapter}'`,
        sort: "number",
      });
      console.log("records");
      console.log(records);
      questionsData.value = records;
    } else {
      const data = await import(
        `../mcqs/${selectedBook}/${selectedChapter}.json`
      );
      questionsData.value = data.default;
    }
  } catch (error) {
    console.error("Error loading questions data:", error);
    questionsData.value = {}; // Reset questionsData on error
  }
};

// Computed property for the selected book name
const selectedBookName = computed(() => {
  return props.selectedBook === "bof1"
    ? "Best Of Five 1: 450 MCQ"
    : props.selectedBook === "bof2"
    ? "Best Of Five 2: 455 MCQ"
    : props.selectedBook === "bof3"
    ? "Best Of Five 3"
    : props.selectedBook === "600-1"
    ? "600 Paper 1: 634 MCQ"
    : props.selectedBook === "600-2"
    ? "600 Paper 2: 665 MCQ"
    : props.selectedBook === "501"
    ? "501 Psychopharmacology: 556 MCQ"
    : "SPMM";
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
