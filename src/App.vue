<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />

    <!-- RouterView akan mengisi sisa ruang yang tersedia -->
    <main class="flex-grow">
      <RouterView />
    </main>

    <Footer />
    <ToastWrapper />
  </div>
</template>

<script>
import { RouterView } from 'vue-router'
import Navbar from '@/components/global/Navbar.vue' // -> Gunakan path alias yg kokoh
import Footer from '@/components/global/Footer.vue'
import ToastWrapper from '@/components/global/ToastWrapper.vue'

export default {
  name: 'App',
  components: {
    RouterView,
    Navbar,
    Footer,
    ToastWrapper,
  }
}
</script>
