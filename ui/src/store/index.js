import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    questions: [],
    responses: JSON.parse(localStorage.getItem("responses")) || {},
    currentQuestionIndex:
      JSON.parse(localStorage.getItem("currentQuestionIndex")) || 0,
    isCalculated: false,
    calculatedCategory: localStorage.getItem("calculatedCategory") || null,
    submitError: false,
    company: null,
    staticFormResponses: {},
  },
  getters: {},
  mutations: {
    setQuestions(state, questions) {
      state.questions = questions;
    },
    setIsCalculated(state, payload) {
      state.isCalculated = payload;
    },
    saveResponse(state, { answer }) {
      const currentQuestion = state.questions.find(
        (q) => q.id === state.currentQuestionIndex
      );

      if (currentQuestion?.isCustomerInformation) {
        if (!state.responses.customerInformation) {
          state.responses.customerInformation = {};
        }
        state.responses.customerInformation[currentQuestion.text] = answer;
      } else {
        if (currentQuestion.category) {
          if (!state.responses[currentQuestion.category]) {
            state.responses[currentQuestion.category] = {};
          }
          const nextQuestion = state.questions.find(
            (q) => q.id === state.currentQuestionIndex + 1
          );
          if (!nextQuestion) {
            localStorage.setItem(
              "calculatedCategory",
              currentQuestion.category
            );
            state.calculatedCategory = currentQuestion.category;
          }

          state.responses[currentQuestion.category][currentQuestion.id] = {
            question: currentQuestion.question,
            answer,
          };
        } else {
          state.responses[currentQuestion.id] = {
            question: currentQuestion.question,
            answer,
          };
        }
      }

      localStorage.setItem("responses", JSON.stringify(state.responses));
    },

    nextQuestion(state, answer) {
      localStorage.setItem("currentQuestionIndex", answer);
      state.currentQuestionIndex = answer;
    },
    setSubmitError(state, error) {
      state.submitError = error;
    },
    setCompany(state, company) {
      state.company = company;
    },

    saveStaticFormResponses(state, { answer, question }) {
      console.log(answer);
      console.log(question);
      if (!state.staticFormResponses[question.question]) {
        state.staticFormResponses[question.question] = null;
      }
      state.staticFormResponses[question.question] = answer;
    },
  },
  actions: {
    async loadQuestions({ commit }, company) {
      try {
        const questionsModule = await import(
          `@/store/questions-${company}.json`
        );
        commit("setQuestions", questionsModule.questions);
        commit("setCompany", company);
      } catch (error) {
        console.error("Error loading questions:", error);
      }
    },
    async postForm({ commit }) {
      const formData = this.state.responses;
      const company = this.state.company;
      try {
        await axios.post("http://localhost:3000/api/send-to-zapier", {
          formData,
          company,
        });
      } catch (error) {
        commit("setSubmitError", true);
      }
    },
  },
});
