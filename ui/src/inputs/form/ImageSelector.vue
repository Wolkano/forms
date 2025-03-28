<template>
  <div v-if="question.type === 'imageSelector'" class="image-selector">
    <p class="question-title">{{ question?.question }}</p>
    <p class="question-text">{{ question?.text }}</p>
    <div class="image-options">
      <div
        v-for="option in question.options"
        :key="option"
        :class="
          selectedImage === option ? 'image-option selected' : 'image-option'
        "
        @click="selectImage(option)"
      >
        <img
          :src="getImagePath(option)"
          :alt="option"
          class="image-thumbnail"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["question", "answers"],
  data() {
    return {
      selectedImage: this.answers[this.question.question] || null,
    };
  },
  methods: {
    getImagePath(imageName) {
      return `/assets/${imageName}`;
    },
    selectImage(option) {
      this.selectedImage = option;
      this.$emit("answer", option);
    },
  },
};
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
.image-options {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: center;
  .image-option {
    border: 3px solid transparent;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;
    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 8px;
    }
    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>
