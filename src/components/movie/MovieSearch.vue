<template>
  <section class="search">
    <div class="md:container md:mx-auto flex flex-col py-8 px-4">
      <form class="search-form">
        <input
          type="text"
          v-model="search"
          :placeholder="searchPlaceholder"
          autocomplete="off"
          autocorrect="off"
          autofill="off"
          autofocus
        />
        <button type="submit" @click.prevent="searchMovies">
          <span>Rechercher</span>
        </button>
      </form>

      <h2>Films recherchés</h2>
      <div v-if="isLoading && search.length > 3">
        <p class="font-bold">Chargement...</p>
      </div>
      <div v-else>
        <div v-if="searchedMovies.length === 0 && searchActive">
          <p class="font-bold">Aucun résultat</p>
        </div>
        <div v-else>
          <div
            class="search-all grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-4"
          >
            <template v-for="movie in searchedMovies" :key="movie.id">
              <div
                class="search-movie"
                v-show="movie.title && movie.poster_path"
              >
                <router-link :to="'/films/' + movie.id">
                  <img
                    v-if="movie.poster_path"
                    :src="
                      'https://image.tmdb.org/t/p/w500/' + movie.poster_path
                    "
                  />
                  <p class="search-title">
                    {{ movie.title }}
                  </p>
                </router-link>
                <!-- <a v-bind:href="'/films/' + movie.id">
                  <img
                    v-if="movie.poster_path"
                    :src="
                      'https://image.tmdb.org/t/p/w500/' + movie.poster_path
                    "
                  />
                  <p class="search-title">
                    {{ movie.title }}
                  </p>
                </a> -->
              </div>
            </template>
          </div>
          <div v-if="searchedMovies.length > 0" class="pagination">
            <Pagination
              :pagination="pagination"
              @update-pagination="updatePagination"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { searchMovies } from "../../service/database";
import Pagination from "./MoviePagination.vue";

export default {
  components: {
    Pagination,
  },

  data() {
    return {
      searchedMovies: [],
      searchPlaceholder: "Rechercher un film",
      pagination: {
        currentPage: 1,
        totalPages: 1,
      },
      error: null,
      search: "",
      isLoading: false,
      searchActive: false,
    };
  },

  methods: {
    async searchMovies() {
      this.searchActive = true;
      this.isLoading = true;
      if (this.search === "") {
        this.searchedMovies = [];
        this.isLoading = false;
        this.searchActive = false;
        return;
      }
      if (this.search.length < 3) return;
      const data = await searchMovies(this.search, this.pagination.currentPage);
      this.searchedMovies = data.results;
      this.pagination.totalPages = data.total_pages;
      if (!this.searchedMovies) {
        throw new Error("Erreur de chargement des données");
      }
      // console.log("this.searchedMovies", this.searchedMovies);
      this.isLoading = false;
    },
    updatePagination(page) {
      // console.log("page", page);
      this.pagination.currentPage = page.currentPage;
      this.searchMovies();
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  background-color: var(--main-color);
  &-form {
    @apply flex;

    & input {
      border-radius: 0.5rem 0 0 0.5rem;
      @apply flex-1 p-3;

      &:focus {
        background-color: var(--main-color-light);
        outline: none;
      }
    }
    & button {
      height: 60px;
      width: 150px;
      background: linear-gradient(
        to right,
        var(--third-color) 7%,
        var(--second-color) 100%
      );
      border-radius: 0 0.5rem 0.5rem 0;
      color: var(--second-color-darken);
      @apply px-6 py-3;

      & span {
        transition: all 0.5s;
        @apply font-bold;
      }
      &:hover {
        background: var(--third-color);

        & span {
          @apply text-lg;
        }
      }
    }
  }
  &-all {
    @apply text-white;
  }
  &-movie {
    transition: all 0.3s;
    &:hover {
      transform: scale(1.05);
      color: var(--third-color);
      .search-title {
        @apply font-bold;
      }
      & img {
        border: 1px solid var(--third-color);
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
