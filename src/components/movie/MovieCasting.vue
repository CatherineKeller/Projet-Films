<template>
  <div v-if="isLoading">
    <p class="font-bold">Chargement...</p>
  </div>
  <section v-else class="mt-8">
    <h2 class="text-2xl font-bold">Distribution des rôles</h2>
    <template v-if="movieCasting.length > 0">
      <div class="comedians-wrapper flex gap-4 py-4">
        <div
          v-for="comedian in movieCasting"
          :key="comedian.id"
          class="comedian"
        >
          <img
            v-if="comedian.profile_path"
            :src="'https://image.tmdb.org/t/p/w500/' + comedian.profile_path"
          />
          <div class="comedian-name">{{ comedian.name }}</div>
          <div class="comedian-character">{{ comedian.character }}</div>
        </div>
      </div>
    </template>
    <template v-else>
      <p class="py-4">Aucune donnée</p>
    </template>
  </section>
</template>

<script>
import { fetchMovieCasting } from "../../service/database";

export default {
  data() {
    return {
      movieCasting: [],
      isLoading: true,
    };
  },

  created() {
    this.displayMovieCasting();
  },

  computed: {
    id() {
      return this.$route.params.id;
    },
  },

  methods: {
    async displayMovieCasting() {
      this.movieCasting = await fetchMovieCasting(this.id);
      if (!this.movieCasting) {
        throw new Error("Erreur de chargement des données");
      }
      this.isLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
h2 {
  color: white;
}
.comedians-wrapper {
  overflow-x: scroll;
}
.comedian {
  background-color: var(--light-gray);
  border-radius: 0.3rem;
  padding: 0.5rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  color: var(--main-color);
  text-shadow: none;
  min-width: 120px;
  &-name {
    color: var(--second-color-darken);
    @apply font-bold;
  }
  &-character {
    font-size: 0.8rem;
  }
}
</style>
