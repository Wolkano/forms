<template>
  <div class="chatbot-container">
    <div class="chatbot-form">
      <div
        class="question-card"
        v-for="question in filteredQuestions"
        :key="question.id"
      >
        <component
          :is="getComponent(question?.type)"
          :question="question"
          class="dynamic-input-container"
          @answer="handleAnswer($event, question)"
          :answers="answers"
        />
      </div>
      <h2 class="customerInformationTitle">Din information</h2>
      <div class="customerInformation">
        <component
          v-for="question in customerInformationQuestions"
          :key="question"
          :is="getComponent(question?.type)"
          :question="question"
          class="dynamic-input-container"
          @answer="handleAnswer($event, question)"
          :answers="answers"
        />
      </div>
    </div>
    <button class="submit-button" @click="submit">Skicka in</button>
  </div>
</template>

<script setup>
import { computed, onMounted, nextTick } from "vue";
import { useStore } from "vuex";
import ButtonsComponent from "@/inputs/form/ButtonsComponent.vue";
import SliderComponent from "@/inputs/form/SliderComponent.vue";
import CheckboxComponent from "@/inputs/form/CheckboxComponent.vue";
import InputComponent from "@/inputs/form/InputComponent.vue";
import RadioButtonComponent from "@/inputs/form/RadioButtonComponent.vue";
import ImageSelector from "@/inputs/form/ImageSelector.vue";

const store = useStore();

const sendHeight = () => {
  const height = document.documentElement.scrollHeight;
  console.log("posting heigth", height);
  window.parent.postMessage(
    { type: "iframeHeight", height },
    "https://sofletestad.netlify.app/companyform"
  );
};

onMounted(() => {
  sendHeight(); // Send height when component loads

  // Observe changes in form size
  const observer = new ResizeObserver(() => {
    nextTick(() => sendHeight()); // Ensure height update after DOM changes
  });

  observer.observe(document.body);
});

const questions = computed(() => store.state.questions);
const answers = computed(() => store.state.staticFormResponses);

const filteredQuestions = computed(() =>
  questions.value.filter((question) => !question.isCustomerInformation)
);

const customerInformationQuestions = computed(() =>
  questions.value.filter((question) => question.isCustomerInformation)
);

const getComponent = (type) => {
  return (
    {
      buttons: ButtonsComponent,
      slider: SliderComponent,
      checkbox: CheckboxComponent,
      radioButton: RadioButtonComponent,
      input: InputComponent,
      imageSelector: ImageSelector,
    }[type] || "div"
  );
};

const handleAnswer = (answer, question) => {
  // Skicka med id
  store.commit("saveStaticFormResponses", { answer, question });
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.chatbot-container {
  max-width: 60%;
  margin: auto;
  padding: 20px;
  background: $primary;
  border-radius: 12px;
  font-family: "Arial", sans-serif;
}

.chatbot-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.question-card {
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.customerInformationTitle {
  color: white;
}

.customerInformation {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .dynamic-input-container {
    width: 35%;
  }
}

.dynamic-input-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.submit-button {
  background: $orange;
  color: white;
  font-size: 16px;
  padding: 10px;
  width: 50%;
  margin-top: 30px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: $darkOrange;
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
