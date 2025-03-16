<template>
  <div class="progress-container">
    <div class="progress-bar" :style="{ width: props.progress + '%' }"></div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps(["progress"]);
</script>

<style lang="scss" scoped>
.progress-container {
  width: 100%;
  height: 20px;
}
.progress-bar {
  background-color: #007bff;
  height: 20px;
  border-radius: 20px;
  transition: width 0.5s ease-in-out;
}
</style>
