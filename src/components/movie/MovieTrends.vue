<template>
  <section class="trends">
    <div class="md:container md:mx-auto flex flex-col py-8 px-4">
      <h2 class="text-2xl font-bold mb-4">Tendances de la semaine</h2>
      <Suspense>
        <template #default>
          <div
            class="trends-all grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-4"
          >
            <div
              v-for="movie in moviesTrends"
              :key="movie.id"
              class="trends-movie"
            >
              <a v-bind:href="'/films/' + movie.id">
                <img
                  v-if="movie.poster_path"
                  :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
                />
                <p class="trends-title">
                  {{ movie.title }}
                </p>
              </a>
            </div>
          </div>
        </template>
        <template #fallback>
          <div>Chargement...</div>
        </template>
      </Suspense>
    </div>
  </section>
</template>

<script>
import { Suspense } from "vue";
import { fetchAllTrendsWeekMovies } from "../../service/database";

export default {
  components: {
    Suspense,
  },

  data() {
    return {
      moviesTrends: [],
    };
  },

  created() {
    this.displayMoviesTrends();
  },

  methods: {
    async displayMoviesTrends() {
      this.moviesTrends = await fetchAllTrendsWeekMovies();
      if (!this.moviesTrends) {
        throw new Error("Erreur de chargement des données");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.trends {
  background-color: lighten(rgb(1, 180, 228), 40%);
  &-movie {
    transition: all 0.3s;
    &:hover {
      transform: scale(1.05);
      color: darken(rgb(1, 180, 228), 10%);
      .trends-title {
        @apply font-bold;
      }
    }
    & img {
      border-radius: 0.5rem;
    }
  }
  &-title {
    font-size: 0.9rem;
    margin-top: 0.5rem;
    text-align: center;
    line-height: 1.1;
  }
}
</style>
