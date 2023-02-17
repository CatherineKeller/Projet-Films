<script setup>
import { RouterView } from "vue-router";
import TopHeader from "./components/TopHeader.vue";
import TopFooter from "./components/TopFooter.vue";
</script>

<template>
  <TopHeader />
  <RouterView />
  <TopFooter />
</template>

<style lang="scss">
// Main colors
:root {
  // --main-color: rgb(13, 37, 63);
  --main-color-h: 211;
  --main-color-s: 65.8%;
  --main-color-l: 14.9%;
  --main-color: hsl(
    var(--main-color-h),
    var(--main-color-s),
    var(--main-color-l)
  );
  --main-color-light: hsl(
    var(--main-color-h),
    var(--main-color-s),
    calc(var(--main-color-l) * 6)
  );
  // --second-color: rgb(1, 180, 228);
  --second-color-h: 193;
  --second-color-s: 99.1%;
  --second-color-l: 44.9%;
  --second-color: hsl(
    var(--second-color-h),
    var(--second-color-s),
    var(--second-color-l)
  );
  --second-color-darken: hsl(
    var(--second-color-h),
    var(--second-color-s),
    calc(var(--second-color-l) * 0.6)
  );
  --third-color: rgb(144, 206, 161);

  --light-gray: rgb(233, 233, 233);
}

body {
  color: #666666;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  color: var(--main-color);
}
</style>
