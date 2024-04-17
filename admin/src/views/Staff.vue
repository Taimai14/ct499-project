<template>
    <div class="page row">
        <div class="col-md-12">
            <Search v-model="searchText" />
        </div>
        <div class="mt-3 col-md-12">
            <h4>
                Staff
                <i class="fa-solid fa-user-tie"></i>
            </h4>
            <StaffList v-if="filteredStaffsCount > 0" :staff="filteredStaffs"/>
            <p v-else>Không có liên hệ nào.</p>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary col-md-2" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                
                <button class="btn btn-sm btn-success col-md-2" @click="goToAddStaff">
                    <i class="fas fa-plus"></i> Thêm mới

                </button>
                <button class="btn btn-sm btn-danger col-md-2" @click="removeAllStaffs">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import Search from "@/components/Search.vue";
import StaffList from "@/components/StaffList.vue";
import StaffService from "@/services/staff";
export default {
    components: {
        Search,
        StaffList,
    },

    data() {
        return {
            staffs: [],
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
        StaffString() {
            return this.staffs.map((staff) => {
                const { name, password, duty, address,phone } = staff;
                return [name, password, duty, address,phone].join("");
            });
        },
        filteredStaffs() {
            if (!this.searchText) return this.staffs;
            return this.staffs.filter((_staff, index) =>
                this.StaffString[index].includes(this.searchText)
            );
        },
        filteredStaffsCount() {
            return this.filteredStaffs.length;
        },
    },
    methods: {
        async retrieveStaffs() {
            try {
                this.staffs = await StaffService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveStaffs();
            this.activeIndex = -1;
        },
        async removeAllStaffs() {
            if (confirm("Bạn muốn xóa tất cả NV?")) {
                try {
                    await StaffService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddStaff() {
            this.$router.push({ name: "Staff.add" });
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