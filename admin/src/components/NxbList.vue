<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Address</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="nxb in nxbs" :key="nxb._id">
        <td>{{ nxbs.indexOf(nxb) + 1 }}</td> <td>{{ nxb.name }}</td>
        <td>{{ nxb.address }}</td>
        <td>
        <router-link :to="{ path: `/nxb/${nxb._id}` }"class="btn btn-success">Edit</router-link>
          <button @click="deleteNxb(nxb)"class="btn btn-danger">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import NxbService from "@/services/nxb"
export default {
  props: {
    nxbs: {
      type: Array,
      required: true,
    },
  },
  methods: {
    async deleteNxb(nxb) {
      if (confirm("Are you sure you want to delete this Nxb?")) {
        try {
          await NxbService.delete(this.nxb._id); 
          this.$router.push({ name: "Nxb" });
            this.message = "Nxb deleted successfully.";

        } catch (error) {
          console.error(error);
        }
      }
    },
  },
};
</script>
