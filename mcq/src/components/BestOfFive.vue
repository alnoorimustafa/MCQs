<script setup lang="ts">
import { ref } from "vue";
import CoreClinicalPsychiatry from "./BOF/CoreClinicalPsychiatry.vue";
let page = ref("");
</script>

<template>
  <div class="container">
    <button
      :class="page === 'ccp' ? 'primary' : 'secondary'"
      @click="page = 'ccp'"
    >
      Core Clinical Psychiatry
    </button>

    <CoreClinicalPsychiatry v-if="page === 'ccp'" />
  </div>
</template>
