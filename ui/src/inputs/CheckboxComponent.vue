<template>
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

    <!-- Confirm button -->
    <button
      @click="
        () => {
          $emit('answer', selectedOptions), (selectedOptions = []);
        }
      "
      class="confirm-button"
      :disabled="!selectedOptions?.length"
    >
      Bekräfta val
    </button>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: ["question", "answers"],
  setup(props) {
    const selectedOptions = ref(props.answers[props.question.id]?.answer ?? []);

    const handleSelection = (option) => {
      if (!props.question.multiple) {
        selectedOptions.value = [option]; // Only allow one selection if "multiple" is false
      }
    };

    return { selectedOptions, handleSelection };
  },
};
</script>

<style scoped lang="scss">
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: flex-start;
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
  padding: 15px;
  background-color: #fff;
  border-radius: 10px;
}

.checkbox-option {
  display: flex;
  align-items: center;
  gap: 10px;
}

.checkbox-input {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #007bff; /* Custom color for checkboxes */
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
