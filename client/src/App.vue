<script>
import HeaderNav from "@/components/Header.vue";

export default {
  components: {
    HeaderNav,
  },
};
</script>

<template>
  <div id="app">
    <HeaderNav />
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>