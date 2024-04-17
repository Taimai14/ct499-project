<template>
  <div v-if="book" class="page">
    <h4>Edit Book</h4>
    <BookForm :book="book" :nxb="nxb" @submit:book="updateBook" @delete:book="deleteBook" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import BookForm from "@/components/BookForm.vue"; 

import BookService from "@/services/books"; 
import NxbService from "@/services/nxb"; 


export default {
  components: {
    BookForm,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
        nxb:[],
      book: null,
      message: "",
    };
  },
  methods: {
    async fetchNXBList() {
      try {
        this.nxb = await NxbService.getAll(); 
      } catch (error) {
        console.error("Error fetching NXB list:", error);
      }
    },
    async getBook(id) {
      try {
        this.book = await BookService.get(id);
      } catch (error) {
        console.error(error);
      }
    },
    async updateBook(data) {
      try {
        await BookService.update(this.book._id, data); 
        this.message = "Book updated successfully.";
      } catch (error) {
        console.error(error);
      }
    },
    async deleteBook() {
      if (confirm("Are you sure you want to delete this book?")) {
        try {
          await BookService.delete(this.book._id); 
          this.$router.push({ name: "Book.edit" });
        this.message = "Book deleted successfully.";

        } catch (error) {
          console.error(error);
        }
      }
    },
  },
  created() {
    this.fetchNXBList();
    this.getBook(this.id);
    this.message = "";
  },
};
</script>
