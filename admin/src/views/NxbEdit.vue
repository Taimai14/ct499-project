<template>
  <div v-if="nxb" class="page">
    <h4>Edit Publisher (Chỉnh sửa NXB)</h4>
    <NxbForm :nxb="nxb" @submit:nxb="updateNxb" @delete:nxb="deleteNxb"  />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import NxbForm from "@/components/NxbForm.vue";
import NxbService from "@/services/nxb";

export default {
  components: {
    NxbForm,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      nxb: null,
      message: "",
    };
  },
  methods: {
    async fetchNxb(id) {
      try {
        this.nxb = await NxbService.get(id);
      } catch (error) {
        console.error(error);
      }
    },
    async updateNxb(data) {
      try {
        await NxbService.update(this.nxb._id, data);
        this.message = "NXB updated successfully (NXB cập nhật thành công).";
      } catch (error) {
        console.error(error);
        this.message = "Đã có lỗi khi cập nhật NXB (Error updating NXB).";
      }
    },
    async deleteNxb() {
      if (confirm("Are you sure you want to delete this nxb?")) {
        try {
          await NxbService.delete(this.nxb._id); 
          this.$router.push({ name: "Nxb.edit" });
                  this.message = "nxb deleted successfully.";

        } catch (error) {
          console.error(error);
        }
      }
    },
  },
  created() {
    this.fetchNxb(this.id);
    this.message = "";
  },
};
</script>
