<template>
  <router-view />
  <iframe
    src="http://localhost:8080/#/soflete"
    width="100%"
    height="5000vh"
    scrolling="no"
    style="border: none"
  ></iframe>
</template>

<script setup>
import { watchEffect } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();

watchEffect(() => {
  const company = route.path.replace("/", "");

  if (company) {
    store.dispatch("loadQuestions", company);
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
