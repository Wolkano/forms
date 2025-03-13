import { createStore } from "vuex";

export default createStore({
  state: {
    questions: [],
    responses: JSON.parse(localStorage.getItem("responses")) || {},
    currentQuestionIndex:
      JSON.parse(localStorage.getItem("currentQuestionIndex")) || 0,
    isCalculated: false,
    calculatedCategory: localStorage.getItem("calculatedCategory") || null,
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

      // If it's customer information, save it as before
      if (currentQuestion?.isCustomerInformation) {
        if (!state.responses.customerInformation) {
          state.responses.customerInformation = {};
        }
        state.responses.customerInformation[currentQuestion.text] = answer;
      } else {
        // Save the answer inside the category of the current question (if it's not customer information)
        if (currentQuestion.category) {
          // Ensure the category object exists
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

          // Save the answer inside the category
          state.responses[currentQuestion.category][currentQuestion.question] =
            answer;
        } else {
          // If no category exists, save the answer directly with the question name
          state.responses[currentQuestion.question] = answer;
        }
      }

      localStorage.setItem("responses", JSON.stringify(state.responses));
    },

    nextQuestion(state, answer) {
      localStorage.setItem("currentQuestionIndex", answer);
      state.currentQuestionIndex = answer;
    },
  },
  actions: {
    async loadQuestions({ commit }, company) {
      try {
        const questionsModule = await import(
          `@/store/questions-${company}.json`
        );
        commit("setQuestions", questionsModule.questions);
      } catch (error) {
        console.error("Error loading questions:", error);
      }
    },
  },
});
