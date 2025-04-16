<script setup lang="ts">
import ChapterMCQs from './ChapterMCQs.vue'
import { ref, defineProps, computed, inject } from 'vue'
import PocketBase from 'pocketbase'
import Edit from './Edit.vue'
import { trackEvent } from '../analytics'

const pb = inject('pb') as PocketBase

const props = defineProps<{
  selectedBook: string
  editing: boolean
}>()

let questionsData = ref<Record<string, any>>({})
let selectedChapter = ref('')
const loading = ref(false)

const chapterOptions: Record<string, { value: string; label: string }[]> = {
  bof1: [
    {
      value: 'Chapter 1: Clinical Skills',
      label: 'Chapter 1: Clinical Skills'
    },
    {
      value: 'Chapter 2: Core Clinical Psychiatry',
      label: 'Chapter 2: Core Clinical Psychiatry'
    },
    {
      value: 'Chapter 3: Psychopathology',
      label: 'Chapter 3: Psychopathology'
    },
    { value: 'Chapter 4: Psychology', label: 'Chapter 4: Psychology' },
    {
      value: 'Chapter 5: Psychopharmacology',
      label: 'Chapter 5: Psychopharmacology'
    },
    {
      value: 'Chapter 6: History, Social Psychiatry and Ethics',
      label: 'Chapter 6: History, Social Psychiatry and Ethics'
    }
  ],
  bof2: [
    {
      value: 'Chapter 1: Psychiatric Genetics',
      label: 'Chapter 1: Psychiatric Genetics'
    },
    { value: 'Chapter 2: Epidemiology', label: 'Chapter 2: Epidemiology' },
    {
      value: 'Chapter 3: Advanced Psychology',
      label: 'Chapter 3: Advanced Psychology'
    },
    { value: 'Chapter 4: Pharmacology', label: 'Chapter 4: Pharmacology' },
    { value: 'Chapter 5: Neurosciences', label: 'Chapter 5: Neurosciences' }
  ],
  bof3: [
    {
      value: 'Chapter 1: General Adult Psychiatry',
      label: 'Chapter 1: General Adult Psychiatry'
    },
    {
      value: 'Chapter 2: Forensic and Rehabilitation Psychiatry',
      label: 'Chapter 2: Forensic and Rehabilitation Psychiatry'
    },
    {
      value: 'Chapter 3: Child Psychiatry and Learning Disabilities',
      label: 'Chapter 3: Child Psychiatry and Learning Disabilities'
    },
    {
      value: 'Chapter 4: Old Age Psychiatry',
      label: 'Chapter 4: Old Age Psychiatry'
    },
    {
      value: 'Chapter 5: Substance Use Disorders',
      label: 'Chapter 5: Substance Use Disorders'
    },
    {
      value: 'Chapter 6: Organic, Liaison, and Perinatal Psychiatry',
      label: 'Chapter 6: Organic, Liaison, and Perinatal Psychiatry'
    },
    { value: 'Chapter 7: Psychotherapy', label: 'Chapter 7: Psychotherapy' },
    {
      value: 'Chapter 8: Basic Statistics',
      label: 'Chapter 8: Basic Statistics'
    }
  ],
  '600-1': [
    { value: 'Chapter 1', label: 'Chapter 1' },
    { value: 'Chapter 2', label: 'Chapter 2' },
    { value: 'Chapter 3', label: 'Chapter 3' },
    { value: 'Chapter 4', label: 'Chapter 4' },
    { value: 'Chapter 5', label: 'Chapter 5' }
  ],
  '600-2': [
    { value: 'Chapter 1', label: 'Chapter 1' },
    { value: 'Chapter 2', label: 'Chapter 2' },
    { value: 'Chapter 3', label: 'Chapter 3' },
    { value: 'Chapter 4', label: 'Chapter 4' },
    { value: 'Chapter 5', label: 'Chapter 5' }
  ],
  '501': [
    { value: 'Part 1', label: 'Part 1' },
    { value: 'Part 2', label: 'Part 2' },
    { value: 'Part 3', label: 'Part 3' },
    { value: 'Part 4', label: 'Part 4' },
    { value: 'Part 5', label: 'Part 5' },
    { value: 'Part 6', label: 'Part 6' },
    { value: 'Part 7', label: 'Part 7' },
    { value: 'Part 8', label: 'Part 8' },
    { value: 'Part 9', label: 'Part 9' },
    { value: 'Part 10', label: 'Part 10' }
  ],
  prite: [
    { value: 'Part 1', label: 'Part 1' },
    { value: 'Part 2', label: 'Part 2' },
    { value: 'Part 3', label: 'Part 3' },
    { value: 'Part 4', label: 'Part 4' },
    { value: 'Part 5', label: 'Part 5' },
    { value: 'Part 6', label: 'Part 6' },
    { value: 'Part 7', label: 'Part 7' },
    { value: 'Part 8', label: 'Part 8' },
    { value: 'Part 9', label: 'Part 9' },
    { value: 'Part 10', label: 'Part 10' },
    { value: 'Part 11', label: 'Part 11' },
    { value: 'Part 12', label: 'Part 12' }
  ],
  '1200': [
    {
      value: 'Chapter 1: PSYCHOPATHOLOGY',
      label: 'Chapter 1: PSYCHOPATHOLOGY'
    },
    { value: 'Chapter 2: SCHIZOPHRENIA', label: 'Chapter 2: SCHIZOPHRENIA' },
    { value: 'Chapter 3: MOOD DISORDERS', label: 'Chapter 3: MOOD DISORDERS' },
    {
      value: 'Chapter 4: ANXIETY DISORDERS',
      label: 'Chapter 4: ANXIETY DISORDERS'
    },
    {
      value: 'Chapter 5: GERIATRIC PSYCHIATRY',
      label: 'Chapter 5: GERIATRIC PSYCHIATRY'
    },
    {
      value: 'Chapter 6: CHILD PSYCHIATRY',
      label: 'Chapter 6: CHILD PSYCHIATRY'
    },
    {
      value: 'Chapter 7: CONSULTATION LIAISON PSYCHIATRY',
      label: 'Chapter 7: CONSULTATION LIAISON PSYCHIATRY'
    },
    {
      value: 'Chapter 8: FORENSIC PSYCHIATRY',
      label: 'Chapter 8: FORENSIC PSYCHIATRY'
    },
    { value: 'Chapter 9: SUBSTANCE USE', label: 'Chapter 9: SUBSTANCE USE' },
    {
      value: 'Chapter 10: EATING AND SEXUAL DISORDERS',
      label: 'Chapter 10: EATING AND SEXUAL DISORDERS'
    },
    {
      value: 'Chapter 11: MENTAL RETARDATION',
      label: 'Chapter 11: MENTAL RETARDATION'
    },
    {
      value: 'Chapter 12: SLEEP DISORDERS',
      label: 'Chapter 12: SLEEP DISORDERS'
    },
    {
      value: 'Chapter 13: PERSONALITY DISORDERS',
      label: 'Chapter 13: PERSONALITY DISORDERS'
    },
    {
      value: 'Chapter 14: PSYCHOPHARMACOLOGY',
      label: 'Chapter 14: PSYCHOPHARMACOLOGY'
    },
    {
      value: 'Chapter 15: PSYCHOTHERAPY',
      label: 'Chapter 15: PSYCHOTHERAPY'
    },
    {
      value: 'Chapter 16: PSYCHOLOGY',
      label: 'Chapter 16: PSYCHOLOGY'
    },
    {
      value: 'Chapter 17: EMERGENCY PSYCHIATRY',
      label: 'Chapter 17: EMERGENCY PSYCHIATRY'
    },
    {
      value: 'Chapter 18: NEUROLOGY',
      label: 'Chapter 18: NEUROLOGY'
    },
    {
      value: 'Chapter 19: MISCELLANEOUS QUESTIONS',
      label: 'Chapter 19: MISCELLANEOUS QUESTIONS'
    }
  ],
  gt1: [
    {
      value: 'Basic psychological processes',
      label: 'Basic psychological processes'
    },
    {
      value: 'Learning theory and personality',
      label: 'Learning theory and personality'
    },
    { value: 'Human development', label: 'Human development' },
    {
      value: 'Social psychology and basic psychological treatments',
      label: 'Social psychology and basic psychological treatments'
    },
    {
      value: 'Descriptive psychopathology',
      label: 'Descriptive psychopathology'
    },
    {
      value: 'Psychopharmacology: antidepressants and anxiolytics',
      label: 'Psychopharmacology: antidepressants and anxiolytics'
    },
    {
      value: 'Psychopharmacology: antipsychotics and organic disorders',
      label: 'Psychopharmacology: antipsychotics and organic disorders'
    },
    { value: 'Clinical psychiatry 1', label: 'Clinical psychiatry 1' },
    { value: 'Clinical psychiatry 2', label: 'Clinical psychiatry 2' },
    { value: 'Clinical psychiatry 3', label: 'Clinical psychiatry 3' },
    { value: 'Clinical psychiatry 4', label: 'Clinical psychiatry 4' },
    { value: 'Clinical psychiatry 5', label: 'Clinical psychiatry 5' }
  ],
  gt2: [
    {
      value: 'Advanced psychological processes and treatments 1',
      label: 'Advanced psychological processes and treatments 1'
    },
    {
      value: 'Advanced psychological processes and treatments 2',
      label: 'Advanced psychological processes and treatments 2'
    },
    {
      value: 'Advanced psychology, pharmacology and treatments',
      label: 'Advanced psychology, pharmacology and treatments'
    },
    {
      value: 'Neurosciences',
      label: 'Neurosciences'
    },
    {
      value: 'Genetics and basic neurosciences',
      label: 'Genetics and basic neurosciences'
    },
    {
      value: 'Psychopharmacology',
      label: 'Psychopharmacology'
    },
    {
      value: 'Epidemiology',
      label: 'Epidemiology'
    }
  ],
  gt3: [
    {
      value: 'General adult psychiatry 1',
      label: 'General adult psychiatry 1'
    },
    {
      value: 'General adult psychiatry 2',
      label: 'General adult psychiatry 2'
    },
    {
      value: 'Old age psychiatry',
      label: 'Old age psychiatry'
    },
    {
      value: 'Addiction psychiatry and forensic psychiatry',
      label: 'Addiction psychiatry and forensic psychiatry'
    },
    {
      value: 'Child and adolescent psychiatry and learning disability',
      label: 'Child and adolescent psychiatry and learning disability'
    },
    {
      value:
        'Research methods, evidence-based practice, statistics and critical appraisal 1',
      label:
        'Research methods, evidence-based practice, statistics and critical appraisal 1'
    },
    {
      value:
        'Research methods, evidence-based practice, statistics and critical appraisal 2',
      label:
        'Research methods, evidence-based practice, statistics and critical appraisal 2'
    }
  ],
  spmm: [
    { value: 'Basic Psychology', label: 'Basic Psychology' },
    { value: 'Social Psychology', label: 'Social Psychology' },
    { value: 'Sociocultural Psychiatry', label: 'Sociocultural Psychiatry' },
    { value: 'Human Development', label: 'Human Development' },
    { value: 'Neuroanatomy', label: 'Neuroanatomy' },
    { value: 'Neuroaphysiology', label: 'Neuroaphysiology' },
    { value: 'Neurochemistry', label: 'Neurochemistry' },
    { value: 'Molecular Genetics', label: 'Molecular Genetics' },
    { value: 'Neuropathology', label: 'Neuropathology' },
    { value: 'Applied Neurosciences', label: 'Applied Neurosciences' },
    { value: 'Basic Pharmacology', label: 'Basic Pharmacology' },
    { value: 'Pharmacokinetics', label: 'Pharmacokinetics' },
    { value: 'Pharmacodynamics', label: 'Pharmacodynamics' },
    { value: 'Adverse Effects', label: 'Adverse Effects' },
    { value: 'Classification', label: 'Classification' },
    { value: 'Clinical Examination', label: 'Clinical Examination' },
    {
      value: 'Descriptive Psychopathology',
      label: 'Descriptive Psychopathology'
    },
    { value: 'Dynamic Psychopathology', label: 'Dynamic Psychopathology' },
    { value: 'Rating scales', label: 'Rating scales' },
    { value: '2016 paper 1', label: '2016 paper 1' },
    { value: '2016 paper 2', label: '2016 paper 2' },
    { value: '2016 Additional', label: '2016 Additional' },
    { value: '2017 paper 1', label: '2017 paper 1' },
    { value: '2017 paper 2', label: '2017 paper 2' },
    { value: '2018 paper 1', label: '2018 paper 1' },
    { value: '2018 paper 2', label: '2018 paper 2' },
    { value: '2019 paper 1', label: '2019 paper 1' },
    { value: '2019 paper 2', label: '2019 paper 2' },
    { value: '2020 paper 1', label: '2020 paper 1' },
    { value: '2020 paper 2', label: '2020 paper 2' },
    { value: '2021 paper 1', label: '2021 paper 1' },
    { value: '2021 paper 2', label: '2021 paper 2' },
    { value: '2021 Additional', label: '2021 Additional' }
  ],
  ghazi: [
    { value: 'Part 1', label: 'Part 1' },
    { value: 'Part 2', label: 'Part 2' },
    { value: 'Part 3', label: 'Part 3' },
    { value: 'Part 4', label: 'Part 4' },
    { value: 'Part 5', label: 'Part 5' },
    { value: 'Part 6', label: 'Part 6' }
  ],
  focus: [
    { value: 'Part 1', label: 'Part 1' },
    { value: 'Part 2', label: 'Part 2' },
    { value: 'Part 3', label: 'Part 3' },
    { value: 'Part 4', label: 'Part 4' }
  ],
  apa: [
    {
      value: 'Psychiatric Interview and Mental Status Examination',
      label: 'Psychiatric Interview and Mental Status Examination'
    },
    {
      value: 'DSM-5 as a Framework for Psychiatric Diagnosis',
      label: 'DSM-5 as a Framework for Psychiatric Diagnosis'
    },
    { value: 'Psychological Assessment', label: 'Psychological Assessment' },
    {
      value: 'Laboratory Testing and Imaging Studies in Psychiatry',
      label: 'Laboratory Testing and Imaging Studies in Psychiatry'
    },
    {
      value: 'Normal Child and Adolescent Development',
      label: 'Normal Child and Adolescent Development'
    },
    {
      value: 'Clinical Issues in Psychiatry and the Law',
      label: 'Clinical Issues in Psychiatry and the Law'
    },
    {
      value: 'Ethical Aspects of Clinical Psychiatry',
      label: 'Ethical Aspects of Clinical Psychiatry'
    },
    {
      value: 'Neurodevelopmental Disorders',
      label: 'Neurodevelopmental Disorders'
    },
    {
      value: 'Schizophrenia Spectrum and Other Psychotic Disorders',
      label: 'Schizophrenia Spectrum and Other Psychotic Disorders'
    },
    {
      value: 'Bipolar and Related Disorders',
      label: 'Bipolar and Related Disorders'
    },
    { value: 'Depressive Disorders', label: 'Depressive Disorders' },
    { value: 'Anxiety Disorders', label: 'Anxiety Disorders' },
    {
      value: 'Obsessive-Compulsive and Related Disorders',
      label: 'Obsessive-Compulsive and Related Disorders'
    },
    {
      value: 'Trauma- and Stressor-Related Disorders',
      label: 'Trauma- and Stressor-Related Disorders'
    },
    { value: 'Dissociative Disorders', label: 'Dissociative Disorders' },
    {
      value: 'Somatic Symptom and Related Disorders',
      label: 'Somatic Symptom and Related Disorders'
    },
    {
      value: 'Feeding and Eating Disorders',
      label: 'Feeding and Eating Disorders'
    },
    { value: 'Elimination Disorders', label: 'Elimination Disorders' },
    { value: 'Sleep-Wake Disorders', label: 'Sleep-Wake Disorders' },
    { value: 'Sexual Dysfunctions', label: 'Sexual Dysfunctions' },
    { value: 'Gender Dysphoria', label: 'Gender Dysphoria' },
    {
      value: 'Disruptive, Impulse-Control, and Conduct Disorders',
      label: 'Disruptive, Impulse-Control, and Conduct Disorders'
    },
    {
      value: 'Substance-Related and Addictive Disorders',
      label: 'Substance-Related and Addictive Disorders'
    },
    { value: 'Neurocognitive Disorders', label: 'Neurocognitive Disorders' },
    { value: 'Personality Disorders', label: 'Personality Disorders' },
    { value: 'Paraphilic Disorders', label: 'Paraphilic Disorders' },
    { value: 'Psychopharmacology', label: 'Psychopharmacology' },
    {
      value: 'Brain Stimulation Therapies',
      label: 'Brain Stimulation Therapies'
    },
    { value: 'Brief Psychotherapies', label: 'Brief Psychotherapies' },
    {
      value: 'Psychodynamic Psychotherapy',
      label: 'Psychodynamic Psychotherapy'
    },
    {
      value: 'Mentalizing in Psychotherapy',
      label: 'Mentalizing in Psychotherapy'
    },
    {
      value: 'Cognitive-Behavior Therapy',
      label: 'Cognitive-Behavior Therapy'
    },
    { value: 'Supportive Psychotherapy', label: 'Supportive Psychotherapy' },
    {
      value: 'Treatment of Children and Adolescents',
      label: 'Treatment of Children and Adolescents'
    },
    { value: 'Treatment of Seniors', label: 'Treatment of Seniors' },
    {
      value: 'Treatment of Culturally Diverse Populations',
      label: 'Treatment of Culturally Diverse Populations'
    },
    {
      value: 'Treatment of Lesbian, Gay, Bisexual, and Transgender Patients',
      label: 'Treatment of Lesbian, Gay, Bisexual, and Transgender Patients'
    },
    { value: 'Treatment of Women', label: 'Treatment of Women' }
  ],
  pretest: [
    {
      value: 'Evaluation, Assessment, and Diagnosis',
      label: 'Evaluation, Assessment, and Diagnosis'
    },
    {
      value: 'Human Behavior: Theories of Personality and Development',
      label: 'Human Behavior: Theories of Personality and Development'
    },
    {
      value: 'Human Behavior: Biologic and Related Sciences',
      label: 'Human Behavior: Biologic and Related Sciences'
    },
    {
      value: 'Disorders Seen in Childhood and Adolescence',
      label: 'Disorders Seen in Childhood and Adolescence'
    },
    {
      value: 'Neurocognitive Disorders and Consultation-Liaison Psychiatry',
      label: 'Neurocognitive Disorders and Consultation-Liaison Psychiatry'
    },
    {
      value: 'Schizophrenia and Other Psychotic Disorders',
      label: 'Schizophrenia and Other Psychotic Disorders'
    },
    { value: 'Psychotherapies', label: 'Psychotherapies' },
    { value: 'Mood Disorders', label: 'Mood Disorders' },
    {
      value: 'Anxiety, Obsessive-Compulsive, Trauma',
      label: 'Anxiety, Obsessive-Compulsive, Trauma'
    },
    {
      value: 'Personality Disorders, Human Sexuality',
      label: 'Personality Disorders, Human Sexuality'
    },
    {
      value: 'Substance-Related Disorders',
      label: 'Substance-Related Disorders'
    },
    {
      value: 'Psychopharmacology and Other Somatic Therapies',
      label: 'Psychopharmacology and Other Somatic Therapies'
    },
    {
      value: 'Law and Ethics in Psychiatry',
      label: 'Law and Ethics in Psychiatry'
    }
  ],
  testprep: [
    {
      value: 'Chapter 1',
      label: 'Chapter 1'
    },
    {
      value: 'Chapter 2',
      label: 'Chapter 2'
    },
    {
      value: 'Chapter 3',
      label: 'Chapter 3'
    },
    {
      value: 'Chapter 4',
      label: 'Chapter 4'
    },
    {
      value: 'Chapter 5',
      label: 'Chapter 5'
    },
    {
      value: 'Chapter 6',
      label: 'Chapter 6'
    }
  ]
}

const loadQuestionsData = async (
  selectedBook: string,
  selectedChapter: string
) => {
  loading.value = true

  trackEvent('chapter_click', {
    event_category: 'interaction',
    event_label: 'Chapter Selected',
    value: pb.authStore.record?.name + selectedChapter
  })

  try {
    const records = await pb.collection('mcqs').getFullList({
      filter: `book = "${selectedBook}" && chapter = "${selectedChapter}"`,
      sort: 'number'
    })
    questionsData.value = records
  } catch (error) {
    console.error('Error loading questions data:', error)
    questionsData.value = {}
  }
  loading.value = false
}

const selectedBookName = computed(() => {
  return props.selectedBook === 'bof1'
    ? 'Best Of Five 1: 450 MCQ'
    : props.selectedBook === 'bof2'
    ? 'Best Of Five 2: 455 MCQ'
    : props.selectedBook === 'bof3'
    ? 'Best Of Five 3: 450 MCQ'
    : props.selectedBook === '600-1'
    ? '600 Paper 1: 634 MCQ'
    : props.selectedBook === '600-2'
    ? '600 Paper 2: 665 MCQ'
    : props.selectedBook === '501'
    ? '501 Psychopharmacology: 566 MCQ'
    : props.selectedBook === 'spmm'
    ? 'SPMM: 2375 MCQ'
    : props.selectedBook === 'gt1'
    ? 'Get Through Paper 1: 640 MCQ'
    : props.selectedBook === 'gt2'
    ? 'Get Through Paper 2: 350 MCQ'
    : props.selectedBook === 'gt3'
    ? 'Get Through Paper 3: 387 MCQ'
    : props.selectedBook === 'focus'
    ? 'Focus Psychiatry Review: 500 MCQ '
    : props.selectedBook === 'pretest'
    ? 'Pretest Psychiatry: 400 MCQ '
    : props.selectedBook === '1200'
    ? 'Psychiatry 1200: 1170 MCQ '
    : props.selectedBook === 'apa'
    ? 'APA: 515 MCQ '
    : 'Dr.Ghazi Telegram Group : 296 MCQ'
})

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div>
    <h5>{{ selectedBookName }}</h5>
    <select
      name="select"
      aria-label="Select"
      required
      class="primary"
      v-model="selectedChapter"
      @change="loadQuestionsData(selectedBook, selectedChapter)"
    >
      <option selected disabled value="">Select Chapter</option>
      <option
        v-for="option in chapterOptions[selectedBook] || []"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <article v-if="loading" aria-busy="true">Loading...</article>

    <ChapterMCQs
      v-else-if="
        questionsData &&
        Object.keys(questionsData).length > 0 &&
        selectedBook &&
        !editing
      "
      :key="JSON.stringify(questionsData[0]?.question || '')"
      :questionsData="questionsData"
      :selectedBook="selectedBook"
      :selectedChapter="selectedChapter"
    />
    <Edit
      v-else-if="
        questionsData &&
        Object.keys(questionsData).length > 0 &&
        selectedBook &&
        editing
      "
      :key="JSON.stringify(questionsData[0]?.explanation || '')"
      :questionsData="questionsData"
    />
  </div>
  <button class="scroll-to-top" @click="scrollToTop">↑</button>
</template>

<style scoped>
/* ...existing code... */

.scroll-to-top {
  position: fixed;
  bottom: 60px;
  right: 16px;
  background-color: var(--pico-color-azure-500);
  color: white;
  border: none;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 40px;
  height: 40px;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.scroll-to-top:hover {
  background-color: var(--pico-color-azure-200);
  transform: scale(1.1);
}

.scroll-to-top:active {
  transform: scale(0.9);
}
</style>
