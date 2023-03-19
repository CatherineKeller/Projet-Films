<template>
  <main class="main-wrapper" :style="[isLoading ? {} : movieImage]">
    <div class="md:container md:mx-auto flex flex-col py-8 px-4">
      <div v-if="isLoading">
        <p class="font-bold">Chargement...</p>
      </div>
      <article
        v-else
        class="movie_details grid grid-cols-1 lg:grid-cols-3 gap-x-14"
      >
        <div class="movie_details-img">
          <img
            v-bind:src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
          />
        </div>
        <div class="movie_details-text">
          <header class="movie_details-header">
            <h1 class="text-4xl font-bold">
              {{ movie.title }}
              <span>({{ movie.release_date.slice(0, 4) }})</span>
            </h1>
            <p class="movie_details-header-tagline">
              {{ movie.tagline }}
            </p>
          </header>
          <section class="movie_details-description">
            <div>
              <p><strong>Genres</strong> : {{ listGenres.join(", ") }}</p>
              <h2 class="text-2xl font-bold">Synopsis</h2>
              <p>{{ movie.overview }}</p>
            </div>
          </section>
          <MovieCasting />
          <div class="mt-8">
            <RouterLink to="/" class="return inline-block">
              <button class="flex">
                <ChevronLeftIcon class="h-6 w-6" /> Retour
              </button>
            </RouterLink>
          </div>
        </div>
      </article>
    </div>
  </main>
</template>

<script>
import { fetchMovie } from "../service/database";
import { RouterLink } from "vue-router";
import MovieCasting from "./movie/MovieCasting.vue";
import { ChevronLeftIcon } from "@heroicons/vue/24/solid";

export default {
  props: {
    id: { type: Number, required: true}
  },

  components: {
    RouterLink,
    MovieCasting,
    ChevronLeftIcon,
  },

  data() {
    return {
      movie: [],
      isLoading: true,
    };
  },

  created() {
    this.displayMovie();
  },

  computed: {
    // id() {
    //   return parseInt(this.$route.params.id);
    // },
    listGenres() {
      return this.movie.genres.map((genre) => genre.name);
    },
    movieImage() {
      return {
        background: `linear-gradient(0deg, rgba(43, 43, 43, 0.6), rgba(43, 43, 43, 0.6)),
          linear-gradient(45deg, rgba(0, 0, 0, 0.8), rgba(255,255,255, 0.1), rgba(0, 0, 0, 0.7)),
          url(https://image.tmdb.org/t/p/w500/${this.movie.backdrop_path}) no-repeat center`,
        backgroundSize: "cover",
      };
    },
  },

  methods: {
    async displayMovie() {
      this.movie = await fetchMovie(this.id);
      if (!this.movie) {
        throw new Error("Erreur de chargement des données");
      }
      this.isLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.movie_details {
  &-img {
    @apply flex justify-center mb-8 lg:mb-0 items-start;
  }
  & img {
    min-width: 200px;
    max-height: 400px;
    @apply lg:max-h-min lg:w-auto;
  }
  &-header {
    @apply mb-8;
  }
  &-header-tagline {
    font-style: italic;
    @apply text-2xl;
  }
  &-text {
    text-shadow: 0 0 5px black;
    @apply col-span-2;
  }
}
.return {
  background-color: var(--second-color);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  &:hover {
    background-color: var(--second-color-darken);
  }
}
.main-wrapper {
  color: white;
  & a,
  & h1,
  & h2,
  & h3,
  & h4,
  & h5,
  & h6 {
    color: white;
  }
}
</style>
