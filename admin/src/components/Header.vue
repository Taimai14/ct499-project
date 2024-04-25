<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark d-flex">
        <a href="/" class="navbar-brand ">ADMIN</a>
        <ul class="mr-auto navbar-nav d-flex">
            <li class="nav-item">
                <router-link :to="{ name: 'Book' }" class="nav-link">
                    BOOK
                    <i class="fas fa-address-book"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'Nxb' }" class="nav-link">
                    Nxb
                    <i class="fa-solid fa-house-circle-check"></i>                
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'Staff' }" class="nav-link">
                    Staff
                    <i class="fa-solid fa-user-tie"></i>                
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'Borrow' }" class="nav-link">
                    Borrow
                    <i class="fa-regular fa-calendar-check"></i>                
                </router-link>
            </li>
             <li class="nav-item">
                <router-link :to="{ name: 'User' }" class="nav-link">
                    User
                    <i class="fa-regular fa-user"></i>                
                </router-link>
            </li>
            <li class="nav-item logout">
                <button @click="handleLogout" class="nav-link">
                Logout
                <i class="fas fa-sign-out-alt"></i>
                </button>
            </li>
        </ul>
    </nav>
</template>
<script>
import axios from 'axios'; 

export default {
  name: 'Header', 
  methods: {
    async handleLogout() {
      try {
        localStorage.removeItem('token'); 

        this.$router.push({ name: 'Login' });
      } catch (error) {
        console.error('Logout error:', error);
        alert('An error occurred during logout. Please try again.');
      }
    },
  },
};
</script>

<style scoped>
.navbar{
    justify-content: space-between;
}
</style>
