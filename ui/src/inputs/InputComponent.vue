<template>
  <div class="chat-input-container">
    <!-- Input field for user answer -->
    <h2>{{ props.question.label }}</h2>
    <span class="material-icons input_icon">{{
      props.question.inputIcon
    }}</span>
    <input
      v-model="answer"
      :type="props.question.inputType"
      :autocomplete="props.question.autocomplete"
      :placeholder="props.question.question"
      class="text-input"
    />

    <!-- Submit button -->
    <button
      @click="
        () => {
          $emit('answer', answer), (answer = '');
        }
      "
      :class="answer.length ? 'submit-button' : 'submit-button__disabled'"
      :disabled="!answer.length"
    >
      Bekräfta
    </button>
  </div>
</template>

<script setup>
import { defineProps, ref, computed } from "vue";

const props = defineProps(["question", "answers"]);
const initialValue = computed(() =>
  props.question.isCustomerInformation
    ? props.answers?.customerInformation?.[props?.question?.question]
    : props.answers[props.question.id]?.answer
);

const answer = ref(initialValue.value ?? ""); // Stores the input value
</script>

<style scoped lang="scss">
.chat-input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  width: 85%;
  margin: 20px auto;

  .input_icon {
    margin-bottom: 20px;
    color: #007bff;
    font-size: 50px;
  }
}

.question-label {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
  text-align: center;
}

.text-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 15px;
  transition: border-color 0.3s ease;
}

.text-input:focus {
  border-color: #007bff;
  outline: none;
}

.submit-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  &__disabled {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #9dc2e9;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    cursor: not-allowed;
  }
}

.submit-button:hover {
  background-color: #0056b3;
}

.submit-button:active {
  transform: scale(0.98);
}

@media (max-width: 768px) {
  .chat-input-container {
    padding: 15px;
    width: 90%;
  }

  .question-label {
    font-size: 16px;
  }

  .text-input {
    font-size: 14px;
  }

  .submit-button {
    font-size: 14px;
  }
}
</style>
