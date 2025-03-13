<template>
  <div class="chat-input-container">
    <!-- Range Slider Input -->
    <input
      type="range"
      :min="question?.min"
      :max="question?.max"
      v-model="selectedValue"
      class="slider-input"
      :step="question.step"
    />

    <!-- Display the selected value -->
    <p class="selected-value">{{ selectedValue }} {{ enhet }}</p>

    <!-- Confirm button -->
    <button @click="confirmSelection" class="confirm-button">Bekräfta</button>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  props: ["question"],
  setup(props, { emit }) {
    const selectedValue = ref((props.question.min + props.question.max) / 2);
    const enhet = computed(() => props.question.enhet);

    const confirmSelection = () => {
      emit("answer", selectedValue.value);
      selectedValue.value = 0;
    };

    return { selectedValue, confirmSelection, enhet };
  },
};
</script>

<style scoped lang="scss">
.chat-input-container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 85%;
  margin: 20px auto;
}

.slider-input {
  width: 100%;
  margin-bottom: 20px;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  height: 8px;
  background: #ddd;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.slider-input:hover {
  background-color: #007bff;
}

.slider-input:focus {
  outline: none;
}

.selected-value {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.confirm-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.confirm-button:hover {
  background-color: #0056b3;
}

.confirm-button:active {
  transform: scale(0.98);
}

@media (max-width: 768px) {
  .chat-input-container {
    padding: 15px;
    width: 90%;
  }

  .selected-value {
    font-size: 16px;
  }

  .confirm-button {
    font-size: 14px;
  }
}
</style>
