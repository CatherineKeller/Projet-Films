<template>
  <div class="flex items-center text-white mt-4 justify-center">
    <button
      @click="prevPage"
      class="flex pagination-btn pagination-prev"
      :class="{ 'pagination-active': !firstPage }"
    >
      <ChevronLeftIcon class="h-6 w-6" /> Précédent
    </button>
    <span class="p-4">{{ pagination.currentPage }}</span>
    <!-- / {{ pagination.totalPages }} -->
    <button
      @click="nextPage"
      class="flex pagination-btn pagination-next"
      :class="{ 'pagination-active': !lastPage }"
    >
      Suivant <ChevronRightIcon class="h-6 w-6" />
    </button>
  </div>
</template>

<script>
import { ChevronLeftIcon } from "@heroicons/vue/24/solid";
import { ChevronRightIcon } from "@heroicons/vue/24/solid";

export default {
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
  },
  props: {
    pagination: Object,
  },
  computed: {
    moviePagination() {
      return this.pagination;
    },
  },
  data() {
    return {
      firstPage: this.pagination.currentPage === 1,
      lastPage: this.pagination.currentPage === this.pagination.totalPages,
    };
  },

  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    prevPage() {
      if (this.moviePagination.currentPage === 1) return;
      this.scrollToTop();
      this.moviePagination.currentPage -= 1;
      // console.log(this.moviePagination);
      this.$emit("update-pagination", this.moviePagination);
    },
    nextPage() {
      if (this.moviePagination.currentPage === this.moviePagination.totalPages)
        return;
      this.scrollToTop();
      this.moviePagination.currentPage += 1;
      // console.log(this.moviePagination);
      this.$emit("update-pagination", this.moviePagination);
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  &-btn {
    border: 1px solid #ffffff;
    transition: all 0.5s;
    &:not(.pagination-active) {
      border: 0;
      pointer-events: none;
    }
    @apply p-2 rounded-lg text-white;
    &:hover {
      background-color: #ffffff;
      color: var(--main-color);
    }
  }
}
</style>
