import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/Projet-Films/', /* for github pages */
  // base: import.meta.env.NODE_ENV === 'production'
  //   ? 'https://projet-films-development.up.railway.app/'
  //   : '/',
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
