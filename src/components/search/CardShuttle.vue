<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-xl">
    <div class="p-4 border-b">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h3 class="text-xl font-bold text-gray-800">{{ shuttle.operator }}</h3>
          <p class="text-sm text-gray-500">{{ shuttle.origin }} → {{ shuttle.destination }}</p>
        </div>
        <p class="text-lg font-semibold text-blue-600 mt-2 md:mt-0">{{ formatCurrency(shuttle.price) }} / kursi</p>
      </div>
    </div>
    <div class="px-4 py-3 bg-gray-50">
      <p class="text-sm font-semibold mb-2 text-gray-700">Pilih Jam Keberangkatan:</p>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="time in shuttle.departures"
          :key="time"
          @click="selectDeparture(time)"
          class="px-3 py-1.5 bg-blue-100 text-blue-800 text-sm font-medium rounded-md hover:bg-blue-600 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {{ time }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardShuttle',
  props: {
    shuttle: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(value);
    },
    selectDeparture(time) {
      this.$emit('select', { ...this.shuttle, selectedTime: time });
    }
  }
}
</script>
