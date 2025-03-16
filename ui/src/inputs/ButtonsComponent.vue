<template>
  <div class="button-group" :class="themeClass">
    <!-- Loop through the options and render each button -->
    <button
      v-for="option in props.question.options"
      :key="option.value"
      @click="$emit('answer', option.value)"
      class="option-button"
    >
      {{ option.text }}
    </button>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps(["question"]);
</script>

<style scoped lang="scss">
.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
}

.option-button {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  text-align: center;
}

.option-button:hover {
  background-color: #0056b3;
}

.option-button:active {
  transform: scale(0.98);
}

@media (max-width: 768px) {
  .option-button {
    font-size: 14px;
    padding: 10px;
  }
}
</style>
