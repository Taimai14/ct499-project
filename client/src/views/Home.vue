<template>
    <h1>RECOMENDED BOOK OF THE DAY</h1>
  <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="../assets/1.png" class="d-block mx-auto" alt="..." style="width: 30%;">
      </div>
      <div class="carousel-item">
        <img src="../assets/2.png" class="d-block mx-auto" alt="..." style="width: 30%;">
      </div>
      <div class="carousel-item">
        <img src="../assets/3.png" class="d-block mx-auto" alt="..." style="width: 30%;">
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>

  <div class="row page">
      <input type="text" v-model="searchText" placeholder="Search for book title" class="search">
    <div class="card col-md-3" style="width: 18rem;" v-for="book in filteredBooks" :key="book._id">
        <img :src="`../src/assets/${Math.floor(Math.random() * 3) + 1}.png`" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">{{ book.name }}</h5>
        <p class="card-text">{{ book.source }}</p>
        <p class="card-text">{{ book.price }}$</p>
        <p class="card-text">Avalible: {{ book.quantity }}</p>

        <router-link :to="{ path: `/borrow/${book._id}` }" class="btn btn-success">Order book</router-link>
      </div>
    </div>

</div>
</template>

<script>
import BookService from "@/services/books";

export default {

    data() {
        return {
            books: [],
            activeIndex: -1,
            searchText:''
        };
    },
    computed: {
    filteredBooks() {
        const searchTerm = this.searchText.toLowerCase();
        return this.books.filter(book =>
            book.name.toLowerCase().includes(searchTerm) ||
            book.source.toLowerCase().includes(searchTerm)
        );
    }
    },
    methods: {
        async retrieveBooks() {
            try {
                this.books = await BookService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveBooks();
            this.activeIndex = -1;
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>

<style scoped>
h1{
    text-align: center;
}
.page {
    text-align: left;
    max-width: 1000px;
}
.card{
    margin: 10px 10px;
}
.search{
    font-size: 20px;
}
</style>