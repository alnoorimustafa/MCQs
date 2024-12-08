<script setup lang="ts">
import { ref } from "vue";
import CoreClinicalPsychiatry from "./BOF/CoreClinicalPsychiatry.vue";
import questionsData from "../../../mcq3.json";
let page = ref("");
</script>

<template>
  <div class="container">
    <select name="select" aria-label="Select" required class="primary">
      <option selected disabled value="">Select Chapter</option>
      <option @click="page = '1'">Book 1 : Chapter 2: Clinical Skills</option>
      <option @click="page = '2'">
        Book 1: Chapter 2: Core Clinical Psychiatry
      </option>
      <option @click="page = '3'">Book 1: Chapter 2: Psychopathology</option>
      <option @click="page = '4'">Book 1: Chapter 2: Psychology</option>
      <option @click="page = '5'">Book 1: Chapter 2: psychopharmacology</option>
      <option @click="page = '6'">
        Book 1: Chapter 2: History, Social Psychiatry and Ethics
      </option>
      <option @click="page = '7'">
        Book 2: Chapter 1 : Psychiatric Genetics
      </option>
      <option @click="page = '8'">Book 2: Chapter 2 : Epidemiology</option>
      <option @click="page = '9'">
        Book 2: Chapter 3 : Advanced Psychology
      </option>
      <option @click="page = '10'">Book 2: Chapter 4 : Pharmacology</option>
      <option @click="page = '11'">Book 2: Chapter 5 : Neurosciences</option>
      <option @click="page = '12'">
        Book 3: Chapter 1 : General Adult Psychiatry
      </option>
      <option @click="page = '12'">
        Book 3: Chapter 2 : Forensic and rehabilitation psychiatry
      </option>
      <option @click="page = '12'">
        Book 3: Chapter 3 : Child psychiatry and learning disabilities
      </option>
      <option @click="page = '12'">
        Book 3: Chapter 4 : Old age psychiatry
      </option>
      <option @click="page = '12'">
        Book 3: Chapter 5 : Substance use disorders
      </option>
      <option @click="page = '12'">
        Book 3: Chapter 6 : Organic, liaison, and perinatal psychiatry
      </option>
      <option @click="page = '12'">Book 3: Chapter 7 : Psychotherapy</option>
      false
    </select>

    <CoreClinicalPsychiatry
      v-if="page === '2'"
      :questionsData="questionsData"
    />
  </div>
</template>
