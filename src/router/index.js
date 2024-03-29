import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/tendances",
      name: "tendances",
      component: () => import("@/views/TrendsView.vue"),
    },
    {
      path: "/films/:id(\\d+)",
      name: "filmdetails",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/FilmDetailsView.vue"),
      props: route=> ({id: parseInt(route.params.id, 10)}),
    },
    { 
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import("@/views/NotFoundView.vue"),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
