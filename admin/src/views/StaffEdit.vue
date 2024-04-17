<template>
  <div v-if="staff" class="page">
    <h4>Edit Staff Member</h4>
    <StaffForm :staff="staff" @submit:staff="updateStaff" @delete:staff="deleteStaff" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import StaffForm from "@/components/StaffForm.vue";
import StaffService from "@/services/staff"; 

export default {
  components: {
    StaffForm,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      staff: null,
      message: "",
    };
  },
  methods: {
    async getStaff(id) {
      try {
        this.staff = await StaffService.get(id);
      } catch (error) {
        console.error("Error fetching staff member:", error);
      }
    },
    async updateStaff(data) {
      try {
        await StaffService.update(this.staff._id, data);
        this.message = "Staff member updated successfully.";
      } catch (error) {
        console.error("Error updating staff member:", error);
      }
    },
    async deleteStaff() {
      if (confirm("Are you sure you want to delete this staff member?")) {
        try {
          await StaffService.delete(this.staff._id);
          this.$router.push({ name: "Staff" }); 
          this.message = "Staff member deleted successfully.";
        } catch (error) {
          console.error("Error deleting staff member:", error);
        }
      }
    },
  },
  created() {
    this.getStaff(this.id);
    this.message = "";
  },
};
</script>
