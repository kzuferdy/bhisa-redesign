<template>
  <main class="bg-gray-50 py-8 md:py-12 min-h-screen">
    <div class="container mx-auto">
       <div v-if="!isPaid" class="px-4 sm:px-0 mb-6">
        <button @click="$router.back()" class="flex items-center gap-2 text-gray-600 hover:text-black font-semibold">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Kembali ke Detail Reservasi
        </button>
      </div>

      <div v-if="isPaid && bookingCode" class="max-w-2xl mx-auto text-center bg-white p-8 rounded-lg shadow-lg">
        <h1 class="text-3xl font-bold text-green-600 mb-4">Pembayaran Berhasil!</h1>
        <p class="text-gray-600 mb-6">E-tiket Anda telah dikirim ke email. Simpan kode booking Anda.</p>
        <div class="bg-gray-100 border-2 border-dashed border-gray-300 p-4 rounded-lg">
          <p class="text-sm text-gray-500 uppercase">Kode Booking</p>
          <p class="text-4xl font-mono font-bold tracking-widest text-gray-800">{{ bookingCode }}</p>
        </div>
        <button @click="$router.push({ name: 'home' })" class="mt-8 w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700">Pesan Lagi</button>
      </div>

      <div v-else class="grid grid-cols-12 gap-6 lg:gap-8">
        <div class="col-span-12 lg:col-span-8">
          <h1 class="text-3xl font-bold mb-6">Pilih Metode Pembayaran</h1>
          <PaymentOptions />
        </div>

        <div class="col-span-12 lg:col-span-4">
          <div class="sticky top-8">
            <div class="bg-white p-6 rounded-lg shadow-md">
              <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center mb-4">
                <p class="font-bold text-lg">{{ formattedPaymentCountdown }}</p>
                <p class="text-xs">Selesaikan pembayaran sebelum waktu habis</p>
              </div>
              <h2 class="text-xl font-semibold border-b pb-4 mb-4">Ringkasan Pesanan</h2>
              <div v-if="orderSummary" class="space-y-2 text-sm">
                <div class="flex justify-between"><span class="text-gray-600">Total Bayar</span> <span class="font-bold text-lg">{{ orderSummary.totalFormatted }}</span></div>
              </div>
              <button @click="handleConfirmPayment" class="mt-6 w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700">Konfirmasi Pembayaran</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'pinia'
import { useBookingStore } from '@/stores/bookingStore'
import PaymentOptions from '@/components/payment/PaymentOptions.vue'

export default {
  name: 'PaymentView',
  components: { PaymentOptions },
  computed: {
    ...mapState(useBookingStore, ['isPaid', 'bookingCode']),
    ...mapGetters(useBookingStore, ['orderSummary', 'formattedPaymentCountdown']),
  },
  methods: {
    ...mapActions(useBookingStore, [
      'confirmPayment',
      'startPaymentCountdown',
      'stopPaymentCountdown'
    ]),

    handleConfirmPayment() {
      this.confirmPayment();
    }
  },
  mounted() {
    const store = useBookingStore();
    if (store.selectedSeats.length === 0 && !store.isPaid) {
      this.$router.push({ name: 'home' });
      return;
    }
    if(!store.isPaid) {
      this.startPaymentCountdown();
    }
  },
  unmounted() {
    this.stopPaymentCountdown();
  }
}
</script>
