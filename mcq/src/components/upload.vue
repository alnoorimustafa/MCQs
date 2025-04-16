<script setup lang="ts">
import { inject } from 'vue'
import PocketBase from 'pocketbase'

const pb = inject('pb') as PocketBase

async function createMCQs() {
  try {
    const data = await import(`../mcqs-archive/dsm/22.json`)
    let mcqs = data.default

    const promises = mcqs.map((mcq, i) =>
      pb.collection('mcqs').create(
        {
          chapter: 'Alternative DSM-5 Model for Personality Disorders',
          book: 'dsm',
          ...mcq
        },
        { requestKey: mcq.number.toString() }
      )
    )
    const results = await Promise.all(promises)
    console.log('MCQs created successfully:', results)
  } catch (error) {
    console.error('Error creating MCQs:', error)
  }
}

async function downloadMCQs() {
  try {
    const mcqs = await pb.collection('mcqs').getList(1, 100, {
      filter: 'book="bof3"&&chapter="Basic Statistics"'
    })
    const data = JSON.stringify(mcqs, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = '3-8.json'
    a.click()
  } catch (error) {
    console.error('Error downloading MCQs:', error)
  }
}
</script>

<template>
  <button @click="createMCQs" style="margin-right: 10px">upload</button>
  <button @click="downloadMCQs">download</button>
</template>
