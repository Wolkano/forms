<template>
  <div v-if="currentQuestion">
    <div class="ChatContainer">
      <div class="newSolution" v-if="!isCalculated">
        <button
          v-if="currentQuestion?.previous !== undefined"
          @click="goBack"
          class="backButton"
        >
          ⬅️
        </button>
        <div class="progress-container">
          <div
            class="progress-bar"
            :style="{ width: currentQuestion.progress + '%' }"
          ></div>
        </div>

        <p class="questionText">{{ currentQuestion.text }}</p>
        <component
          style="font-family: 'Open Sans', sans-serif"
          :is="getComponent(currentQuestion.type)"
          :question="currentQuestion"
          @answer="handleAnswer"
        />
      </div>

      <div v-else class="result">
        <u><h4>Värden</h4></u>
        <p
          v-for="(answer, key) in displayedAnswers"
          :key="key"
          class="answerText"
        >
          <b>{{ key }}:</b> {{ answer }}
        </p>
        <div class="customerInformation">
          <u><h4>Din information</h4></u>
          <p v-for="(answer, key) in answers['customerInformation']" :key="key">
            <b>{{ key }}:</b> {{ answer }}
          </p>
        </div>
        <div class="result__buttons">
          <button class="result__buttons__reset" @click="reset">
            Återställ formuläret
          </button>
          <button class="result__buttons__submit">Skicka in</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import ButtonsComponent from "../inputs/ButtonsComponent.vue";
import SliderComponent from "../inputs/SliderComponent.vue";
import CheckboxComponent from "../inputs/CheckboxComponent.vue";
import InputComponent from "../inputs/InputComponent.vue";

const store = useStore();
const calculatedCategory = computed(() => store.state.calculatedCategory);

const currentQuestionIndex = computed(() => store.state.currentQuestionIndex);
const currentQuestion = computed(() =>
  store.state.questions.find((q) => q.id === currentQuestionIndex.value)
);
const questions = computed(() => store.state.questions);
const isCalculated = computed(() => store.state.isCalculated);
const answers = computed(() => store.state.responses);

const displayedAnswers = computed(() => {
  if (answers.value[calculatedCategory.value]) {
    return answers.value[calculatedCategory.value];
  }

  const filteredAnswers = { ...answers.value };
  delete filteredAnswers.customerInformation;
  return filteredAnswers;
});

const getComponent = (type) => {
  return (
    {
      buttons: ButtonsComponent,
      slider: SliderComponent,
      checkbox: CheckboxComponent,
      input: InputComponent,
    }[type] || "div"
  );
};

const goBack = () => {
  store.commit("nextQuestion", currentQuestion.value.previous);
};

const reset = () => {
  store.commit("nextQuestion", 0);
  store.commit("setIsCalculated", false);
};

const handleAnswer = (answer) => {
  const isChoosingForm = questions.value.some((q) => q.id === answer);
  if (isChoosingForm) {
    store.commit("nextQuestion", answer);
  } else {
    store.commit("saveResponse", { id: currentQuestion.value.id, answer });
    if (currentQuestion.value.next) {
      store.commit("nextQuestion", currentQuestion.value.next);
    } else {
      store.commit("setIsCalculated", true);
    }
  }
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap");
.progress-container {
  width: 100%;
  height: 20px;
}
.progress-bar {
  background-color: #3f6395;
  height: 20px;
  border-radius: 20px;
  transition: width 0.5s ease-in-out;
}

.ChatContainer {
  margin-left: auto;
  margin-right: auto;
  top: 0;
  width: 60%;
  height: 500px;
  background: #eaebf1;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  flex-direction: column;

  /* Enable scrolling */
  overflow-y: auto;
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: #ccc transparent; /* Firefox */

  /* Moves scrollbar slightly inward */
  padding-right: 15px;
}

/* For Webkit browsers (Chrome, Edge, Safari) */
.ChatContainer::-webkit-scrollbar {
  width: 6px;
}

.ChatContainer::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 3px;
  margin-right: 5px; /* Moves it inward */
}

.ChatContainer::-webkit-scrollbar-track {
  background: transparent;
  margin-right: 5px; /* Moves track inward */
}
h1,
h2,
h3 {
  font-family: "Cormorant Garamond", serif;
  font-weight: 600;
}
p {
  font-family: "Open sans", sans-serif;
}
.newSolution {
  .questionText {
    font-size: 18px;
    margin-top: 75px;
    margin-bottom: 15px;
    color: #333;
  }

  .answerText {
    font-size: 16px;
    margin-bottom: 10px;
    color: #555;
  }

  .backButton {
    margin-top: 15px;
    padding: 10px 20px;
    padding-bottom: 50px;
    color: white;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    position: absolute;
    left: 10px; /* Moves it to the left */
    top: 10px; /* Adjusts vertical position */
    padding: 10px 20px;
    background-color: white;
    color: white;
    font-size: 25px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
}
.result {
  text-align: left;
  &__buttons {
    display: flex;
    flex-direction: row;
    gap: 10px;
    button {
      width: 100%;
      padding: 12px;
      font-size: 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.2s ease;
      text-align: center;
    }
    &__submit {
      background-color: green !important;
    }
    &__reset {
      background-color: red !important;
    }
  }
}
</style>
