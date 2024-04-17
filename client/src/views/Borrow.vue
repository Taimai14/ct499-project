<template>
  <div class="Borrow-form">
    <h3>Register User</h3>
    <form @submit="handleSubmit">
      <div class="form-group">
        <label class="form-label" for="name">Name:</label>
        <input class="form-control" type="text" id="name" v-model="newUser.name" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="password">Password:</label>
        <input class="form-control" type="text" id="password" v-model="newUser.password">
      </div>
      <div class="form-group">
        <label class="form-label" for="dob">Date of Birth:</label>
        <input class="form-control" type="date" id="dob" v-model="newUser.dob">
      </div>
      <div class="form-group">
        <label class="form-label" for="gender">Gender:</label>
        <select id="gender"class="form-control" v-model="newUser.gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label" for="address">Address:</label>
        <textarea class="form-control" id="address" v-model="newUser.address"></textarea>
      </div>
      <div class="form-group">
        <label class="form-label" for="phone">Phone Number:</label>
        <input class="form-control" type="tel" id="phone" v-model="newUser.phone">
      </div>
      <button type="submit">Borrow</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import UserService from '@/services/user'; 
import BookService from '@/services/books';
import BorrowService from '@/services/borrow';
import { useRoute } from 'vue-router';


export default {
  data() {
    return {
      staff: null,
      message: "",
    };
  },
  setup() {
    const newUser = ref({
      name: '',
      password: '',
      dob: null,
      gender: '',
      address: '',
      phone: ''
    });
    const selectedBookId = useRoute().params.id;
    const books = ref('');
    const handleSubmit = async (event) => {
      event.preventDefault(); 
      try {

        const book = await BookService.get(selectedBookId);
        console.log(book);

        if (book.quantity === 0) {
          alert("This book is out of stock.");
          return;
        }
        const user = await UserService.create(newUser.value);
        const userId = user._id;


        const borrow = { userId:userId, bookId: selectedBookId };
        await BorrowService.create(borrow);

        await BookService.update(selectedBookId, { quantity: book.quantity - 1 });

        
        alert('Book borrowed successfully!');

      } catch (error) {
        console.error(error);
        alert('Error borrowing book. Please try again.');
      }
    };


    return { newUser, selectedBookId, books, handleSubmit };
  },

  methods: {
    async createBorrow(borrow) {
      try {
        await BorrowService.create(userId,bookId);
        this.message = "tt mượn đã được thêm thành công (Borrow added successfully).";
      } catch (error) {
        console.error(error);
        this.message = "Đã có lỗi khi thêm tt mượn (Error creating borrow)."; 
      }
    },
  },
};
</script>

<style scoped>
.borrow-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 10px;
}
.Borrow-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
