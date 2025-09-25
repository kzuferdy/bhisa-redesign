<template>
  <header class="bg-white shadow-md sticky top-0 z-30">
    <nav class="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
       <router-link :to="{ name: 'home' }">
        <img
          class="h-10 w-auto"
          :src="logoImage"
          alt="Logo Bhisa Shuttle"
        />
      </router-link>

      <div class="hidden md:flex items-center space-x-6">
        <router-link :to="{ name: 'home' }" class="text-gray-600 hover:text-blue-600">Beranda</router-link>
        <a href="#" class="text-gray-600 hover:text-blue-600">Cek Pesanan</a>
        <a href="#" class="text-gray-600 hover:text-blue-600">Pusat Bantuan</a>
      </div>

      <div class="hidden md:flex items-center space-x-2">
        <button class="px-4 py-2 text-sm font-semibold text-gray-700 rounded-lg hover:bg-gray-100">Masuk</button>
        <button class="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">Daftar</button>
      </div>

      <div class="md:hidden">
        <button @click="isMobileMenuOpen = !isMobileMenuOpen">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </nav>

    <div v-if="isMobileMenuOpen" class="md:hidden bg-white border-t">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <router-link :to="{ name: 'home' }" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">Beranda</router-link>
        <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">Cek Pesanan</a>
        <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">Pusat Bantuan</a>
      </div>
      <div class="pt-4 pb-3 border-t border-gray-200">
        <div class="flex items-center px-5">
           <button class="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">Masuk</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import logoImage from '@/assets/images/logo.png';

export default {
  name: 'Navbar',
  data() {
    return {
      logoImage,
      isMobileMenuOpen: false,
    }
  },
}
</script>
