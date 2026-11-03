<template>
  <div class="app-layout">
    <!-- Tampilkan Navbar global hanya jika bukan di rute studio & report (karena workspace DAW & Diagnose punya sidebar dock & topbar sendiri 1:1) -->
    <Navbar v-if="!isWorkspaceRoute" />
    <main class="main-content">
      <router-view />
    </main>
    <Footer v-if="!isWorkspaceRoute" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

const route = useRoute();
const isWorkspaceRoute = computed(() => ['/studio', '/report'].includes(route.path));
</script>

<style>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main-content {
  flex: 1;
}
</style>