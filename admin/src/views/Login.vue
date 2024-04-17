<template>
  <h1>Login</h1>
  <form @submit.prevent="login">
    <div>
      <input class="form-control" type="text" v-model="staff.name" placeholder="Enter name"/>
      <input class="form-control" type="password" v-model="staff.password" placeholder="Enter passwrod"/>
      <button class="btn btn-primary" v-on:click="login">Login</button>
      <p>
        <router-link to="/register">
          Sign up
        </router-link>
      </p>
    </div>
  </form>

</template>
<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      result: {},
      staff: {
        name: '',
        password: '',
      },
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("http://localhost:3000/api/staffs/auth/stafflogin", this.staff);
        const { data } = response; 
        if (data.token) {
          alert("Login success");

          localStorage.setItem('token', data.token);
          this.$router.push({ name: 'Book' }); 
        } else {
          alert(data.message || "Login failed"); 
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred. Please try again.");
      }
    },
  },
};

</script>