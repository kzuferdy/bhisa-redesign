<template>
  <div class="bg-gray-100 p-4 rounded-lg">
    <div class="bg-white p-4 rounded-md shadow-inner max-w-xs mx-auto">
      <div class="grid grid-cols-4 gap-2 md:gap-4">

        <template v-for="(spot, index) in seatLayout" :key="index">

          <button
            v-if="spot.type === 'seat'"
            @click="toggleSeat(spot.id)"
            :disabled="getSeatStatus(spot.id) === 'booked'"
            :class="[
              'w-full aspect-[4/5] rounded-lg text-sm font-bold flex items-center justify-center transition-colors transform hover:scale-105',
              'bg-no-repeat bg-center bg-contain',
              getSeatStatus(spot.id) === 'available' && 'bg-gray-200 hover:bg-blue-200 text-gray-800',
              getSeatStatus(spot.id) === 'selected' && 'bg-blue-600 text-white ring-2 ring-offset-2 ring-blue-600',
              getSeatStatus(spot.id) === 'booked' && 'bg-red-200 text-red-400 cursor-not-allowed line-through',
            ]"
            :style="{ backgroundImage: `url(${getSeatImage(spot.id)})` }"
          >
            {{ spot.id }}
          </button>

          <div v-else-if="spot.type === 'driver'" class="flex items-center justify-center">
            <svg class="w-10 h-10 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle><line x1="12" y1="2" x2="12" y2="9"></line><line x1="21.17" y1="8" x2="16.24" y2="9.93"></line><line x1="21.17" y1="16" x2="16.24" y2="14.07"></line><line x1="12" y1="22" x2="12" y2="15"></line><line x1="2.83" y1="16" x2="7.76" y2="14.07"></line><line x1="2.83" y1="8" x2="7.76" y2="9.93"></line></svg>
          </div>

          <div v-else-if="spot.type === 'empty'"></div>

        </template>
      </div>
    </div>

    <div class="flex justify-center flex-wrap gap-4 mt-4 text-xs">
      <div class="flex items-center"><span class="w-4 h-4 bg-gray-200 rounded-md mr-2"></span>Tersedia</div>
      <div class="flex items-center"><span class="w-4 h-4 bg-blue-600 rounded-md mr-2"></span>Pilihanmu</div>
      <div class="flex items-center"><span class="w-4 h-4 bg-red-200 rounded-md mr-2"></span>Terisi</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useBookingStore } from '@/stores/bookingStore'

const seatAvailableImg = "https://api.iconify.design/mdi:seat.svg?color=%236b7280";
const seatSelectedImg = "https://api.iconify.design/mdi:seat.svg?color=%23ffffff";
const seatBookedImg = "https://api.iconify.design/mdi:seat-outline.svg?color=%23ef4444";

export default {
  name: 'SeatMap',
  data() {
    return {
      bookedSeats: ['01', '05'],

      seatLayout: [
        { id: '01', type: 'seat' }, { type: 'empty' }, { type: 'empty' }, { type: 'driver' },
        { type: 'empty' }, { id: '02', type: 'seat' }, { id: '03', type: 'seat' }, { type: 'empty' },
        { id: '04', type: 'seat' }, { type: 'empty' }, { id: '05', type: 'seat' }, { type: 'empty' },
        { id: '06', type: 'seat' }, { id: '07', type: 'seat' }, { id: '08', type: 'seat' }, { type: 'empty' },
      ]
    }
  },
  computed: {
    ...mapState(useBookingStore, ['selectedSeats']),
  },
  methods: {
    ...mapActions(useBookingStore, ['toggleSeat']),

    getSeatStatus(seatId) {
      if (this.bookedSeats.includes(seatId)) return 'booked';
      if (this.selectedSeats.includes(seatId)) return 'selected';
      return 'available';
    },

    getSeatImage(seatId) {
        const status = this.getSeatStatus(seatId);
        if (status === 'booked') return seatBookedImg;
        if (status === 'selected') return seatSelectedImg;
        return seatAvailableImg;
    }
  }
}
</script>
