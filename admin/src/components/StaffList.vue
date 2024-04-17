<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Duty</th>
        <th scope="col">Phone</th>
        <th scope="col">Address</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(staff, index) in staff" :key="staff._id">
        <td>{{ index + 1 }}</td>
        <td>{{ staff.name }}</td>
        <td>{{ staff.duty }}</td>
        <td>{{ staff.phone }}</td>
        <td>{{ staff.address }}</td>
        <td>
          <router-link :to="{ path: `/staff/${staff._id}` }" class="btn btn-success">Edit</router-link>
          <button @click="deleteStaff(staff._id)" class="btn btn-danger">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import StaffService from "@/services/staff"
export default {
  props: {
    staff: {
      type: Array,
      required: true,
    },
  },
  methods: {
    async deleteStaff(staffId) {
      if (confirm("Are you sure you want to delete this staff member?")) {
        try {
            await StaffService.delete(staffId); 
            this.message = "Staff deleted successfully.";
            this.$router.push({ name: "Staff" });
        } catch (error) {
          console.error(error);
        }
      }
    },
  },
};
</script>
