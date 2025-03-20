<script setup lang="ts">
import { ref, computed, inject, onMounted } from "vue"
import PocketBase from "pocketbase"

const pb = inject("pb") as PocketBase

const props = defineProps(["questionsData", "selectedChapter", "selectedBook"])

const questions = ref(props.questionsData)
const selectedOptions = ref(Array(questions.value.length).fill(null))
const right = ref(0)
const wrong = ref(0)
const saving = ref(false)
const flaggedQuestions = ref<any[]>([])
const flagging = ref(false)
const isDarkMode = ref(
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
)

const fullscreenImage = ref<string | null>(null) // Track the image for fullscreen view

const openFullscreen = (imageUrl: string) => {
  fullscreenImage.value = imageUrl
}

const closeFullscreen = () => {
  fullscreenImage.value = null
}

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    isDarkMode.value = e.matches
  })

const loadProgress = async () => {
  saving.value = true
  try {
    const progress = await pb
      .collection("progress")
      .getFirstListItem(
        `user = "${pb.authStore.record?.id}" && book = "${props.selectedBook}" && chapter = "${props.selectedChapter}"`
      )

    if (progress?.answered) {
      // Map saved answers back to the current questions
      selectedOptions.value = questions.value.map((question: any) => {
        const savedAnswer = progress.answered.find(
          (item: any) => item.questionId === question.id
        )
        if (savedAnswer) {
          question.showCorrectAnswer = savedAnswer.showCorrectAnswer
        }
        return savedAnswer?.selectedOption || null
      })

      right.value = progress.right || 0
      wrong.value = progress.wrong || 0
    }
  } catch (err) {
    console.log("No progress found for this chapter:", err)
  }
  saving.value = false
}

const saveProgress = async () => {
  saving.value = true

  // Map answers to question IDs
  const answered = questions.value.map((question: any, index: any) => ({
    questionId: question.id, // Assuming each question has a unique `id`
    selectedOption: selectedOptions.value[index],
    showCorrectAnswer: question.showCorrectAnswer || false,
  }))

  const payload = {
    user: pb.authStore.record?.id,
    chapter: props.selectedChapter,
    book: props.selectedBook,
    answered,
    right: right.value,
    wrong: wrong.value,
  }

  try {
    const existingProgress = await pb
      .collection("progress")
      .getFirstListItem(
        `user = "${pb.authStore.record?.id}" && book = "${props.selectedBook}" && chapter = "${props.selectedChapter}"`
      )

    if (existingProgress) {
      await pb.collection("progress").update(existingProgress.id, payload)
    }
  } catch {
    await pb.collection("progress").create(payload)
  }

  saving.value = false
}

// Function to handle option selection
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

const loadFlaggedQuestions = async () => {
  try {
    const count = await pb
      .collection("flags")
      .getFirstListItem(`user.id="${pb.authStore.record?.id}"`, {
        expand: "mcqs",
      })

    if (!count || !count.expand?.mcqs) {
      throw new Error("No flagged questions found")
    }

    let filtered = count.expand?.mcqs.filter((item: any) => {
      return (
        item.book === props.selectedBook &&
        item.chapter === props.selectedChapter
      )
    })

    if (filtered && filtered[0]) {
      flaggedQuestions.value = filtered
      return { id: count.id, count: count.expand?.mcqs.length }
    } else {
      return { id: count.id, count: count.expand?.mcqs.length }
    }
  } catch (err) {
    console.log("No flagged questions found for this chapter:", err)
  }
}

const toggleFlag = async (id: string, index: number) => {
  if (!pb.authStore.record) {
    return
  }
  flagging.value = true

  try {
    // Load flagged questions
    const flagged = await loadFlaggedQuestions()

    // If no flagged questions are found, create a new flag record
    if (!flagged?.id) {
      const newFlagRecord = await pb.collection("flags").create({
        user: pb.authStore.record?.id,
        mcqs: [id],
      })

      flaggedQuestions.value.push(questions.value[index]) // Add to flagged questions
      return // Exit early after creating the new flag
    }

    // Check if the question is already flagged
    const isFlagged = flaggedQuestions.value.some(
      (question: any) => question.id === id
    )

    if (isFlagged) {
      if (flagged.count > 1) {
        // If flagged, unflag the question
        await pb.collection("flags").update(flagged.id, {
          "mcqs-": id,
        })

        flaggedQuestions.value = flaggedQuestions.value.filter(
          (question: any) => question.id !== id
        ) // Remove from flagged questions
      } else {
        // If flagged, unflag the question
        await pb.collection("flags").delete(flagged.id)

        flaggedQuestions.value = flaggedQuestions.value.filter(
          (question: any) => question.id !== id
        ) // Remove from flagged questions
      }
    } else {
      // If not flagged, flag the question
      await pb.collection("flags").update(flagged.id, {
        "mcqs+": id,
      })

      flaggedQuestions.value.push(questions.value[index]) // Add to flagged questions
    }
  } catch (error) {
    console.error("Error in toggling flag:", error)
  }
  flagging.value = false
}

const randomizeQuestions = () => {
  const combined = questions.value.map((question: any, index: any) => ({
    question,
    selectedOption: selectedOptions.value[index],
  }))

  // Shuffle the combined array
  combined.sort(() => Math.random() - 0.5)

  // Update questions and selected options based on the shuffled array
  questions.value = combined.map((item: { question: any }) => item.question)
  selectedOptions.value = combined.map(
    (item: { selectedOption: any }) => item.selectedOption
  )
}

const percentageScore = computed(
  () => (right.value / questions.value.length) * 100
)
const totalQuestions = computed(() => questions.value.length)
const correctAnswers = computed(() => right.value)
const IncorrectAnswers = computed(() => wrong.value)

onMounted(() => {
  loadFlaggedQuestions()
})
</script>

<template>
  <div :class="{ dark: isDarkMode }">
    <div class="container">
      <div id="app">
        <div class="questions-container">
          <div
            v-for="(question, index) in questions"
            :key="index"
            class="question-card"
          >
            <div class="question-image">
              <img
                v-if="question.image"
                :src="`https://mcq-db.dakakean.com/api/files/mcqs/${question.id}/${question.image}`"
                alt=""
                @click="
                  openFullscreen(
                    `https://mcq-db.dakakean.com/api/files/mcqs/${question.id}/${question.image}`
                  )
                "
              />
            </div>
            <p class="question-text">
              {{ index + 1 }} - {{ question.question }}
            </p>
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
              <p class="explanation">{{ question.explanation }}</p>
            </details>
            <button
              :aria-busy="flagging"
              v-if="question.showCorrectAnswer"
              :class="
                flaggedQuestions.some((q) => q.id === question.id)
                  ? 'unflag'
                  : 'flag'
              "
              @click="toggleFlag(question.id, index)"
            >
              {{
                !flagging
                  ? flaggedQuestions.some((q) => q.id === question.id)
                    ? "unflag"
                    : "flag"
                  : "    "
              }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Fullscreen Image Modal -->
    <div
      v-if="fullscreenImage"
      class="fullscreen-modal"
      @click="closeFullscreen"
    >
      <img :src="fullscreenImage" alt="Fullscreen Image" />
    </div>

    <p class="end">End of MCQs</p>
    <!-- Sticky score bar -->

    <div class="score-bar">
      <div class="flex-1">
        <div class="toHide">
          <span>{{ totalQuestions }} MCQ</span>
        </div>
        <span class="toHide"> | </span>
        <div class="toHide2">
          <i class="fa-solid fa-square-poll-vertical"></i
          ><span class="margin-2">{{ percentageScore.toFixed(0) }}/100</span>
        </div>
        <span class="toHide2"> | </span>
        <div>
          <i class="fa-solid fa-square-check"></i
          ><span class="margin-2">{{ correctAnswers }}</span>
        </div>
        <span> | </span>
        <div>
          <i class="fa-solid fa-square-xmark"></i
          ><span class="margin-2">{{ IncorrectAnswers }}</span>
        </div>
        <span> | </span>
      </div>

      <div class="flex-2">
        <button :aria-busy="saving" class="save" @click="saveProgress">
          <span v-if="!saving"> Save </span>
        </button>
        <button :aria-busy="saving" class="load" @click="loadProgress">
          <span v-if="!saving">Load </span>
        </button>
        <button class="randomize" @click="randomizeQuestions">Randomize</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.clickable-image {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.clickable-image:hover {
  transform: scale(1.05);
}

.fullscreen-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.fullscreen-modal img {
  max-width: 99%;
  max-height: 99%;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

.question-image {
  margin: auto;
  max-width: 100%;
  margin-bottom: 10px;
  display: flex;
}

.question-image img {
  max-width: 100%;
  border-radius: 8px;
  margin: auto;
}

.unflag {
  background-color: rgb(1, 127, 192, 0.8);
  border-color: transparent;
}

.flag {
  background-color: rgb(216, 161, 0, 0.8);
  border-color: transparent;
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
  padding-bottom: 10px;
  text-align: center;
}

.question-text {
  font-size: 1.1rem;
  margin-bottom: 15px;
  color: #4d4d4d;
}

.dark .question-text {
  color: #b6b6b6;
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

.dark {
  color: #e0e0e0;
}

.dark .question-card {
  background-color: #1b1b20;
  border-color: #333;
}

.dark .option {
  background-color: #484848;
  color: #c0bfbf;
}

.dark .correct-option {
  background-color: #4caf4f7c;
}

.dark .incorrect-option {
  background-color: #f4433686;
}

.dark .score-bar {
  background-color: #1e1e1e;
  border-top-color: #333;
}

.dark .save {
  background-color: #4caf4f4f;
}

.dark .load {
  background-color: #ff99003f;
}

.dark .randomize {
  background-color: #2195f33f;
}
</style>
