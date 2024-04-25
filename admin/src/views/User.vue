<template>
    <div class="page row">
        <div class="col-md-12">
            <Search v-model="searchText" />
        </div>
        <div class="mt-3 col-md-12">
            <h4>
                User
                <i class="fa-solid fa-user-tie"></i>
            </h4>
            <UserList v-if="filteredUsersCount > 0" :user="filteredUsers"/>
            <p v-else>Không có liên hệ nào.</p>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary col-md-2" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                
                <button class="btn btn-sm btn-success col-md-2" @click="goToAddUser">
                    <i class="fas fa-plus"></i> Thêm mới

                </button>
                <button class="btn btn-sm btn-danger col-md-2" @click="removeAllUsers">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import Search from "@/components/Search.vue";
import UserList from "@/components/UserList.vue";
import UserService from "@/services/user";
export default {
    components: {
        Search,
        UserList,
    },

    data() {
        return {
            users: [],
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
        UserString() {
            return this.users.map((user) => {
                const { name, gender, dob, address,phone } = user;
                return [name, gender, dob, address,phone].join("");
            });
        },
        filteredUsers() {
            if (!this.searchText) return this.users;
            return this.users.filter((_user, index) =>
                this.UserString[index].includes(this.searchText)
            );
        },
        filteredUsersCount() {
            return this.filteredUsers.length;
        },
    },
    methods: {
        async retrieveUsers() {
            try {
                this.users = await UserService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveUsers();
            this.activeIndex = -1;
        },
        async removeAllUsers() {
            if (confirm("Bạn muốn xóa tất cả NV?")) {
                try {
                    await UserService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddUser() {
            this.$router.push({ name: "User.add" });
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