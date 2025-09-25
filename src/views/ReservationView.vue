<template>
  <main class="bg-gray-50 py-8 md:py-12">
    <div class="container mx-auto">
      <div class="px-4 sm:px-0 mb-6">
        <button @click="$router.back()" class="flex items-center gap-2 text-gray-600 hover:text-black font-semibold">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Kembali ke Hasil Pencarian
        </button>
      </div>
      <div v-if="!orderSummary" class="text-center"><p>Memuat detail pesanan...</p></div>
      <div v-else class="grid grid-cols-12 gap-6 lg:gap-8">
        <div class="col-span-12 lg:col-span-8">
          <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg mb-6" role="alert">
            <p class="font-bold">Selesaikan dalam <span class="text-lg">{{ formattedCountdown }}</span></p>
          </div>
          <h1 class="text-3xl font-bold mb-6">Detail Reservasi</h1>
          <section class="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 class="text-xl font-semibold mb-4">Pilih Kursi</h2>
            <p class="text-sm text-gray-600 mb-4">Silakan pilih <span class="font-bold">{{ searchParams.kursi || 1 }} kursi</span>.</p>
            <SeatMap />
          </section>
          <section v-if="selectedSeats.length > 0" class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-xl font-semibold mb-4">Data Penumpang</h2>
            <div class="space-y-6">
              <div v-for="seatId in selectedSeats.sort()" :key="seatId" class="border p-4 rounded-md">
                <p class="font-bold mb-2">Penumpang Kursi {{ seatId }}</p>
                <div>
                  <label :for="'name-' + seatId" class="block text-sm font-medium text-gray-700">Nama Lengkap (Wajib)</label>
                  <input type="text" :id="'name-' + seatId" :value="passengerData[seatId]?.name || ''" @input="updatePassenger(seatId, { name: $event.target.value })" placeholder="Sesuai KTP/Paspor" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                </div>
                 <div class="mt-4">
                  <label :for="'phone-' + seatId" class="block text-sm font-medium text-gray-700">Nomor WhatsApp</label>
                  <input type="tel" :id="'phone-' + seatId" :value="passengerData[seatId]?.phone || ''" @input="updatePassenger(seatId, { phone: $event.target.value })" placeholder="Contoh: 08123456789" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                </div>
              </div>
            </div>
          </section>
        </div>
        <div class="col-span-12 lg:col-span-4">
          <div class="sticky top-8">
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h2 class="text-xl font-semibold border-b pb-4 mb-4">Ringkasan Pesanan</h2>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between"><span>Subtotal</span> <span>{{ orderSummary.subtotalFormatted }}</span></div>
                <div v-if="couponDiscount > 0" class="flex justify-between text-green-600">
                  <span>Diskon ({{ couponCode }})</span> <span>- {{ orderSummary.discountFormatted }}</span>
                </div>
                <div class="border-t my-4"></div>
                <div class="flex justify-between text-base font-bold">
                  <span>Total Bayar</span>
                  <span>{{ orderSummary.totalFormatted }}</span>
                </div>
              </div>
              <div class="mt-4">
                <label for="coupon" class="block text-xs font-medium text-gray-500">Punya Kode Kupon?</label>
                <div class="mt-1 flex">
                  <input type="text" id="coupon" v-model="store.couponCode" @keyup.enter="applyCoupon" placeholder="Contoh: HEMAT30" class="block w-full border-gray-300 rounded-l-md shadow-sm text-sm">
                  <button @click="applyCoupon" class="bg-gray-800 text-white px-4 rounded-r-md text-sm font-semibold">Pakai</button>
                </div>
                <p v-if="couponError" class="text-red-500 text-xs mt-1">{{ couponError }}</p>
              </div>
               <div class="mt-6 border-t pt-4">
        <div class="flex items-start">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            :checked="termsAgreed"
            @change="setTermsAgreed($event.target.checked)"
            class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-0.5"
          >
          <label for="terms" class="ml-3 text-sm text-gray-600">
            Saya telah membaca dan menyetujui <a href="#" class="font-medium text-blue-600 hover:underline">Syarat & Ketentuan</a> yang berlaku.
          </label>
        </div>
      </div>
              <button @click="handleProceedToPayment" :disabled="!isPassengerDataValid" class="mt-6 w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed">
                Lanjut ke Pembayaran
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'pinia'
import { useBookingStore } from '../stores/bookingStore'
import SeatMap from '../components/reservation/SeatMap.vue'

export default {
  name: 'ReservationView',
  components: { SeatMap },
  setup() {
    const store = useBookingStore();
    return { store };
  },
  computed: {
    ...mapState(useBookingStore, ['selectedSeats', 'searchParams', 'passengerData', 'couponCode', 'couponDiscount', 'couponError', 'termsAgreed']),
    ...mapGetters(useBookingStore, ['orderSummary', 'formattedCountdown', 'isPassengerDataValid']),
  },
  methods: {
    ...mapActions(useBookingStore, ['proceedToPayment', 'updatePassengerData', 'applyCoupon', 'startCountdown', 'stopCountdown', 'setTermsAgreed']),
    updatePassenger(seatId, data) {
      this.updatePassengerData(seatId, data);
    },
    handleProceedToPayment() {
      this.proceedToPayment(this.$router);
    }
  },
  mounted() {
    if (!this.store.selectedSchedule) {
      this.$router.push({ name: 'home' });
      return;
    }
    this.startCountdown();
  },
  unmounted() {
    this.stopCountdown();
  }
}
</script>
