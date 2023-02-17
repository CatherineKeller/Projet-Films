<template>
  <main>
    <header class="header">
      <div class="container mx-auto flex flex-col py-8 px-4 w-full">
        <h1>Bienvenue !</h1>
      </div>
    </header>
    <MovieSearch />
    <MovieTrends />
  </main>
</template>

<script>
import MovieTrends from "./movie/MovieTrends.vue";
import MovieSearch from "./movie/MovieSearch.vue";

export default {
  components: {
    MovieTrends,
    MovieSearch,
  },
};
</script>

<style lang="scss" scoped>
.header {
  background-color: var(--main-color);
  @apply text-white;
  & h1 {
    @apply text-white text-5xl font-bold text-center;
  }
}
</style>
