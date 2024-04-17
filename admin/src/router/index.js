import { createWebHistory, createRouter } from "vue-router";
import Book from "@/views/Home.vue";
import Bookedit from "@/views/BookEdit.vue";
import BookAdd from "@/views/BookAdd.vue";
import Nxb from "@/views/Nxb.vue";
import NxbAdd from "@/views/NxbAdd.vue";
import NxbEdit from "@/views/NxbEdit.vue";
import Staff from "@/views/Staff.vue";
import StaffAdd from "@/views/StaffAdd.vue";
import StaffEdit from "@/views/StaffEdit.vue";
import Borrow from "@/views/Borrow.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/",
    name: "Book",
    component: Book,
  },
  {
    path: "/books/:id",
    name: "Book.edit",
    component: Bookedit,
    props: true,
  },
  {
    path: "/books",
    name: "Book.add",
    component: BookAdd,
    props: true,
  },
  {
    path: "/nxb",
    name: "Nxb",
    component: Nxb,
  },
  {
    path: "/nxb/:id",
    name: "Nxb.edit",
    component: NxbEdit,
    props: true,
  },
  {
    path: "/nxb",
    name: "Nxb.add",
    component: NxbAdd,
    props: true,
  },

  {
    path: "/staff",
    name: "Staff",
    component: Staff,
  },
  {
    path: "/staff/:id",
    name: "Staff.edit",
    component: StaffEdit,
    props: true,
  },
  {
    path: "/staff",
    name: "Staff.add",
    component: StaffAdd,
    props: true,
  },
  {
    path: "/borrow",
    name: "Borrow",
    component: Borrow,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
