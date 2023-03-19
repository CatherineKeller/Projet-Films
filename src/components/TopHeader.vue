<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <header class="header">
    <div class="md:container md:mx-auto flex justify-between py-8 px-8">
      <RouterLink to="/">
        <img
          alt="Logo TMDB"
          class="logo"
          src="@/assets/logo-tmdb.svg"
          width="200"
          height="26"
        />
      </RouterLink>
      <nav class="flex">
        <RouterLink to="/">Accueil</RouterLink>
        <RouterLink to="/tendances">Tendances</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  background-color: #666666;
  color: white;
  & nav {
    gap: 1rem;
  }
}
</style>
