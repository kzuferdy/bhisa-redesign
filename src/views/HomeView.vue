<template>
  <main>
    <section class="relative bg-cover bg-center text-white text-center py-20"
      :style="{ backgroundImage: `url(${heroImage})` }">
      <div class="absolute inset-0 bg-black/60"></div>

      <div class="relative z-10 container mx-auto px-4">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Pesan Tiket Shuttle Jadi Lebih Mudah</h1>
        <p class="text-lg md:text-xl mb-8">Cari jadwal, pilih kursi, dan bayar online dalam sekejap.</p>
        <button
          class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transform hover:scale-105 transition-transform">
          Lihat Jadwal Populer
        </button>
      </div>
    </section>

 <div class="bg-gray-50">
      <section class="container mx-auto -mt-12 px-4">
        <div class="p-6 md:p-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto relative z-20">
          <h2 class="text-2xl font-bold mb-6 text-gray-800">Cari Shuttle</h2>
          <form @submit.prevent="handleSearch">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div class="md:col-span-1">
                <label for="origin" class="block text-sm font-medium text-gray-700 mb-1">Dari</label>
                <select v-model="search.origin" id="origin" class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                  <option disabled value="">Pilih kota asal</option>
                  <option v-for="loc in locations" :key="loc" :value="loc">{{ loc }}</option>
                </select>
              </div>
              <div class="md:col-span-1">
                <label for="destination" class="block text-sm font-medium text-gray-700 mb-1">Ke</label>
                <select v-model="search.destination" id="destination" class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                  <option disabled value="">Pilih kota tujuan</option>
                  <option v-for="loc in locations" :key="loc" :value="loc">{{ loc }}</option>
                </select>
              </div>
              <div class="md:col-span-1">
                <label for="date" class="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
                <input type="date" v-model="search.date" :min="today" id="date" class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
              </div>
              <div class="md:col-span-1">
                <button
                  type="submit"
                  :disabled="isSearching"
                  class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {{ isSearching ? 'Mencari...' : 'Cari' }}
                </button>
              </div>
            </div>
            <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
          </form>
        </div>
      </section>

      <section class="container mx-auto pt-16 pb-16 text-center px-4">
        <h2 class="text-3xl font-bold mb-8">Jangkauan Wilayah Terluas</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div v-for="region in regions" :key="region" class="p-4 bg-white border rounded-lg hover:shadow-md cursor-pointer">
            <p class="font-semibold text-gray-700">{{ region }}</p>
          </div>
        </div>
      </section>
    </div>

    <section class="bg-white py-16">
        <div class="container mx-auto text-center max-w-2xl px-4">
            <h2 class="text-3xl font-bold mb-4">Sudah Punya Tiket?</h2>
            <p class="text-gray-600 mb-6">Masukkan kode booking untuk melihat detail perjalanan atau mengubah jadwal.</p>
            <div class="flex max-w-md mx-auto">
                <input type="text" placeholder="Masukkan kode booking" class="w-full border-gray-300 rounded-l-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                <button class="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-6 rounded-r-md">Cek</button>
            </div>
        </div>
    </section>
  </main>
</template>

<script>
import heroImage from '@/assets/images/bhisa.png';
export default {
  name: 'HomeView',
  data() {
    return {
      heroImage,
      isSearching: false,
      search: {
        origin: '',
        destination: '',
        date: new Date().toISOString().slice(0, 10),
      },
      locations: ['Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta'],
      regions: ['Jadetabek', 'Bandung Raya', 'Cirebon', 'Semarang', 'Solo', 'Surabaya'],
      error: null,
    }
  },
  computed: {
    today() {
      return new Date().toISOString().slice(0, 10);
    }
  },
  methods: {
    async handleSearch() {
      this.error = null;

      if (!this.search.origin || !this.search.destination) {
        this.error = 'Kota asal dan tujuan wajib diisi.';
        return;
      }
      if (this.search.origin === this.search.destination) {
        this.error = 'Kota asal dan tujuan tidak boleh sama.';
        return;
      }

      this.isSearching = true;
      try {
        await this.$router.push({
          name: 'search',
          query: {
            dari: this.search.origin,
            ke: this.search.destination,
            tgl: this.search.date,
            kursi: 1
          }
        });
      } finally {
        this.isSearching = false;
      }
    }
  }
}
</script>
