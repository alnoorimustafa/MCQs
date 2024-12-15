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
    {
      value: "Chapter 1: Clinical Skills",
      label: "Chapter 1: Clinical Skills",
    },
    {
      value: "Chapter 2: Core Clinical Psychiatry",
      label: "Chapter 2: Core Clinical Psychiatry",
    },
    {
      value: "Chapter 3: Psychopathology",
      label: "Chapter 3: Psychopathology",
    },
    { value: "Chapter 4: Psychology", label: "Chapter 4: Psychology" },
    {
      value: "Chapter 5: Psychopharmacology",
      label: "Chapter 5: Psychopharmacology",
    },
    {
      value: "Chapter 6: History, Social Psychiatry and Ethics",
      label: "Chapter 6: History, Social Psychiatry and Ethics",
    },
  ],
  bof2: [
    {
      value: "Chapter 1: Psychiatric Genetics",
      label: "Chapter 1: Psychiatric Genetics",
    },
    { value: "Chapter 2: Epidemiology", label: "Chapter 2: Epidemiology" },
    {
      value: "Chapter 3: Advanced Psychology",
      label: "Chapter 3: Advanced Psychology",
    },
    { value: "Chapter 4: Pharmacology", label: "Chapter 4: Pharmacology" },
    { value: "Chapter 5: Neurosciences", label: "Chapter 5: Neurosciences" },
  ],
  bof3: [
    {
      value: "Chapter 1: General Adult Psychiatry",
      label: "Chapter 1: General Adult Psychiatry",
    },
    {
      value: "Chapter 2: Forensic and Rehabilitation Psychiatry",
      label: "Chapter 2: Forensic and Rehabilitation Psychiatry",
    },
    {
      value: "Chapter 3: Child Psychiatry and Learning Disabilities",
      label: "Chapter 3: Child Psychiatry and Learning Disabilities",
    },
    {
      value: "Chapter 4: Old Age Psychiatry",
      label: "Chapter 4: Old Age Psychiatry",
    },
    {
      value: "Chapter 5: Substance Use Disorders",
      label: "Chapter 5: Substance Use Disorders",
    },
    {
      value: "Chapter 6: Organic, Liaison, and Perinatal Psychiatry",
      label: "Chapter 6: Organic, Liaison, and Perinatal Psychiatry",
    },
    { value: "Chapter 7: Psychotherapy", label: "Chapter 7: Psychotherapy" },
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
    { value: "Basic Psychology", label: "Basic Psychology" },
    { value: "Social Psychology", label: "Social Psychology" },
    { value: "Sociocultural Psychiatry", label: "Sociocultural Psychiatry" },
    { value: "Human Development", label: "Human Development" },
    { value: "Neuroanatomy", label: "Neuroanatomy" },
    { value: "Neuroaphysiology", label: "Neuroaphysiology" },
    { value: "Neurochemistry", label: "Neurochemistry" },
    { value: "Molecular Genetics", label: "Molecular Genetics" },
    { value: "Neuropathology", label: "Neuropathology" },
    { value: "Applied Neurosciences", label: "Applied Neurosciences" },
    { value: "Basic Pharmacology", label: "Basic Pharmacology" },
    { value: "Pharmacokinetics", label: "Pharmacokinetics" },
    { value: "Pharmacodynamics", label: "Pharmacodynamics" },
    { value: "Adverse Effects", label: "Adverse Effects" },
    { value: "Classification", label: "Classification" },
    { value: "Clinical Examination", label: "Clinical Examination" },
    {
      value: "Descriptive Psychopathology",
      label: "Descriptive Psychopathology",
    },
    { value: "Dynamic Psychopathology", label: "Dynamic Psychopathology" },
    { value: "Rating scales", label: "Rating scales" },
    { value: "2016 paper 1", label: "2016 paper 1" },
    { value: "2016 paper 2", label: "2016 paper 2" },
    { value: "2016 Additional", label: "2016 Additional" },
    { value: "2017 paper 1", label: "2017 paper 1" },
    { value: "2017 paper 2", label: "2017 paper 2" },
    { value: "2018 paper 1", label: "2018 paper 1" },
    { value: "2018 paper 2", label: "2018 paper 2" },
    { value: "2019 paper 1", label: "2019 paper 1" },
    { value: "2019 paper 2", label: "2019 paper 2" },
    { value: "2020 paper 1", label: "2020 paper 1" },
    { value: "2020 paper 2", label: "2020 paper 2" },
    { value: "2021 paper 1", label: "2021 paper 1" },
    { value: "2021 paper 2", label: "2021 paper 2" },
    { value: "2021 Additional", label: "2021 Additional" },
  ],
};

// Function to dynamically load the questions data
const loadQuestionsData = async (
  selectedBook: string,
  selectedChapter: string
) => {
  try {
    const records = await pb.collection("mcqs").getFullList({
      filter: `book = '${selectedBook}' && chapter = '${selectedChapter}'`,
      sort: "number",
    });
    console.log("records");
    console.log(records);
    questionsData.value = records;
  } catch (error) {
    console.error("Error loading questions data:", error);
    questionsData.value = {};
  }
  // } else {
  //   const data = await import(
  //     `../mcqs/${selectedBook}/${selectedChapter}.json`
  //   );
  // questionsData.value = data.default;
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
