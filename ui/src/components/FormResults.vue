<template>
  <div class="result">
    <div v-if="!isSent">
      <h3>Dina val</h3>
      <div class="answerText">
        <div
          class="answerText__card"
          v-for="(answer, key) in props.displayedAnswers"
          :key="key"
        >
          <p class="answerText__card--question">
            {{ answer.question }}
          </p>

          <template v-if="Array.isArray(answer.answer)">
            <p
              v-for="(ans, index) in answer.answer"
              :key="index"
              class="answerText__card--answer"
              @click="$emit('editValue', answer)"
            >
              {{ ans }} <span class="material-icons edit-icon">edit</span>
            </p>
          </template>
          <p
            v-else
            class="answerText__card--answer"
            @click="$emit('editValue', answer)"
          >
            {{ answer.answer }}
            <span class="material-icons edit-icon">edit</span>
          </p>
        </div>
      </div>
      <h3>Din information</h3>
      <div class="answerText">
        <div
          class="answerText__card"
          v-for="(answer, key) in props.answers['customerInformation']"
          :key="key"
          @click="$emit('editValue', key)"
        >
          <p class="answerText__card--question">
            {{ key }}
          </p>
          <p class="answerText__card--answer">
            {{ answer }}
            <span class="material-icons edit-icon">edit</span>
          </p>
        </div>
      </div>
      <p>Klicka på korten för att ändra ditt val</p>
      <div class="result__buttons">
        <button class="result__buttons__reset" @click="$emit('reset')">
          Starta om
        </button>
        <button class="result__buttons__submit" @click="sendIn()">
          Skicka in
        </button>
      </div>
    </div>
    <div v-if="isSent && !submitError" class="finalResult">
      <div v-motion-slide-visible-once-left :duration="1500" :delay="100">
        <span class="material-icons icon">task_alt</span>
        <h3>Här kommer ert uträknade pris synas när vi är klara med koden</h3>
      </div>
    </div>
    <div v-if="isSent && submitError" class="finalResult">
      <div v-motion-slide-visible-once-left :duration="1500" :delay="100">
        <span class="material-icons icon">error</span>
        <h3>Något gick fel</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const isSent = ref(false);
const submitError = computed(() => store.state.submitError);

const sendIn = () => {
  store.dispatch("postForm");
  isSent.value = true;
};

const props = defineProps({
  displayedAnswers: Object,
  answers: Object,
  isSent: Boolean,
  editValue: Function,
  reset: Function,
  sendIn: Function,
});
</script>

<style lang="scss" scoped>
.result {
  text-align: left;
  color: #007bff;
  height: 100%;
  .answerText {
    font-size: 16px;
    margin-bottom: 10px;
    color: #555;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;

    &__card {
      width: 45%;
      display: flex;
      flex-direction: column;

      &--question {
        font-weight: 700;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 0px;
      }
      &--answer {
        font-weight: 500;
        background-color: white;
        padding: 10px 10px;
        border-radius: 10px;
        transition: background-color 0.3s;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border: solid 2px gray;
        &:hover {
          background-color: #007bff;
          color: white;
          cursor: pointer;
        }
        .edit-icon {
          color: white;
          padding: 3px;
          border-radius: 100px;
          transition: background-color 0.5s;
          &:hover {
            background-color: #93c7ff;
            border-radius: 100px;
            color: white;
          }
        }
      }
    }
  }
  &__buttons {
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-top: 50px;
    padding-bottom: 20px !important;
    justify-content: space-evenly;
    button {
      width: 40%;
      padding: 12px;
      font-size: 16px;
      font-weight: 600;
      background-color: #007bff;
      color: white;
      border: solid 1px #007bff;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.2s ease;
      text-align: center;
    }
    &__submit {
      &:hover {
        background-color: #0056b3;
      }
    }
    &__reset {
      background-color: white !important;
      color: #007bff !important;
      &:hover {
        background-color: #0056b3 !important;
        color: white !important;
      }
    }
  }
  .finalResult {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100% !important;
    .icon {
      font-size: 80px;
    }
  }
}
</style>
