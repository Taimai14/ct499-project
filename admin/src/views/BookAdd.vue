<template>
  <div v-if="book" class="page">
    <h4>Thêm Sách (Add Book)</h4>
    <BookForm :book="book" :nxb="nxb" @submit:book="createBook" />
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
  data() {
    return {
        book: {},
        nxb:[],
      message: "",
    };
  },
  methods: {
    async createBook(data) {
      try {
        await BookService.create(data);
        this.message = "Sách đã được thêm thành công (Book added successfully).";
      } catch (error) {
        console.error(error);
        this.message = "Đã có lỗi khi thêm sách (Error creating book)."; 
      }
    },
    async fetchNXBList() {
      try {
        this.nxb = await NxbService.getAll(); 
      } catch (error) {
        console.error("Error fetching NXB list:", error);
      }
    },
  },
  created() {
    this.fetchNXBList();
  },
};
</script>
