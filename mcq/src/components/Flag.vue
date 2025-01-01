<script setup lang="ts">
import { ref, computed, onMounted, inject } from "vue"
import PocketBase from "pocketbase"

const questions = ref<any[]>([]) // Initialize as an empty array
const selectedOptions = ref<any[]>([]) // Initialize as an empty array
const right = ref(0)
const wrong = ref(0)
const collection = ref("")
const loading = ref(false)

const pb = inject("pb") as PocketBase

onMounted(() => {
  fetchQuestions()
})

const selectedBookName = (name: string) => {
  return name === "bof1"
    ? "Best Of Five 1"
    : name === "bof2"
    ? "Best Of Five 2"
    : name === "bof3"
    ? "Best Of Five 3"
    : name === "600-1"
    ? "600 Paper 1"
    : name === "600-2"
    ? "600 Paper 2"
    : name === "501"
    ? "501 Psychopharmacology"
    : name === "spmm"
    ? "SPMM"
    : name === "gt1"
    ? "Get Through Paper 1"
    : name === "gt2"
    ? "Get Through Paper 2"
    : name === "gt3"
    ? "Get Through Paper 3"
    : name === "focus"
    ? "Focus Psychiatry Review "
    : name === "pretest"
    ? "Pretest Psychiatry "
    : name === "1200"
    ? "Psychiatry 1200 "
    : "Dr.Ghazi Telegram Group "
}

// Function to fetch questions from PocketBase
const fetchQuestions = async () => {
  loading.value = true

  try {
    const records = await pb
      .collection("flags")
      .getFirstListItem(`user.id="${pb.authStore.record?.id}"`, {
        expand: "mcqs,user",
      })
    questions.value = records.expand?.mcqs
    collection.value = records.id

    // Initialize `selectedOptions` array based on the number of questions
    selectedOptions.value = Array(questions.value.length).fill(null)
  } catch (error) {
    console.error("Error fetching questions:", error)
  }
  loading.value = false
}

const deleteFlaggedMCQ = async (index: number) => {
  try {
    const mcqId = questions.value[index]?.id

    if (!mcqId) {
      throw new Error("MCQ ID is undefined")
    }

    if (questions.value.length === 1) {
      await pb.collection("flags").delete(collection.value)
      console.log(`Deleted collection with ID: ${collection.value}`)
      questions.value = []
      selectedOptions.value = []
      return
    } else {
      await pb.collection("flags").update(collection.value, { "mcqs-": mcqId })
      questions.value.splice(index, 1)
      selectedOptions.value.splice(index, 1)
      console.log(`Deleted MCQ with ID: ${mcqId}`)
    }
  } catch (error) {
    console.error("Error deleting flagged MCQ:", error)
  }
}

const selectOption = async (
  index: number,
  letter: any,
  option: any,
  correctAnswer: any
) => {
  if (selectedOptions.value[index] === null) {
    selectedOptions.value[index] = option
    if (letter === correctAnswer) {
      right.value += 1
    } else {
      wrong.value += 1
      questions.value[index].showCorrectAnswer = true
    }
  }
}
</script>

<template>
  <div v-if="loading" class="container">
    <article aria-busy="true"></article>
  </div>
  <div v-else-if="!questions.length" class="container">
    <p class="end">There are no flagged questions</p>
  </div>
  <div v-else class="container">
    <p>
      {{
        questions.length > 1
          ? questions.length + " questions"
          : questions.length + " question"
      }}
    </p>
    <div class="questions-container">
      <div
        v-if="questions"
        v-for="(question, index) in questions"
        :key="index"
        class="question-card"
      >
        <span>From </span>
        <span
          >{{ selectedBookName(question.book) }}, {{ question.chapter }}</span
        >
        <hr />
        <p class="question-text">{{ index + 1 }} - {{ question.question }}</p>
        <ul class="options-list">
          <li
            v-for="(option, letter) in question.options"
            :key="letter"
            class="option"
            :class="{
              'correct-option':
                letter === question.correct_answer &&
                (selectedOptions[index] === option ||
                  question.showCorrectAnswer),
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
        <details v-if="selectedOptions[index] !== null">
          <summary role="button" class="outline secondary">Explanation</summary>
          <p class="explanation">{{ question.explanation }}</p>
        </details>
        <button @click="deleteFlaggedMCQ(index)">Delete</button>

        <!-- <button @click="toggleFlagQuestion(index)">
            {{ flaggedQuestions[index] ? "Unflag" : "Flag" }}
          </button> -->
      </div>
    </div>
    <p class="end">End of MCQs</p>
  </div>
</template>

<style scoped>
span {
  color: #aaaaaa !important;
}

.from {
  color: #0171ad69 !important;
}

.flex-1 {
  flex-grow: 2;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  color: #999999;
}

.flex-2 {
  max-width: 250px;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.score-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #f5f5f5;
  border-top: 1px solid #ddd;
  padding: 10px 10px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
}

.score-bar button {
  padding: 4px 8px;
  border: none;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  font-size: 16px;
}

.score-bar button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.margin-2 {
  margin-left: 4px;
}

.fa-square-poll-vertical {
  color: #017fc0;
}
.fa-square-check {
  color: #398712;
}
.fa-square-xmark {
  color: #d93526;
}

.save {
  background-color: rgb(71, 164, 23, 0.8);
}
.load {
  background-color: rgb(216, 161, 0, 0.8);
}
.randomize {
  background-color: rgb(1, 127, 192, 0.8);
}

.question-card {
  background-color: #f8f8f8;
  border: 1px solid #ffffff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 15px;
  text-align: left;
}

.end {
  margin-bottom: 80px;
  text-align: center;
}

.question-text {
  font-size: 1.1rem;
  margin-bottom: 15px;
  color: #555;
}

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

.explanation {
  color: #777;
}

@media screen and (max-width: 500px) {
  .flex-1 {
    font-size: 13px;
  }
  .score-bar button {
    font-size: 13px;
  }
}

@media screen and (max-width: 400px) {
  .toHide {
    display: none;
  }
}

@media screen and (max-width: 350px) {
  .toHide2 {
    display: none;
  }
}
</style>
