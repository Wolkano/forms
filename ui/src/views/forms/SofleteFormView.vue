<template>
  <div class="chatbot-container">
    <div v-if="!isCalculated" class="chatbot-form">
      <div class="question-card">
        <p class="question-title">{{ currentQuestion?.question }}</p>
        <p class="question-text">{{ currentQuestion?.text }}</p>
        <component
          :is="getComponent(currentQuestion?.type)"
          :question="currentQuestion"
          class="input-container"
          @answer="handleAnswer($event, currentQuestion)"
        />
      </div>
    </div>
    <div v-else class="result-container">
      <h2>Here is the result:</h2>
      <pre>{{ answers }}</pre>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import ButtonsComponent from "../../inputs/ButtonsComponent.vue";
import SliderComponent from "../../inputs/form/SliderComponent.vue";
import CheckboxComponent from "../../inputs/form/CheckboxComponent.vue";

const store = useStore();
const isCalculated = computed(() => store.state.isCalculated);
const answers = computed(() => store.state.responses);
const currentQuestionIndex = computed(() => store.state.currentQuestionIndex);
const currentQuestion = computed(
  () => store.state.questions[currentQuestionIndex.value]
);

const getComponent = (type) => {
  return (
    {
      buttons: ButtonsComponent,
      slider: SliderComponent,
      checkbox: CheckboxComponent,
    }[type] || "div"
  );
};

const handleAnswer = (answer) => {
  store.commit("saveResponse", { id: currentQuestion.value.id, answer });
  if (currentQuestion.value.next) {
    store.commit("nextQuestion");
  } else {
    store.commit("setIsCalculated", true);
  }
};
</script>

<style lang="scss" scoped>
.chatbot-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
}

.chatbot-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.question-card {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.question-text {
  font-size: 12px;
  margin-bottom: 10px;
}

.question-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.input-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.submit-button {
  background: #007bff;
  color: white;
  font-size: 16px;
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #0056b3;
  }
}

.result-container {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  padding: 20px;
  background: #e3ffe3;
  border-radius: 8px;
  margin-top: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
