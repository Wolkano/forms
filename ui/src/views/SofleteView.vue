<template>
  <div v-if="currentQuestion">
    <div class="ChatContainer">
      <div class="newSolution" v-if="!isCalculated">
        <div class="progress-container">
          <div
            class="progress-bar"
            :style="{
              width: (currentQuestion.id / questions.length) * 100 + '%',
            }"
          ></div>
        </div>
        <div class="navButtons">
          <button
            v-if="currentQuestion?.previous !== undefined"
            @click="goBack"
            class="backButton"
          >
            <span class="material-icons arrow_back">arrow_forward_ios</span>
          </button>
          <button
            v-if="canMoveForward"
            @click="goForward"
            class="forwardButton"
          >
            <span class="material-icons arrow_back">arrow_forward_ios</span>
          </button>
        </div>

        <div class="question">
          <p class="questionText" v-if="!currentQuestion.isCustomerInformation">
            {{ currentQuestion.text }}
          </p>
          <component
            style="font-family: 'Open Sans', sans-serif"
            :is="getComponent(currentQuestion.type)"
            :question="currentQuestion"
            :answers="answers"
            @answer="handleAnswer"
            :key="currentQuestion"
          />
        </div>
      </div>

      <div v-else class="result">
        <h3>Värden</h3>
        <div class="answerText">
          <div
            class="answerText__card"
            v-for="(answer, key) in displayedAnswers"
            :key="key"
          >
            <p class="answerText__card--question">{{ answer.question }}</p>
            <p class="answerText__card--answer">{{ answer.answer }}</p>
          </div>
        </div>
        <h3>Din information</h3>
        <div class="answerText">
          <div
            class="answerText__card"
            v-for="(answer, key) in answers['customerInformation']"
            :key="key"
          >
            <p class="answerText__card--question">{{ key }}</p>
            <p class="answerText__card--answer">{{ answer }}</p>
          </div>
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
import RadioButtonComponent from "@/inputs/RadioButtonComponent.vue";

const store = useStore();
const calculatedCategory = computed(() => store.state.calculatedCategory);

const currentQuestionIndex = computed(() => store.state.currentQuestionIndex);
const questions = computed(() => store.state.questions);
const currentQuestion = computed(() =>
  store.state.questions.find((q) => q.id === currentQuestionIndex.value)
);
const isCalculated = computed(() => store.state.isCalculated);
const answers = computed(() => store.state.responses);
const canMoveForward = computed(
  () => !!store.state.responses[currentQuestion.value.id]
);

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
      radioButton: RadioButtonComponent,
    }[type] || "div"
  );
};

const goBack = () => {
  store.commit("nextQuestion", currentQuestion.value.previous);
};

const goForward = () => {
  store.commit("nextQuestion", currentQuestion.value.next);
};

const reset = () => {
  store.commit("nextQuestion", 0);
  store.commit("setIsCalculated", false);
};

const handleAnswer = (answer) => {
  const isChoosingForm = currentQuestion.value.formChooser;
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
  background-color: #007bff;
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
  overflow-y: auto;
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: #ccc transparent; /* Firefox */

  padding-right: 15px;
  .newSolution {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-evenly;
    .question {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      height: 100%;
      .questionText {
        font-size: 18px;
        margin-top: 10px;
        margin-bottom: 15px;
        color: #333;
      }
    }

    .navButtons {
      display: flex;
      flex-direction: row;
      margin-bottom: auto;
      justify-content: space-between; /* Pushes items to opposite ends */
      margin-top: 20px;
      .backButton {
        border: none;
        background-color: transparent;
        .arrow_back {
          color: black;
          font-size: 30px;
          padding: 10px;
          transform: scale(-1, 1);
          &:hover {
            cursor: pointer;
            background-color: white;
            border-radius: 100px;
            color: #007bff;
          }
        }
      }
      .forwardButton {
        border: none;
        background-color: transparent;
        margin-left: auto;
        .arrow_back {
          color: black;
          font-size: 30px;
          padding: 10px;
          &:hover {
            cursor: pointer;
            color: #007bff;
            border-radius: 100px;
            background-color: white;
          }
        }
      }
    }
  }
  .result {
    text-align: left;
    color: #007bff;
    .answerText {
      font-size: 16px;
      margin-bottom: 10px;
      color: #555;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 10px;

      &__card {
        width: 30%;
        display: flex;
        flex-direction: column;
        background-color: white;
        padding: 0px 10px;
        border-radius: 10px;
        &--question {
          font-weight: 700;
        }
        &--answer {
          font-weight: 500;
        }
      }
    }
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
}

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
h2 {
  font-family: "Cormorant Garamond", serif;
  font-weight: 600;
}
p {
  font-family: "Open sans", sans-serif;
}
</style>
