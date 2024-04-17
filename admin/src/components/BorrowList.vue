<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Book ID</th>
        <th scope="col">User ID</th>
        <th scope="col">Borrow Date</th>
        <th scope="col">Return Date</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(borrow, index) in borrows" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ borrow.bookId }}</td>
        <td>{{ borrow.userId }}</td>
        <td>{{ borrow.borrowDate }}</td>
        <td>{{ borrow.returnDate }}</td>
        <td>
            <button @click="updateReturnDate(borrow)"class="btn btn-success">Update return date</button>
            <button @click="deleteBorrow(borrow)"class="btn btn-danger">delete</button>

        </td>
      </tr>
    </tbody>
  </table>
  
</template>

<script>
import BookService from "@/services/books"; 
import BorrowService from "@/services/borrow";
import UserService from "@/services/user";


export default {
  props: {
    borrows: {
      type: Array,
      required: true,
    },
  },
  methods: {
    async getBookName(bookId) {
      try {
        const book = await BookService.get(bookId);
        console.log(book.name);
        return book.name;
      } catch (error) {
        console.error("Error fetching book details:", error);
        return "Book Not Found"; 
      }
    },
    async getUserName(userId) {
      try {
        const user = await UserService.get(userId);
        return user.name;
      } catch (error) {
        console.error("Error fetching user details:", error);
        return "User Not Found"; 
      }
    },
    async updateReturnDate(borrow) {
       if (borrow.returnDate!="Borrowing") {
          alert("Return date has already been set. You cannot update it.");
          return;
        }
      if (confirm("Are you sure you want to update the return date?")) {
        try {
          const today = new Date().toISOString().slice(0, 10);
          console.log(today);
          book = getBookName(borrow.bookId);
          const updatedBook = { ...book, quantity: borrow.book.quantity + 1 };
          await BookService.update(borrow.bookId, updatedBook);

          const updatedBorrow = { ...borrow, returnDate: today };
          await BorrowService.update(borrow._id, updatedBorrow);
          this.$message = "Return date updated successfully.";
        } catch (error) {
          console.error("Error updating borrow:", error);
          this.$message.error("Failed to update return date.");
        }
      }
    },
     async deleteBorrow(borrow) {
      if (confirm("Are you sure you want to delete this Borrow?")) {
        try {
          await BorrowService.delete(borrow._id); 
          this.$router.push({ name: "Borrow" });
            this.message = "Borrow deleted successfully.";

        } catch (error) {
          console.error(error);
        }
      }
    },

  },
};
</script>
