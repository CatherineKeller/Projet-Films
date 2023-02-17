<template>
  <footer class="footer">
    <div class="md:container md:mx-auto flex flex-col py-8 px-4">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-x-14">
        <div>
          <img
            alt="Logo TMDB"
            class="logo"
            src="@/assets/logo-tmdb-big.svg"
            width="70"
            height="72"
          />
        </div>
        <div>
          <h4 class="text-white text-2xl">Divers liens</h4>
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            class="text-white text-sm"
          >
            Site TMDB
          </a>
        </div>
        <div>
          <h4 class="text-white text-2xl">Divers liens</h4>
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            class="text-white text-sm"
          >
            Site TMDB
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.footer {
  background-color: var(--main-color);
  & a:hover {
    @apply border-b border-white border-solid;
  }
  & .grid > div {
    @apply py-2 lg:py-0;
  }
}
</style>
