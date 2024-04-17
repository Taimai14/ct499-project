<template>
  <div class="page row">
    <div class="col-md-12">
      <Search v-model="searchText" />
    </div>
    <div class="mt-3 col-md-12">
      <h4>
        Borrows
        <i class="fas fa-file-signature"></i>
      </h4>
      <BorrowList v-if="filteredBorrowsCount > 0" :borrows="filteredBorrows" />
      <p v-else>Không có lịch mượn nào.</p>
      <div class="mt-3 row justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary col-md-2" @click="refreshList()">
          <i class="fas fa-redo"></i> Refresh
        </button>
        <!-- <button class="btn btn-sm btn-danger col-md-2" @click="removeAllBorrows" disabled>
          <i class="fas fa-trash"></i> Delete All (Disabled)
        </button> -->
      </div>
    </div>
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
import BorrowList from "@/components/BorrowList.vue";
import BorrowService from "@/services/borrow"; 
export default {
  components: {
    Search,
    BorrowList,
  },

  data() {
    return {
      borrows: [],
      searchText: "",
    };
  },

  watch: {
    searchText() {
      this.activeIndex = -1; 
    },
  },

  computed: {
    filteredBorrows() {
      if (!this.searchText) return this.borrows;
      const searchTerm = this.searchText.toLowerCase();
      return this.borrows.filter((borrow) =>
        borrow.bookId.toString().includes(searchTerm) ||
        borrow.userId.toString().includes(searchTerm)
      );
    },
    filteredBorrowsCount() {
      return this.filteredBorrows.length;
    },
  },


  methods: {
    async retrieveBorrows() {
      try {
        this.borrows = await BorrowService.getAll();
      } catch (error) {
        console.log(error);
      }
    },

    refreshList() {
      this.retrieveBorrows();
    },

    async removeAllBorrows() {
      // Implement confirmation and deletion logic if needed
      // Consider disabling this button until a proper implementation exists
      alert("Delete all borrows is currently disabled for safety reasons.");
    },
  },

  mounted() {
    this.refreshList();
  },
};
</script>

<style scoped>
.page {
  text-align: left;
  max-width: 750px;
}
</style>
