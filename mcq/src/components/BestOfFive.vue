<script setup lang="ts">
import { ref } from "vue";
import chapterMCQs from "./BOF/ChapterMCQs.vue";

let page = ref("");
let questionsData = ref<Record<string, any>>({});

// Function to dynamically load the questions data
const loadQuestionsData = async (selectedPage: string) => {
  try {
    const data = await import(`../mcqs/${selectedPage}.json`);
    console.log("====================================");
    console.log(data.default);
    console.log("====================================");
    questionsData.value = data.default; // Assign the imported data to `questionsData`
  } catch (error) {
    console.error("Error loading questions data:", error);
  }
};
</script>

<!-- <template>
  <div class="container">
    <select
      name="select"
      aria-label="Select"
      required
      class="primary"
      @change="loadQuestionsData($event.target.value)"
    >
      <option selected disabled value="">Select Chapter</option>
      <option value="1-1" @click="page = '1-1'">
        Book 1 : Chapter 1: Clinical Skills
      </option>
      <option @click="page = '1-2'">
        Book 1: Chapter 2: Core Clinical Psychiatry
      </option>
      <option @click="page = '1-3'">Book 1: Chapter 3: Psychopathology</option>
      <option @click="page = '1-4'">Book 1: Chapter 4: Psychology</option>
      <option @click="page = '1-5'">
        Book 1: Chapter 5: psychopharmacology
      </option>
      <option @click="page = '1-6'">
        Book 1: Chapter 6: History, Social Psychiatry and Ethics
      </option>
      <option @click="page = '2-1'">
        Book 2: Chapter 1 : Psychiatric Genetics
      </option>
      <option @click="page = '2-2'">Book 2: Chapter 2 : Epidemiology</option>
      <option @click="page = '2-3'">
        Book 2: Chapter 3 : Advanced Psychology
      </option>
      <option @click="page = '2-4'">Book 2: Chapter 4 : Pharmacology</option>
      <option @click="page = '2-5'">Book 2: Chapter 5 : Neurosciences</option>
      <option @click="page = '3-1'">
        Book 3: Chapter 1 : General Adult Psychiatry
      </option>
      <option @click="page = '3-2'">
        Book 3: Chapter 2 : Forensic and rehabilitation psychiatry
      </option>
      <option @click="page = '3-3'">
        Book 3: Chapter 3 : Child psychiatry and learning disabilities
      </option>
      <option @click="page = '3-4'">
        Book 3: Chapter 4 : Old age psychiatry
      </option>
      <option @click="page = '3-5'">
        Book 3: Chapter 5 : Substance use disorders
      </option>
      <option @click="page = '3-6'">
        Book 3: Chapter 6 : Organic, liaison, and perinatal psychiatry
      </option>
      <option @click="page = '3-7'">Book 3: Chapter 7 : Psychotherapy</option>
      false
    </select>

    <chapterMCQs v-if="page" :questionsData="questionsData" />
  </div>
</template> -->

<template>
  <div class="container">
    <select
      name="select"
      aria-label="Select"
      required
      class="primary"
      @change="loadQuestionsData($event.target.value)"
    >
      <option selected disabled value="">Select Chapter</option>
      <option value="1-1">Book 1: Chapter 1: Clinical Skills</option>
      <option value="1-2">Book 1: Chapter 2: Core Clinical Psychiatry</option>
      <option value="1-3">Book 1: Chapter 3: Psychopathology</option>
      <option value="1-4">Book 1: Chapter 4: Psychology</option>
      <option value="1-5">Book 1: Chapter 5: Psychopharmacology</option>
      <option value="1-6">
        Book 1: Chapter 6: History, Social Psychiatry and Ethics
      </option>
      <option value="2-1">Book 2: Chapter 1: Psychiatric Genetics</option>
      <option value="2-2">Book 2: Chapter 2: Epidemiology</option>
      <option value="2-3">Book 2: Chapter 3: Advanced Psychology</option>
      <option value="2-4">Book 2: Chapter 4: Pharmacology</option>
      <option value="2-5">Book 2: Chapter 5: Neurosciences</option>
      <option value="3-1">Book 3: Chapter 1: General Adult Psychiatry</option>
      <option value="3-2">
        Book 3: Chapter 2: Forensic and Rehabilitation Psychiatry
      </option>
      <option value="3-3">
        Book 3: Chapter 3: Child Psychiatry and Learning Disabilities
      </option>
      <option value="3-4">Book 3: Chapter 4: Old Age Psychiatry</option>
      <option value="3-5">Book 3: Chapter 5: Substance Use Disorders</option>
      <option value="3-6">
        Book 3: Chapter 6: Organic, Liaison, and Perinatal Psychiatry
      </option>
      <option value="3-7">Book 3: Chapter 7: Psychotherapy</option>
    </select>

    <chapterMCQs
      v-if="questionsData && Object.keys(questionsData).length > 0"
      :key="JSON.stringify(questionsData[0].question)"
      :questionsData="questionsData"
    />
  </div>
</template>
