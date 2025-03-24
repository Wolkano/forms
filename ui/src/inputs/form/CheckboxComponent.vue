<template>
  <p class="question-title">{{ question?.question }}</p>
  <p class="question-text">{{ question?.text }}</p>
  <div class="checkbox-group">
    <!-- Loop through the options and render each checkbox -->

    <div
      v-for="option in question.options"
      :key="option"
      class="checkbox-option"
    >
      <input
        type="checkbox"
        :id="option"
        :value="option"
        v-model="selectedOptions"
        class="checkbox-input"
        @change="handleSelection(option)"
      />
      <label :for="option" class="checkbox-label">{{ option }}</label>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: ["question", "answers"],
  setup(props, { emit }) {
    console.log(props.answers[props.question.question]);
    const selectedOptions = ref(props.answers[props.question.question] ?? []);

    const handleSelection = (option) => {
      if (!props.question.multiple) {
        selectedOptions.value = [option]; // Only allow one selection if "multiple" is false
      }
      emit("answer", selectedOptions.value);
    };

    return { selectedOptions, handleSelection };
  },
};
</script>

<style scoped lang="scss">
.question-text {
  font-size: 12px;
  margin-bottom: 10px;
  text-align: center;
}

.question-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
.checkbox-group {
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-items: flex-start;
  width: 90%;
  margin: 20px auto;
  padding: 15px;
  background-color: #fff;
  border-radius: 10px;
  flex-wrap: wrap;
  .checkbox-option {
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
}

.checkbox-input {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #007bff; /* Custom color for checkboxes */
  transition: transform 0.5s ease;
  &:hover {
    transform: scale(1.3);
  }
  &:checked {
    transform: scale(1.5);
  }
}

.checkbox-label {
  cursor: pointer;
  font-size: 16px;
  color: #333;
  transition: color 0.3s ease;
}

.checkbox-label:hover {
  color: #007bff;
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
  width: 100%;
  max-width: 180px;
  align-self: center;
}

.confirm-button:hover {
  background-color: #0056b3;
}

.confirm-button:active {
  transform: scale(0.98);
}

.confirm-button:disabled {
  background-color: #9dc2e9;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .checkbox-group {
    padding: 10px;
  }

  .checkbox-label {
    font-size: 14px;
  }

  .confirm-button {
    font-size: 14px;
    padding: 8px 15px;
  }
}
</style>
