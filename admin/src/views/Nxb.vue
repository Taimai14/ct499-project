<template>
    <div class="page row">
        <div class="col-md-12">
            <Search v-model="searchText" />
        </div>
        <div class="mt-3 col-md-12">
            <h4>
                Nha Xuat Ban
                    <i class="fa-solid fa-house-circle-check"></i>                
            </h4>
            <NxbList v-if="filteredNxbsCount > 0" :nxbs="filteredNxbs"/>
            <p v-else>Không có liên hệ nào.</p>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary col-md-2" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                
                <button class="btn btn-sm btn-success col-md-2" @click="goToAddNxb">
                    <i class="fas fa-plus"></i> Thêm mới

                </button>
                <button class="btn btn-sm btn-danger col-md-2" @click="removeAllnxb">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import Search from "@/components/Search.vue";
import NxbList from "@/components/NxbList.vue";
import NxbService from "@/services/nxb";
export default {
    components: {
        Search,
        NxbList,
    },

    data() {
        return {
            nxbs: [],
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
        NxbString() {
            return this.nxbs.map((nxb) => {
                const { name, address} = nxb;
                return [name, address].join("");
            });
        },
        filteredNxbs() {
            if (!this.searchText) return this.nxbs;
            return this.nxbs.filter((_nxb, index) =>
                this.NxbString[index].includes(this.searchText)
            );
        },
        filteredNxbsCount() {
            return this.filteredNxbs.length;
        },
    },
    methods: {
        async retrieveNxbs() {
            try {
                this.nxbs = await NxbService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveNxbs();
            this.activeIndex = -1;
        },
        async removeAllnxb() {
            if (confirm("Bạn muốn xóa tất cả Nxb?")) {
                try {
                    await NxbService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddNxb() {
            this.$router.push({ name: "Nxb.add" });
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