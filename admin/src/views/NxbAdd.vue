<template>
  <div v-if="nxb" class="page">
    <h4>Thêm NXB (Add Publisher)</h4>
    <NxbForm :nxb="nxb" @submit:nxb="createNxb" />
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
  data() {
    return {
      nxb: {},
      message: "",
    };
  },
  methods: {
    async createNxb(data) {
      try {
        await NxbService.create(data);
        this.message = "NXB đã được thêm thành công (Publisher added successfully).";
      } catch (error) {
        console.error(error);
        this.message = "Đã có lỗi khi thêm NXB (Error creating publisher).";
      }
    },
  },
};
</script>
