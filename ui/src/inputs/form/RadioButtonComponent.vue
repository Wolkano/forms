<template>
  <p class="question-title">{{ question?.question }}</p>
  <p class="question-text">{{ question?.text }}</p>
  <div class="form-radio-group">
    <div v-for="option in question.options" :key="option" class="radio-option">
      <input
        type="radio"
        :id="option.id"
        :value="option.value"
        v-model="selectedOption"
        class="radio-input"
        @change="emit('answer', selectedOption)"
      />
      <label :for="option.id" class="radio-label">{{ option.value }}</label>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps(["question", "answers"]);
const emit = defineEmits(["answer"]);

const selectedOption = ref(props.answers[props.question.question] ?? undefined);
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables.scss";

.question-text {
  font-size: 18px;
  margin-bottom: 10px;
}

.question-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  width: 90%;
  padding-bottom: 5px;
  border-bottom: solid 2px;
  margin-left: auto;
  margin-right: auto;
}
.form-radio-group {
  display: flex;
  flex-direction: row !important;
  gap: 15px;
  align-items: center;
  justify-content: space-around;
  width: 90%;
  margin: 20px auto;
  padding: 15px;
  border-radius: 10px;
  flex-wrap: wrap;
  .radio-option {
    position: relative;

    .radio-input {
      display: none; /* Hide default radio button */
    }
    .radio-label {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.2s ease;
    }
  }
}

.radio-input:hover + .radio-label {
  transform: scale(1.2);
}

.radio-input:checked + .radio-label {
  transform: scale(1.4);
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
}
</style>
