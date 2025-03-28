<template>
  <div class="chat-input-container">
    <!-- Range Slider Input -->
    <p class="question-title">{{ question?.question }}</p>
    <p class="question-text">{{ question?.text }}</p>
    <vue-slider
      v-model="selectedValue"
      :min="question?.min"
      :max="question?.max"
      class="slider-input"
      :step="question.step"
      width="100%"
      dotSize="20"
      @change="confirmSelection"
    />

    <!-- Display the selected value -->
    <p class="selected-value">{{ selectedValue }} {{ enhet }}</p>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from "vue";
import VueSlider from "vue-slider-component";
import "../../assets/slider.css";

const props = defineProps(["question", "answers"]);
const emit = defineEmits(["answer"]);

const selectedValue = ref(
  props.answers[props.question.id]?.answer ??
    (props.question.min + props.question.max) / 2
);
const enhet = computed(() => props.question.enhet);

const confirmSelection = () => {
  emit("answer", selectedValue.value);
  selectedValue.value = 0;
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables.scss";

.question-text {
  font-size: 18px;
  margin-bottom: 10px;
  text-align: center;
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
.chat-input-container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  width: 85%;
  margin: 20px auto;
}

.slider-input:focus {
  outline: none;
}

.selected-value {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
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
