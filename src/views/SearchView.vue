<template>
  <main class="bg-gray-100 min-h-screen">
    <div class="container mx-auto py-8">
      <!-- ============================================= -->
      <!-- BAGIAN ATAS HALAMAN (TOMBOL KEMBALI & JUDUL) -->
      <!-- ============================================= -->
      <div class="px-4 sm:px-0 mb-4">
        <button @click="$router.back()" class="flex items-center gap-2 text-gray-600 hover:text-black font-semibold">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Kembali
        </button>
      </div>

      <!-- ============================================= -->
      <!-- TOMBOL AKSI UNTUK MOBILE (DIRAPIKAN) -->
      <!-- ============================================= -->
      <div class="lg:hidden flex gap-4 mb-6 px-4 sm:px-0">
        <button @click="openFilterDrawer" class="flex-1 flex justify-center items-center gap-2 bg-white text-gray-800 font-bold py-3 px-4 rounded-lg shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
          Filter
        </button>
        <button @click="goHome" class="flex-1 flex justify-center items-center gap-2 bg-white text-gray-800 font-semibold py-3 px-4 rounded-lg shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          Ubah Pencarian
        </button>
      </div>

      <!-- ============================================= -->
      <!-- KONTEN UTAMA (GRID) -->
      <!-- ============================================= -->
      <div class="grid grid-cols-12 gap-6">
        <!-- Kolom Sidebar (Desktop) -->
        <aside class="hidden lg:block col-span-3">
          <div class="p-4 bg-white rounded-lg shadow-md mb-6">
            <h2 class="text-xl font-bold mb-4">Ubah Pencarian</h2>
            <p v-if="searchParams.dari" class="text-sm"><span class="font-semibold">Rute:</span> {{ searchParams.dari }} → {{ searchParams.ke }}</p>
            <button @click="goHome" class="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg">Ubah</button>
          </div>
          <FilterSidebar :operators="availableOperators" @update-filters="handleUpdateFilters" />
        </aside>

        <!-- Kolom Hasil Pencarian -->
        <section class="col-span-12 lg:col-span-9">
           <div v-if="isLoading" class="space-y-4">
            <div v-for="n in 3" :key="n" class="w-full h-36 bg-white rounded-lg shadow-md animate-pulse"></div>
          </div>
          <div v-else-if="error" class="p-8 text-center bg-white rounded-lg shadow-md">
            <p class="text-xl font-semibold text-red-600">{{ error }}</p>
            <button @click="goHome" class="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Cari Rute Lain</button>
          </div>
          <div v-else-if="shuttleResults.length > 0">
            <div class="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
              <h1 class="text-2xl font-bold mb-2 sm:mb-0">Menampilkan {{ filteredShuttleResults.length }} dari {{ shuttleResults.length }} jadwal</h1>
              <div class="flex items-center gap-2">
                <label for="sort" class="text-sm font-medium">Urutkan:</label>
                <select id="sort" v-model="selectedSort" class="w-auto border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500">
                  <option value="recommended">Rekomendasi</option>
                  <option value="harga-termurah">Harga Termurah</option>
                  <option value="harga-termahal">Harga Termahal</option>
                  <option value="jam-terawal">Jam Terawal</option>
                </select>
              </div>
            </div>
            <div v-if="filteredShuttleResults.length === 0" class="p-8 text-center bg-white rounded-lg shadow-md">
              <p class="text-xl font-semibold text-gray-700">Oops, tidak ada shuttle yang cocok dengan filter Anda.</p>
            </div>
            <div v-else class="space-y-4">
              <CardShuttle v-for="shuttle in filteredShuttleResults" :key="shuttle.id" :shuttle="shuttle" @select="handleSelectSchedule"/>
            </div>
          </div>
        </section>
      </div>

      <!-- Drawer Mobile -->
      <FilterSidebar :as-drawer="true" :is-open="isFilterDrawerOpen" :operators="availableOperators" @update-filters="handleUpdateFilters" @close="closeFilterDrawer"/>
    </div>
  </main>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'pinia'
import { useBookingStore } from '../stores/bookingStore'
import CardShuttle from '../components/search/CardShuttle.vue'
import FilterSidebar from '../components/search/FilterSidebar.vue'

export default {
  name: 'SearchView',
  components: { CardShuttle, FilterSidebar },
  data() {
    return {
      selectedSort: 'recommended',
    }
  },
  computed: {
    ...mapState(useBookingStore, ['isLoading', 'error', 'shuttleResults', 'searchParams', 'isFilterDrawerOpen']),
    ...mapGetters(useBookingStore, ['availableOperators', 'filteredShuttleResults'])
  },
  methods: {
    // =============================================
    // INI DIA PERBAIKANNYA: TAMBAHKAN 'updateSort'
    // =============================================
    ...mapActions(useBookingStore, [
      'fetchShuttles',
      'selectScheduleAndProceed',
      'updateFilters',
      'openFilterDrawer',
      'closeFilterDrawer',
      'updateSort' // <-- Kabel yang putus udah disambung!
    ]),

    loadInitialData() {
      this.selectedSort = 'recommended'; // Reset sort setiap load
      const { dari, ke, tgl, kursi } = this.$route.query;
      if (dari && ke && tgl) { this.fetchShuttles({ dari, ke, tgl, kursi: parseInt(kursi) || 1 }); }
      else { this.$router.push({ name: 'home' }); }
    },
    goHome() { this.$router.push({ name: 'home' }); },
    handleSelectSchedule(scheduleData) { this.selectScheduleAndProceed(scheduleData, this.$router); },
    handleUpdateFilters(newFilters) { this.updateFilters(newFilters); }
  },
  watch: {
    selectedSort(newValue) {
      this.updateSort(newValue);
    }
  },
  created() { this.loadInitialData(); },
}
</script>
