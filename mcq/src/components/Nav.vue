<script setup lang="ts">
import { defineProps, ref, onMounted, onUnmounted } from "vue"
import PocketBase from "pocketbase"

const emit = defineEmits(["logout"])
const pb = new PocketBase("https://mcq-db.dakakean.com")
const props = defineProps<{
  show: boolean
}>()

// Reactive variable for theme mode
const isDarkMode = ref(false)

// Function to update the theme mode based on system preference
const updateDarkMode = (event: any) => {
  isDarkMode.value = event.matches
}

onMounted(() => {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
  isDarkMode.value = mediaQuery.matches // Set initial value
  mediaQuery.addEventListener("change", updateDarkMode) // Listen for changes
})

// Cleanup listener when the component is unmounted
onUnmounted(() => {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
  mediaQuery.removeEventListener("change", updateDarkMode)
})

const deauthenticate = () => {
  console.log("de auth")

  if (pb.authStore.isValid) {
    console.log("de auth 2")
    try {
      pb.authStore.clear()
      emit("logout")
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<template>
  <div class="navigation">
    <div class="container">
      <nav v-if="!show">
        <ul>
          <li>Psychiatry MCQs</li>
        </ul>
        <div>
          <ul>
            <li>Login please</li>
          </ul>
        </div>
      </nav>
      <nav v-if="show">
        <ul>
          <li class="heading">
            <span class="sub"> Dr. Mustafa Alnoori Wish You Luck </span><br />
            {{
              pb.authStore.record?.name
                ? "Dr. " + pb.authStore.record?.name
                : ""
            }}
          </li>
        </ul>
        <ul>
          <li>
            <input
              type="button"
              value="Logout"
              class="secondary"
              @click.prevent="deauthenticate"
            />
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.sub {
  color: rgb(141, 141, 141);
}
.heading {
  font-size: 0.9rem;
}

.navigation nav ul {
  color: rgb(255, 255, 255);
}

.navigation div nav ul li span {
  color: white;
}

.navigation {
  background-color: var(--pico-color-azure-500);
}
</style>
