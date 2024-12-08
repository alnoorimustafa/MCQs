<script setup lang="ts">
import { ref } from "vue";
import questionsData from "../../../../mcq3.json"; // Import the questions from mcq1.json

// Reactive data for questions
const questions = ref(questionsData); // Initialize questions with data from mcq1.json
const selectedOption = ref(null); // Track the selected option

// Function to handle option selection
const selectOption = (option: any, correctAnswer: any) => {
  selectedOption.value = option; // Set the selected option
};
</script>

<template>
  <div class="container">
    <div id="app">
      <div v-if="questions.length" class="questions-container">
        <div
          v-for="(question, index) in questions"
          :key="index"
          class="question-card"
        >
          <p class="question-text">{{ index + 1 }} - {{ question.question }}</p>
          <ul class="options-list">
            <li
              v-for="(option, i) in question.options"
              :key="i"
              class="option"
              :class="{
                'correct-option':
                  option === question.correct_answer &&
                  selectedOption === option,
                'incorrect-option':
                  selectedOption &&
                  option !== question.correct_answer &&
                  selectedOption === option,
              }"
              @click="selectOption(option, question.correct_answer)"
            >
              {{ option }}
            </li>
          </ul>
        </div>
      </div>
      <div v-else class="placeholder">
        <p>No questions loaded. Please upload a CSV file.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Container for the app */
#app {
  font-family: "Rubik", sans-serif;
  /* background-color: #f4f7f6; */
}

/* Styling for question cards */
.questions-container {
  margin-top: 40px;
}

.question-card {
  background-color: #f9f9f9;
  border: 1px solid #ececec;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 10px;
  text-align: left;
}

.question-text {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

/* Styling for options list */
.options-list {
  list-style-type: none;
  padding-left: 0;
}

.option {
  background-color: #e9ecef;
  margin: 5px 0;
  padding: 8px;
  border-radius: 5px;
  font-size: 1rem;
  color: #555;
  transition: background-color 0.3s ease;
  cursor: pointer;
  list-style-type: none;
}

.correct-option {
  background-color: green;
  color: white;
}

.incorrect-option {
  background-color: red;
  color: white;
}

/* Placeholder when no file is uploaded */
.placeholder {
  font-size: 1rem;
  color: #888;
  margin-top: 20px;
  font-style: italic;
}

.container {
  padding: 0;
}
</style>
