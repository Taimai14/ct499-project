<template>
  <div v-if="user" class="page">
    <h4>Edit User</h4>
    <UserForm :user="user" @submit:user="updateUser" @delete:user="deleteUser" />
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
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      user: null,
      message: "",
    };
  },
  methods: {
    async getUser(id) {
      try {
        this.user = await UserService.get(id);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    },
    async updateUser(data) {
      try {
        await UserService.update(this.user._id, data);
        this.message = "User updated successfully.";
      } catch (error) {
        console.error("Error updating user:", error);
      }
    },
    async deleteUser() {
      if (confirm("Are you sure you want to delete this user?")) {
        try {
          await UserService.delete(this.user._id);
          this.$router.push({ name: "User" }); 
          this.message = "User deleted successfully.";
        } catch (error) {
          console.error("Error deleting user:", error);
        }
      }
    },
  },
  created() {
    this.getUser(this.id);
    this.message = "";
  },
};
</script>
