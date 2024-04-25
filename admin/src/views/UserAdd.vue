<template>
  <div class="page">
    <h4>Add User</h4>  
        <UserForm :user="user"  @submit:user="createUser" />

    <p>{{ message }}</p>
  </div>
</template>
<script>
import UserForm from "@/components/UserForm.vue";
import UserService from "@/services/user"; 

export default {
  components: {
    UserForm,
  },
  data() {
    return {
      user: {}, 
      message: "",
    };
  },
  methods: {
    async createUser(data) {
      try {
        await UserService.create(data); 
        this.message = "User added successfully.";
        this.user = {}; 
      } catch (error) {
        console.error("Error creating user:", error);
        this.message = "Error adding user.";
      }
    },
  },
};
</script>
