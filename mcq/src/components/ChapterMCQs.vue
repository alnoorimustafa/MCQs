<script setup lang="ts">
import { ref, computed, inject } from "vue";
import PocketBase from "pocketbase";

const pb = inject("pb") as PocketBase;

const props = defineProps(["questionsData", "selectedChapter", "selectedBook"]);

const questions = ref(props.questionsData);
const selectedOptions = ref(Array(questions.value.length).fill(null));
const right = ref(0);
const wrong = ref(0);
const saving = ref(false);

const loadProgress = async () => {
  saving.value = true;
  try {
    const progress = await pb
      .collection("progress")
      .getFirstListItem(
        `user = "${pb.authStore.record?.id}" && book = "${props.selectedBook}" && chapter = "${props.selectedChapter}"`
      );

    if (progress?.answered) {
      // Map saved answers back to the current questions
      selectedOptions.value = questions.value.map((question: any) => {
        const savedAnswer = progress.answered.find(
          (item: any) => item.questionId === question.id
        );
        return savedAnswer?.selectedOption || null;
      });

      right.value = progress.right || 0;
      wrong.value = progress.wrong || 0;
    }
  } catch (err) {
    console.log("No progress found for this chapter:", err);
  }
  saving.value = false;
};

const saveProgress = async () => {
  saving.value = true;

  // Map answers to question IDs
  const answered = questions.value.map((question: any, index: any) => ({
    questionId: question.id, // Assuming each question has a unique `id`
    selectedOption: selectedOptions.value[index],
  }));

  const payload = {
    user: pb.authStore.record?.id,
    chapter: props.selectedChapter,
    book: props.selectedBook,
    answered,
    right: right.value,
    wrong: wrong.value,
  };

  try {
    const existingProgress = await pb
      .collection("progress")
      .getFirstListItem(
        `user = "${pb.authStore.record?.id}" && book = "${props.selectedBook}" && chapter = "${props.selectedChapter}"`
      );

    if (existingProgress) {
      await pb.collection("progress").update(existingProgress.id, payload);
    }
  } catch {
    await pb.collection("progress").create(payload);
  }

  saving.value = false;
};

// Function to handle option selection
const selectOption = async (
  index: number,
  letter: any,
  option: any,
  correctAnswer: any
) => {
  if (selectedOptions.value[index] === null) {
    selectedOptions.value[index] = option;
    if (letter === correctAnswer) {
      right.value += 1;
    } else if (letter !== correctAnswer) {
      wrong.value += 1;
    }
  }
};

const randomizeQuestions = () => {
  const combined = questions.value.map((question: any, index: any) => ({
    question,
    selectedOption: selectedOptions.value[index],
  }));

  // Shuffle the combined array
  combined.sort(() => Math.random() - 0.5);

  // Update questions and selected options based on the shuffled array
  questions.value = combined.map((item: { question: any }) => item.question);
  selectedOptions.value = combined.map(
    (item: { selectedOption: any }) => item.selectedOption
  );
};

const percentageScore = computed(
  () => (right.value / questions.value.length) * 100
);
const totalQuestions = computed(() => questions.value.length);
const correctAnswers = computed(() => right.value);
const IncorrectAnswers = computed(() => wrong.value);
</script>

<template>
  <div>
    <div class="container">
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
          <div class="score-row flex">
            <button :aria-busy="saving" class="save" @click="saveProgress">
              <span v-if="!saving"> Save Progress </span>
            </button>
            <button :aria-busy="saving" class="load" @click="loadProgress">
              <span v-if="!saving">Load Progress </span>
            </button>
            <button class="randomize" @click="randomizeQuestions">
              Randomize Questions
            </button>
          </div>
        </div>
      </div>
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
            v-if="
              selectedOptions[index] !== null &&
              question.explanation &&
              ['bof1', 'bof2', 'bof3', 'gt1', 'gt2', 'gt3'].includes(
                selectedBook
              )
            "
          >
            <summary role="button" class="outline secondary">
              Explanation
            </summary>
            <p class="pico-color-orange-400">{{ question.explanation }}</p>
          </details>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
progress {
  margin-top: 10px;
  width: 100%;
}

.score-display {
  min-width: 15%;
  max-width: 50%;
  position: fixed;
  bottom: 20px;
  right: 20px;
  color: #ffffff;
  background-color: rgba(1, 127, 192, 0.4);
  padding: 10px;
  border-radius: 5px;
  font-size: 0.8rem;
}

.score-row button {
  padding: 5px;
  margin-top: 5px;
  font-size: 12px;
  border: transparent;
}

.save {
  background-color: rgb(71, 164, 23, 0.7);
}

.load {
  background-color: rgb(255, 191, 0, 0.7);
}

.flex {
  display: flex;
  flex-direction: column;
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
  margin-bottom: 15px;
  text-align: left;
}

.question-text {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: #555;
}

/* Styling for options list */
.options-list {
  list-style-type: none;
  padding-left: 0;
}

.option {
  background-color: #dfe3eb;
  margin: 8px 0px;
  padding: 10px;
  border-radius: 5px;
  font-size: 1rem;
  color: #777;
  transition: background-color 0.3s ease;
  cursor: pointer;
  list-style-type: none;
}

.correct-option {
  background-color: #398712;
  color: white;
}

.incorrect-option {
  background-color: #d93526;
  color: white;
}

.container {
  padding: 0;
}
</style>
