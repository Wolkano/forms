<template>
  <div class="chat-input-container">
    <!-- Input field for user answer -->

    <label class="label" :for="props.question.question">
      <span class="material-icons input_icon">{{
        props.question.inputIcon
      }}</span
      >{{ props.question.question }}</label
    >
    <input
      v-model="answer"
      :id="props.question.question"
      :type="props.question.inputType"
      :autocomplete="props.question.autocomplete"
      class="text-input"
      @input="$emit('answer', answer), (answer = '')"
    />
  </div>
</template>

<script setup>
import { defineProps, ref, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();

const answers = computed(() => store.state.staticFormResponses);

const props = defineProps(["question"]);

const initialValue = computed(
  () => answers?.value?.[props?.question?.question]
);

const answer = ref(initialValue.value ?? ""); // Stores the input value
</script>

<style scoped lang="scss">
.question-text {
  font-size: 12px;
  margin-bottom: 10px;
}

.question-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
.chat-input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  width: 85%;
  margin: 20px auto;

  .label {
    display: flex;
    font-size: 22px;
    align-self: flex-start;
  }

  .input_icon {
    color: #007bff;
    font-size: 26px;
    margin-right: 20px;
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
  border: 2px solid #ddd;
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
