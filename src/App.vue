<template>
  <div id="app">
    <!-- Existing content -->
    <router-view />
    <footer>
      <p>&copy; 2023 Your Company Name. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
footer {
  text-align: center;
  padding: 1em;
  background-color: #f1f1f1;
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
