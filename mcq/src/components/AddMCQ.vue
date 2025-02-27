<script setup lang="ts">
import { ref, inject } from "vue"
import PocketBase from "pocketbase"

const pb = inject("pb") as PocketBase

const question = ref("")
const options = ref(["", "", "", "", ""])
const correctAnswer = ref("")
const explanation = ref("")
const book = ref("child")
const chapter = ref("")
const number = ref()

const loading = ref(false)
const success = ref(false)
const error = ref("")

const addMCQ = async () => {
  number.value++
  loading.value = true
  error.value = ""
  success.value = false

  try {
    await pb.collection("mcqs").create({
      question: question.value,
      options: options.value,
      correct_answer: correctAnswer.value,
      explanation: explanation.value,
      book: book.value,
      chapter: chapter.value,
      number: number.value,
    })
    success.value = true
    // Clear the form
    question.value = ""
    options.value = ["", "", "", "", ""]
    correctAnswer.value = ""
    explanation.value = ""
    book.value = ""
  } catch (err) {
    console.error(err)
    error.value = "Failed to add MCQ. Please try again."
  }
  loading.value = false
}

const q = {
  question: `What percentage of genes in humans is responsible for regulating the growth and development of the central nervous system (CNS)?`,
  options: [
    "About 5%",
    "About 10%",
    "At least one-third",
    "At least 50%",
    "At least 75%",
  ],
  correctAnswer: "C",
  explanation:
    "Even though the exact number of genes expressed within CNS is unknown, it is estimated that at least one-third of the human genes is involved in regulating the growth and development of the CNS",
  book: "child",
  chapter: "Normal Growth and Development",
}
</script>

<template>
  <div class="container">
    <h2>Add New MCQ</h2>
    <input v-model="question" placeholder="Question" />
    <input v-model="number" placeholder="Number" />
    <div v-for="(option, index) in options" :key="index">
      <input v-model="options[index]" :placeholder="'Option ' + (index + 1)" />
    </div>
    <input v-model="correctAnswer" placeholder="Correct Answer" />
    <input v-model="explanation" placeholder="Explanation" />
    <!-- <input v-model="book" placeholder="Book" /> -->
    <select v-model="chapter" placeholder="Chapter">
      <option value="Normal Growth and Development">
        Normal Growth and Development
      </option>
      <option value="Neurodevelopmental Disorders">
        Neurodevelopmental Disorders
      </option>
      <option value="Schizophrenia Spectrum Disorders">
        Schizophrenia Spectrum Disorders
      </option>
      <option value="Bipolar and Depressive Disorders">
        Bipolar and Depressive Disorders
      </option>
      <option value="Disruptive and Conduct Disorders">
        Disruptive and Conduct Disorders
      </option>
      <option value="Anxiety and Dissociative Disorders">
        Anxiety and Dissociative Disorders
      </option>
      <option value="Feeding, Eating, and Related Disorders">
        Feeding, Eating, and Related Disorders
      </option>
      <option value="Somatic and Sleep-Wake Disorders">
        Somatic and Sleep-Wake Disorders
      </option>
      <option value="Substance-Related and Addictive Disorders">
        Substance-Related and Addictive Disorders
      </option>
      <option value="Special Issues">Special Issues</option>
      <option value="Psychological Testing and Rating Scales">
        Psychological Testing and Rating Scales
      </option>
      <option value="Psychopharmacology">Psychopharmacology</option>
      <option value="Psychotherapies">Psychotherapies</option>
      <option value="Treatment Settings and Outcome">
        Treatment Settings and Outcome
      </option>
      <option value="Special Topics">Special Topics</option>
      <option value="Research Design and Technologies">
        Research Design and Technologies
      </option>
      <option value="Case Histories and Treatment Planning">
        Case Histories and Treatment Planning
      </option>
    </select>
    <button :aria-busy="loading" @click="addMCQ">
      {{ loading ? "Adding..." : "Add MCQ" }}
    </button>
    <p v-if="success" class="success">MCQ added successfully!</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<style scoped>
.container {
  margin: auto;
  padding: 20px;
  max-width: 500px;
  display: flex;
  flex-direction: column;
}

input {
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.success {
  color: green;
  margin-top: 10px;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
