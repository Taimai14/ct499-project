<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Gender</th> 
        <th scope="col">Phone</th>
        <th scope="col">Address</th>
        <th scope="col">Date of Birth</th>  <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
    <tr v-for="(user, index) in user" :key="user._id">
        <td>{{ index + 1 }}</td>  
        <td>{{ user.name }}</td>  
        <td>{{ user.gender }}</td>
        <td>{{ user.phone }}</td>  
        <td>{{ user.address }}</td>
        <td>{{ user.dob }}</td>
        <td>
            <router-link :to="{ path: `/user/${user._id}` }" class="btn btn-success">Edit</router-link>
            <button @click="deleteUser(user._id)" class="btn btn-danger">Delete</button>
        </td>
    </tr>

    </tbody>
  </table>
</template>


<script>
import UserService from "@/services/user" 

export default {
  props: {
    user: { 
      type: Array,
      required: true,
    },
  },
  methods: {
    async deleteUser(userId) {
      if (confirm("Are you sure you want to delete this user?")) {
        try {
          await UserService.delete(userId); 
          this.message = "User deleted successfully.";
          this.$router.push({ name: "Users" }); 
        } catch (error) {
          console.error(error);
        }
      }
    },
  },
};
</script>
