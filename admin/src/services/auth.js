import createApiClient from "./api";
import { defineStore } from "pinia";

export const userStore = defineStore("userStore", {
  state: () => {
    return {
      token: "",
      userInfor: {},
    };
  },
  actions: {
    RegisterStaff: async function (data) {
      return await createApiClient
        .post("auth/staffregister", data)
        .then((res) => {
          return res.data.message;
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    },
    LoginStaff: async function (data) {
      return await createApiClient
        .post("auth/stafflogin", data)
        .then((res) => {
          this.token = res.data.data?.token;
          this.userInfor = res.data.data?.user;
          return res.data.message;
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    },
    Logout: function () {
      this.token = "";
      this.userInfor = {};
    },
  },
});
