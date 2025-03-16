<template>
  <div v-if="currentQuestion">
    <div class="ChatContainer">
      <div class="newSolution" v-if="!isCalculated">
        <ProgressBar :progress="progress" />
        <NavButtons
          :can-go-backwards="canGoBackwards"
          :can-go-forward="canGoForward"
          @goBack="goBack()"
          @goForward="goForward()"
          v-if="!isEditing"
        />

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
      <FormResults
        v-else
        :displayed-answers="displayedAnswers"
        :answers="answers"
        @edit-value="editValue"
        @reset="reset()"
        @sendIn="sendIn()"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import ButtonsComponent from "../inputs/ButtonsComponent.vue";
import SliderComponent from "../inputs/SliderComponent.vue";
import CheckboxComponent from "../inputs/CheckboxComponent.vue";
import InputComponent from "../inputs/InputComponent.vue";
import RadioButtonComponent from "@/inputs/RadioButtonComponent.vue";
import ProgressBar from "@/components/ProgressBar.vue";
import NavButtons from "@/components/NavButtons.vue";
import FormResults from "@/components/FormResults.vue";

const store = useStore();
const calculatedCategory = computed(() => store.state.calculatedCategory);

const currentQuestionIndex = computed(() => store.state.currentQuestionIndex);
const questions = computed(() => store.state.questions);
const currentQuestion = computed(() =>
  store.state.questions.find((q) => q.id === currentQuestionIndex.value)
);
const isCalculated = computed(() => store.state.isCalculated);
const answers = computed(() => store.state.responses);
const isEditing = ref(false);
const canGoForward = computed(
  () => !!store.state.responses[currentQuestion.value.id]
);
const canGoBackwards = computed(
  () => currentQuestion?.value.previous !== undefined
);

const progress = computed(
  () => (currentQuestion.value.id / questions.value.length) * 100
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

const editValue = (answer) => {
  const questionToEdit = questions.value.find(
    (q) => q.question === answer?.question || q.question === answer
  );
  store.commit("nextQuestion", questionToEdit.id);
  store.commit("setIsCalculated", false);
  isEditing.value = true;
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
    if (currentQuestion.value.next && !isEditing.value) {
      store.commit("nextQuestion", currentQuestion.value.next);
    } else {
      isEditing.value = false;
      store.commit("setIsCalculated", true);
    }
  }
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap");

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
