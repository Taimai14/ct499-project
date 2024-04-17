<template>
    <div class="page row">
        <div class="col-md-12">
            <Search v-model="searchText" />
        </div>
        <div class="mt-3 col-md-12">
            <h4>
                BookStore
                <i class="fas fa-address-book"></i>
            </h4>
            <BookList v-if="filteredBooksCount > 0" :books="filteredBooks"/>
            <p v-else>Không có liên hệ nào.</p>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary col-md-2" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                
                <button class="btn btn-sm btn-success col-md-2" @click="goToAddBook">
                    <i class="fas fa-plus"></i> Thêm mới

                </button>
                <button class="btn btn-sm btn-danger col-md-2" @click="removeAllBooks">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import Search from "@/components/Search.vue";
import BookList from "@/components/BookList.vue";
import BookService from "@/services/books";
export default {
    components: {
        Search,
        BookList,
    },

    data() {
        return {
            books: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {

        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        BookString() {
            return this.books.map((book) => {
                const { name, price, year, nxbID,source } = book;
                return [name, price, year, nxbID,source].join("");
            });
        },
        filteredBooks() {
            if (!this.searchText) return this.books;
            return this.books.filter((_book, index) =>
                this.BookString[index].includes(this.searchText)
            );
        },
        filteredBooksCount() {
            return this.filteredBooks.length;
        },
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
        async removeAllBooks() {
            if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
                try {
                    await BookService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddBook() {
            this.$router.push({ name: "Book.add" });
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