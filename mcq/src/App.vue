<script setup lang="ts">
import Login from "./components/Login.vue";
import Home from "./components/Home.vue";
</script>

<template>
  <div class="background-azure">
    <div class="container">
      <nav>
        <ul>
          <li>Psychiatry MCQs</li>
        </ul>
        <ul>
          <li>Dr. Mustafa Alnoori Wish You Luck</li>
        </ul>
      </nav>
    </div>
  </div>
  <Home />
  <Login />
</template>

<style scoped>
.background-azure {
  background-color: #017fc0;
}

nav ul {
  color: white;
}
</style>
