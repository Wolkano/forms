<template>
  <router-view />
</template>

<script setup>
import { watchEffect, watch } from "vue";
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

const loadScss = async (routeName) => {
  const company = routeName.replace("/", "");
  try {
    await import(`@/assets/scss/${company}Styling.scss`);
  } catch (error) {
    console.error("Error loading SCSS file:", error);
  }
};

watch(
  () => route.path,
  (newRoute) => {
    loadScss(newRoute);
  },
  { immediate: true }
);
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
