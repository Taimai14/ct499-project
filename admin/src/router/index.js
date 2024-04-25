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
import User from "@/views/User.vue";
import UserAdd from "@/views/UserAdd.vue";
import UserEdit from "@/views/UserEdit.vue";
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
    beforeEnter: authlogin,
  },
  {
    path: "/books/:id",
    name: "Book.edit",
    component: Bookedit,
    props: true,
    beforeEnter: authlogin,
  },
  {
    path: "/books",
    name: "Book.add",
    component: BookAdd,
    props: true,
    beforeEnter: authlogin,
  },
  {
    path: "/nxb",
    name: "Nxb",
    component: Nxb,
    beforeEnter: authlogin,
  },
  {
    path: "/nxb/:id",
    name: "Nxb.edit",
    component: NxbEdit,
    props: true,
    beforeEnter: authlogin,
  },
  {
    path: "/nxb",
    name: "Nxb.add",
    component: NxbAdd,
    props: true,
    beforeEnter: authlogin,
  },

  {
    path: "/staff",
    name: "Staff",
    component: Staff,
    beforeEnter: authlogin,
  },
  {
    path: "/staff/:id",
    name: "Staff.edit",
    component: StaffEdit,
    props: true,
    beforeEnter: authlogin,
  },
  {
    path: "/staff",
    name: "Staff.add",
    component: StaffAdd,
    props: true,
    beforeEnter: authlogin,
  },
  {
    path: "/borrow",
    name: "Borrow",
    component: Borrow,
    beforeEnter: authlogin,
  },
  {
    path: "/user",
    name: "User",
    component: User,
    beforeEnter: authlogin,
  },
  {
    path: "/user",
    name: "User.add",
    component: UserAdd,
    beforeEnter: authlogin,
  },
  {
    path: "/user/:id",
    name: "User.edit",
    props: true,
    component: UserEdit,
    beforeEnter: authlogin,
  },
];

async function authlogin(to, from, next) {
  const token = localStorage.getItem("token");
  if (token) {
    next();
  } else {
    next({ path: "/login" });
  }
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
