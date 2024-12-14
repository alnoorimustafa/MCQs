<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

const props = defineProps(["questionsData"]);

// Reactive data for questions and score
const questions = ref(props.questionsData); // Initialize questions with data from mcq1.json
const selectedOptions = ref(Array(questions.value.length).fill(null)); // Track the selected option for each question
const score = ref(0); // Initialize score
const wrong = ref(0); // Initialize score
const loading = ref(true); // Loading state

// Simulate loading questions (replace this with actual loading logic)
onMounted(() => {
  setTimeout(() => {
    loading.value = false; // Set loading to false after loading is complete
  }, 1000); // Simulate a 1 second loading time
});

// Function to handle option selection
const selectOption = (
  index: number,
  letter: any,
  option: any,
  correctAnswer: any
) => {
  if (selectedOptions.value[index] === null) {
    // Check if the option for this question has not been selected yet
    selectedOptions.value[index] = option; // Set the selected option for this question
    if (letter === correctAnswer) {
      score.value += 1; // Increment score for correct answer
    } else if (letter !== correctAnswer) {
      wrong.value += 1; // Increment score for correct answer
    }
  }
};

// Computed property to calculate percentage score
const percentageScore = computed(() => {
  return (score.value / questions.value.length) * 100; // Calculate percentage
});

// Computed properties for total questions, correct answers, and wrong answers
const totalQuestions = computed(() => questions.value.length);
const correctAnswers = computed(() => score.value);
const IncorrectAnswers = computed(() => wrong.value);
</script>

<template>
  <div>
    <article v-if="loading" aria-busy="true">Loading...</article>
    <div v-else class="container">
      <div id="app">
        <div class="score-display">
          <div class="score-row">
            <span class="label">Score:</span>
            <span class="value">{{ percentageScore.toFixed(0) }}/100</span>
          </div>
          <div class="score-row">
            <span class="label">Total Questions:</span>
            <span class="value">{{ totalQuestions }}</span>
          </div>
          <div class="score-row">
            <span class="label">Correct Answers:</span>
            <span class="value">{{ correctAnswers }}</span>
          </div>
          <div class="score-row">
            <span class="label">Incorrect Answers:</span>
            <span class="value">{{ IncorrectAnswers }}</span>
          </div>
        </div>
      </div>
      <!-- Display additional information -->
      <div v-if="questions.length" class="questions-container">
        <div
          v-for="(question, index) in questions"
          :key="index"
          class="question-card"
        >
          <p class="question-text">{{ index + 1 }} - {{ question.question }}</p>
          <ul class="options-list">
            <li
              v-for="(option, letter) in question.options"
              :key="letter"
              class="option"
              :class="{
                'correct-option':
                  letter === question.correct_answer &&
                  selectedOptions[index] === option,
                'incorrect-option':
                  selectedOptions[index] &&
                  letter !== question.correct_answer &&
                  selectedOptions[index] === option,
              }"
              @click="
                selectOption(index, letter, option, question.correct_answer)
              "
              :disabled="selectedOptions[index] !== null"
            >
              {{ letter }}. {{ option }}
            </li>
          </ul>
          <details
            v-if="selectedOptions[index] !== null && question.explanation"
          >
            <summary role="button" class="outline secondary">
              Explanation
            </summary>
            <p class="pico-color-orange-400">{{ question.explanation }}</p>
          </details>
        </div>
      </div>
      <div v-else class="placeholder">
        <p>Select A Chapter to Show MCQs</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.score-display {
  min-width: 15%;
  max-width: 50%;
  position: fixed;
  bottom: 20px;
  right: 20px;
  color: #333;
  background-color: rgba(172, 172, 172, 0.505);
  padding: 10px;
  border-radius: 5px;
  font-size: 0.8rem;
}

.score-row {
  display: flex;
  justify-content: space-between;
}

.label {
  text-align: left;
}

.value {
  text-align: right;
}

.question-card {
  background-color: #f8f8f8;
  border: 1px solid #ffffff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: left;
}

.question-text {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: #444444;
}

/* Styling for options list */
.options-list {
  list-style-type: none;
  padding-left: 0;
}

.option {
  background-color: #e9ecef;
  margin: 8px 0px;
  padding: 10px;
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
  color: #383838;
  margin-top: 20px;
  font-style: italic;
}

.container {
  padding: 0;
}
</style>
