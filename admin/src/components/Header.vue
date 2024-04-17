<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" class="navbar-brand">ADMIN</a>
        <div class="mr-auto navbar-nav">
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
                <button @click="handleLogout" class="nav-link">
                Logout
                <i class="fas fa-sign-out-alt"></i>
                </button>
            </li>
        </div>
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
</style>
