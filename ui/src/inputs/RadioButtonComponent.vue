<template>
  <div class="radio-group">
    <!-- Loop through the options and render each radio button -->
    <div v-for="option in question.options" :key="option" class="radio-option">
      <input
        type="radio"
        :id="option"
        :value="option"
        v-model="selectedOption"
        class="radio-input"
      />
      <label :for="option" class="radio-label">{{ option }}</label>
    </div>

    <!-- Confirm button -->
  </div>
  <button
    @click="emit('answer', selectedOption)"
    class="confirm-button"
    :disabled="!selectedOption"
  >
    Bekräfta val
  </button>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps(["question", "answers"]);
const emit = defineEmits(["answer"]);

const selectedOption = ref(props.answers[props.question.id]?.answer ?? "");
</script>

<style scoped lang="scss">
.radio-group {
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  padding: 15px;
  background-color: #fff;
  border-radius: 10px;
  flex-wrap: wrap;
}

.radio-option {
  position: relative;
}

.radio-input {
  display: none; /* Hide default radio button */
}

.radio-label {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ddd;
  font-size: 20px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.radio-input:checked + .radio-label {
  background-color: #007bff;
  color: white;
  transform: scale(1.1);
}

.confirm-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  width: 100%;
  max-width: 180px;
  align-self: center;
}

.confirm-button:hover {
  background-color: #218838;
}

.confirm-button:active {
  transform: scale(0.98);
}

.confirm-button:disabled {
  background-color: #d6e8d3;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .radio-group {
    padding: 10px;
  }

  .radio-label {
    width: 40px;
    height: 40px;
    font-size: 18px;
  }

  .confirm-button {
    font-size: 14px;
    padding: 8px 15px;
  }
}
</style>
