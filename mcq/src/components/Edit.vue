<script setup lang="ts">
import { ref, inject } from "vue"
import PocketBase from "pocketbase"

const pb = inject("pb") as PocketBase

const props = defineProps(["questionsData"])

const questions = ref(props.questionsData)

const saving = ref(false)

const save = async () => {
  saving.value = true

  try {
    for (const question of questions.value) {
      await pb
        .collection("mcqs")
        .update(question.id, { ...question, explanation: question.explanation })

      console.log("saved question")
    }
  } catch (error) {
    console.log("Error saving explanations")
    console.log(error)
  }

  saving.value = false
}

const pasteFromClipboard = async (index: number) => {
  try {
    const text = await navigator.clipboard.readText()
    questions.value[index].explanation = text
  } catch (err) {
    console.error("Failed to read clipboard contents: ", err)
  }
}
</script>

<template>
  <div>
    <div class="container">
      <div id="app">
        <div class="questions-container">
          <div
            v-for="(question, index) in questions"
            :key="index"
            class="question-card"
          >
            <p class="question-text">
              {{ index + 1 }} - {{ question.question }}
            </p>
            <textarea
              name="explanation textarea"
              placeholder="no explanation yet"
              aria-label="explanation"
              v-model="question.explanation"
            />
            <button @click="pasteFromClipboard(index)">
              Paste from Clipboard
            </button>
          </div>
        </div>
        <p class="end">End of MCQs</p>
      </div>
    </div>
    <div class="score-bar">
      <div class="flex-1">
        <button :aria-busy="saving" class="save" @click="save">
          <span v-if="!saving"> Save </span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.container {
  padding: 0;
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
