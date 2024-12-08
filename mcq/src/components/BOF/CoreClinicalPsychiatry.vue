<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps(["questionsData"]);

// Reactive data for questions and score
const questions = ref(props.questionsData); // Initialize questions with data from mcq1.json
const selectedOptions = ref(Array(questions.value.length).fill(null)); // Track the selected option for each question
const score = ref(0); // Initialize score

// Function to handle option selection
const selectOption = (index: number, option: any, correctAnswer: any) => {
  if (selectedOptions.value[index] === null) {
    // Check if the option for this question has not been selected yet
    selectedOptions.value[index] = option; // Set the selected option for this question
    if (option === correctAnswer) {
      score.value += 1; // Increment score for correct answer
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
</script>

<template>
  <div class="container">
    <div id="app">
      <div class="score-display">
        <div>Score: {{ percentageScore.toFixed(2) }}%</div>
        <div>Total Questions: {{ totalQuestions }}</div>
        <div>Correct Answers: {{ correctAnswers }}/{{ totalQuestions }}</div>
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
              v-for="(option, i) in question.options"
              :key="i"
              class="option"
              :class="{
                'correct-option':
                  option === question.correct_answer &&
                  selectedOptions[index] === option,
                'incorrect-option':
                  selectedOptions[index] &&
                  option !== question.correct_answer &&
                  selectedOptions[index] === option,
              }"
              @click="selectOption(index, option, question.correct_answer)"
              :disabled="selectedOptions[index] !== null"
            >
              {{ option }}
            </li>
          </ul>
          <details
            v-if="selectedOptions[index] !== null && question.explanation"
          >
            <summary role="button" class="outline secondary">
              Explanation
            </summary>
            <p>{{ question.explanation }}</p>
          </details>
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
}

/* Styling for score display */
.score-display {
  position: fixed;
  bottom: 20px;
  right: 20px;
  color: #333;
  background-color: rgba(172, 172, 172, 0.505);
  padding: 5px;
  border-radius: 5px;
  font-size: 0.8rem;
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
