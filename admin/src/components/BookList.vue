<script>
import BookService from "@/services/books"; 
export default {
  props: {
    books: {
      type: Array,
      required: true, 
    },
  },
  computed: {
    formattedBooks() {
      return  this.books.map((book) => ({
        ...book,
        price: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(book.price),
      }));
    },
  },
  methods: {
    async deleteBook(book) {
      if (confirm("Are you sure you want to delete this book?")) {
        try {
          await BookService.delete(book._id); 
          this.$router.push({ name: "Book" });
            this.message = "Book deleted successfully.";

        } catch (error) {
          console.error(error);
        }
      }
    },
  },
};
</script>


<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Price</th>
        <th scope="col">Publisher (NXB)</th>
        <th scope="col">Source</th>
        <th scope="col">Quantity</th>
        <th scope="col">Year</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="!formattedBooks.length">
        <td colspan="8" class="text-center">Loading books...</td>
      </tr>
      <tr v-for="(book, index) in formattedBooks" :key="book.id">
        <td>{{ index + 1 }}</td>
        <td>{{ book.name }}</td>
        <td>{{ book.price }}</td>
        <td>{{ book.nxbID }}</td>
        <td>{{ book.source }}</td>
        <td>{{ book.quantity }}</td>
        <td>{{ book.year }}</td>
        <td>
        <router-link :to="{ path: `/books/${book._id}` }"class="btn btn-success">Edit</router-link>
          <button @click="deleteBook(book)"class="btn btn-danger">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

