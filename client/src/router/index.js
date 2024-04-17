import { createWebHistory, createRouter } from "vue-router";
import Book from "@/views/Home.vue";
import Borrow from "@/views/Borrow.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Book,
  },
  {
    path: "/borrow/:id",
    name: "Borrow",
    component: Borrow,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
