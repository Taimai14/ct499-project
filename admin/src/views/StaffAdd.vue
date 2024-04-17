<template>
  <div class="page">
    <h4>Add Staff Member</h4>
    <StaffForm :staff="staff"  @submit:staff="createStaff" />
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
  data() {
    return {
        staff:{},
      message: "",
    };
  },
  methods: {
    async createStaff(data) {
      try {
        await StaffService.create(data);
        this.message = "Staff member added successfully.";
      } catch (error) {
        console.error("Error creating staff member:", error);
        this.message = "Error adding staff member.";
      }
    },
  },
};
</script>
