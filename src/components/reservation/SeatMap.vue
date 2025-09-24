<template>
  <div class.vue="bg-gray-100 p-4 rounded-lg">
    <div class="bg-white p-2 rounded-md shadow-inner">
      <div class="grid grid-cols-5 gap-2">
        <template v-for="seat in seats" :key="seat.id">
          <div v-if="seat.isAisle" class="col-span-1"></div>
          <button
            v-else
            @click="toggleSeat(seat.id)"
            :disabled="seat.status === 'booked'"
            :class="[
              'w-full aspect-square rounded-md text-xs font-semibold flex items-center justify-center transition-colors',
              seat.status === 'available' && 'bg-gray-200 hover:bg-blue-200 text-gray-600',
              seat.status === 'selected' && 'bg-blue-600 text-white ring-2 ring-offset-2 ring-blue-600',
              seat.status === 'booked' && 'bg-red-200 text-red-500 cursor-not-allowed line-through',
            ]"
          >
            {{ seat.id }}
          </button>
        </template>
      </div>
    </div>
    <div class="flex justify-around mt-4 text-xs">
      <div class="flex items-center"><span class="w-4 h-4 bg-gray-200 rounded-full mr-2"></span>Tersedia</div>
      <div class="flex items-center"><span class="w-4 h-4 bg-blue-600 rounded-full mr-2"></span>Pilihanmu</div>
      <div class="flex items-center"><span class="w-4 h-4 bg-red-200 rounded-full mr-2"></span>Terisi</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useBookingStore } from '../../stores/bookingStore'

export default {
  name: 'SeatMap',
  data() {
    return {
      bookedSeats: ['1D', '3B', '4A'],
    }
  },
  computed: {
    ...mapState(useBookingStore, ['selectedSeats']),
    seats() {
      const layout = [];
      const rows = ['1', '2', '3', '4'];
      const cols = ['A', 'B', 'C', 'D', 'E']; // C adalah gang

      rows.forEach(row => {
        cols.forEach(col => {
          const seatId = row + col;
          if (col === 'C') {
            layout.push({ id: seatId, isAisle: true });
            return;
          }
          let status = 'available';
          if (this.bookedSeats.includes(seatId)) {
            status = 'booked';
          } else if (this.selectedSeats.includes(seatId)) {
            status = 'selected';
          }
          layout.push({ id: seatId, status: status, isAisle: false });
        });
      });
      return layout;
    }
  },
  methods: {
    ...mapActions(useBookingStore, ['toggleSeat']),
  }
}
</script>
