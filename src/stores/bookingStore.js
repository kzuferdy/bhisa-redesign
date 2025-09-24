import { defineStore } from 'pinia'
import axios from 'axios'

// Helper untuk format harga
const formatCurrency = (value) => {
  if (typeof value !== 'number') return ''
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value)
}

export const useBookingStore = defineStore('booking', {
  state: () => ({
    searchParams: {},
    shuttleResults: [],
    isLoading: false,
    error: null,
    selectedSchedule: null,
    selectedSeats: [],
    passengerData: {},
    couponCode: '',
    couponDiscount: 0,
    couponError: null,
    countdown: 600,
    timerId: null,
    isPaid: false,
    bookingCode: null,
    activeFilters: {
      operators: [],
    },
    isFilterDrawerOpen: false,
    activeSort: 'recommended',
    paymentCountdown: 300,
    paymentTimerId: null,
    toasts: [],
    termsAgreed: false,
  }),
  getters: {
    formattedPaymentCountdown(state) {
      const minutes = Math.floor(state.paymentCountdown / 60)
      const seconds = state.paymentCountdown % 60
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    },
    orderSummary(state) {
      if (!state.selectedSchedule) return null
      const pricePerSeat = state.selectedSchedule.price
      const totalSeats = state.selectedSeats.length
      const subtotal = pricePerSeat * totalSeats
      const total = subtotal - state.couponDiscount
      return {
        operator: state.selectedSchedule.operator,
        origin: state.selectedSchedule.origin,
        destination: state.selectedSchedule.destination,
        date: state.searchParams.tgl,
        time: state.selectedSchedule.selectedTime,
        pricePerSeatFormatted: formatCurrency(pricePerSeat),
        totalSeats,
        subtotalFormatted: formatCurrency(subtotal),
        discountFormatted: formatCurrency(state.couponDiscount),
        totalFormatted: formatCurrency(total),
      }
    },
    formattedCountdown(state) {
      const minutes = Math.floor(state.countdown / 60)
      const seconds = state.countdown % 60
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    },
    isPassengerDataValid(state) {
      if (state.selectedSeats.length === 0) return false
      return state.selectedSeats.every((seatId) => {
        const passenger = state.passengerData[seatId]
        return passenger && passenger.name && passenger.name.trim() !== ''
      })
    },
    availableOperators(state) {
      if (!state.shuttleResults) return []
      const operators = state.shuttleResults.map((shuttle) => shuttle.operator)
      return [...new Set(operators)] // -> Menghasilkan array unik, misal: ['Blue Shuttle', 'Red Trans']
    },

    // GETTER PALING PENTING: Menampilkan hasil yang sudah difilter
    filteredShuttleResults(state) {
      let results = [...state.shuttleResults]

      // 1. Logika Filter (tetap sama)
      if (state.activeFilters.operators.length > 0) {
        results = results.filter((shuttle) =>
          state.activeFilters.operators.includes(shuttle.operator),
        )
      }

      // 2. LOGIKA SORTING BARU!
      switch (state.activeSort) {
        case 'harga-termurah':
          results.sort((a, b) => a.price - b.price)
          break
        case 'harga-termahal':
          results.sort((a, b) => b.price - a.price)
          break
        case 'jam-terawal':
          // Kita ambil jam pertama dari array departures untuk perbandingan
          results.sort((a, b) => a.departures[0].localeCompare(b.departures[0]))
          break
        default:
          // Biarkan urutan asli jika 'recommended' atau lainnya
          break
      }

      return results
    },
  },
  actions: {
    async fetchShuttles(params) {
      this.isLoading = true
      this.error = null
      this.shuttleResults = []
      this.activeFilters = { operators: [] }
      this.searchParams = params
      try {
        const response = await axios.get('/data/shuttles.json')
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const results = response.data.schedules.filter(
          (s) =>
            s.origin.toLowerCase() === params.dari.toLowerCase() &&
            s.destination.toLowerCase() === params.ke.toLowerCase(),
        )
        if (results.length === 0) {
          this.error = 'Yah, gak ada jadwal shuttle untuk rute ini.'
        } else {
          this.shuttleResults = results
        }
      } catch {
        this.error = 'Waduh, ada masalah jaringan. Coba lagi nanti.'
      } finally {
        this.isLoading = false
      }
    },
    startPaymentCountdown() {
      if (this.paymentTimerId) clearInterval(this.paymentTimerId)
      this.paymentCountdown = 300 // Reset ke 5 menit
      this.paymentTimerId = setInterval(() => {
        if (this.paymentCountdown > 0) {
          this.paymentCountdown--
        } else {
          clearInterval(this.paymentTimerId)
        }
      }, 1000)
    },

    stopPaymentCountdown() {
      if (this.paymentTimerId) clearInterval(this.paymentTimerId)
    },
    setTermsAgreed(value) {
      this.termsAgreed = value
    },
    selectScheduleAndProceed(scheduleData, router) {
      this.selectedSchedule = scheduleData
      this.selectedSeats = []
      this.termsAgreed = false
      this.passengerData = {}
      router.push({ name: 'reservation' })
    },
    toggleSeat(seatId) {
      const seatIndex = this.selectedSeats.indexOf(seatId)
      const maxSeats = this.searchParams.kursi || 1
      if (seatIndex > -1) {
        this.selectedSeats.splice(seatIndex, 1)
        delete this.passengerData[seatId]
      } else {
        if (this.selectedSeats.length < maxSeats) {
          this.selectedSeats.push(seatId)
        } else {
          this.addToast({ message: `Anda hanya bisa memilih ${maxSeats} kursi.`, type: 'error' })
        }
      }
    },
    updatePassengerData(seatId, data) {
      if (!this.passengerData[seatId]) {
        this.passengerData[seatId] = { name: '', phone: '' }
      }
      this.passengerData[seatId] = { ...this.passengerData[seatId], ...data }
    },
    applyCoupon() {
      // this.couponError = null; // -> Baris ini bisa dihapus
      this.couponDiscount = 0
      if (this.couponCode.toUpperCase() === 'HEMAT30') {
        const subtotal = this.selectedSchedule.price * this.selectedSeats.length
        this.couponDiscount = subtotal * 0.3
        // Kasih feedback sukses!
        this.addToast({ message: 'Kupon berhasil digunakan!', type: 'success' })
      } else if (this.couponCode.trim() !== '') {
        // GANTI BARIS INI:
        // this.couponError = 'Kode kupon tidak valid.';
        // MENJADI INI:
        this.addToast({ message: 'Kode kupon tidak valid.', type: 'error' })
      }
    },
    startCountdown() {
      if (this.timerId) {
        clearInterval(this.timerId)
      }
      this.countdown = 600
      this.timerId = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--
        } else {
          clearInterval(this.timerId)
          this.addToast({ message: 'Waktu reservasi habis!', type: 'error', duration: 5000 })
        }
      }, 1000)
    },
    stopCountdown() {
      if (this.timerId) {
        clearInterval(this.timerId)
      }
    },
    proceedToPayment(router) {
      if (this.selectedSeats.length === 0) {
        this.addToast({ message: 'Silakan pilih minimal 1 kursi.', type: 'error' })
        return
      }
      if (!this.termsAgreed) {
        this.addToast({ message: 'Anda harus menyetujui Syarat & Ketentuan.', type: 'error' })
        return
      }
      if (!this.isPassengerDataValid) {
        this.addToast({ message: 'Nama penumpang wajib diisi.', type: 'error' })
        return
      }
      ;(this.stopCountdown(), this.startPaymentCountdown())
      router.push({ name: 'payment' })
    },
    confirmPayment() {
      this.isPaid = true
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      let result = 'BHS-'
      for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
      }
      this.bookingCode = result
    },
    updateFilters(newFilters) {
      this.activeFilters = { ...this.activeFilters, ...newFilters }
    },
    openFilterDrawer() {
      this.isFilterDrawerOpen = true
    },
    closeFilterDrawer() {
      this.isFilterDrawerOpen = false
    },
    updateSort(sortValue) {
      this.activeSort = sortValue
    },
    addToast({ message, type = 'info', duration = 3000 }) {
      const id = Date.now()
      // Tambahkan toast baru ke awal array biar muncul di atas
      this.toasts.unshift({ id, message, type })

      // Set timer untuk hapus toast otomatis
      setTimeout(() => {
        this.removeToast(id)
      }, duration)
    },

    removeToast(id) {
      this.toasts = this.toasts.filter((toast) => toast.id !== id)
    },
  },
})
