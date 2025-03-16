<template>
  <div class="navButtons">
    <button
      v-if="props.canGoBackwards"
      @click="$emit('goBack')"
      class="backButton"
    >
      <span class="material-icons arrow_back">arrow_forward_ios</span>
    </button>
    <button
      v-if="props.canGoForward"
      @click="$emit('goForward')"
      class="forwardButton"
    >
      <span class="material-icons arrow_back">arrow_forward_ios</span>
    </button>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps(["canGoForward", "canGoBackwards"]);
</script>

<style lang="scss" scoped>
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
</style>
