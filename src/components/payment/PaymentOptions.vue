<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <div class="space-y-4">
      <!-- Kita loop daftar metode pembayaran -->
      <div v-for="method in paymentMethods" :key="method.id">
        <button
          @click="activeMethod = method.id"
          class="w-full text-left p-4 border rounded-lg flex justify-between items-center"
          :class="{ 'bg-blue-50 border-blue-500': activeMethod === method.id }"
        >
          <span class="font-bold">{{ method.name }}</span>
          <!-- Ikon panah -->
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="transition-transform" :class="{ 'rotate-180': activeMethod === method.id }"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>

        <!-- Detail Pembayaran (muncul jika aktif) -->
        <div v-if="activeMethod === method.id" class="p-4 border border-t-0 rounded-b-lg">
          <p class="text-sm text-gray-500">Nomor Virtual Account</p>
          <div class="flex items-center justify-between my-2">
            <p class="text-xl font-mono font-bold">{{ method.va_number }}</p>
            <button @click="copyToClipboard(method.va_number, method.id)" class="px-3 py-1 text-sm font-semibold text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200">
              {{ copyStatus[method.id] ? 'Tersalin!' : 'Salin' }}
            </button>
          </div>
          <hr class="my-4">
          <!-- Accordion Tutorial -->
          <div>
            <button @click="toggleAccordion('how_to_pay')" class="w-full flex justify-between items-center text-left font-semibold">
              <span>Cara Pembayaran</span>
              <span>+</span>
            </button>
            <div v-if="openAccordion === 'how_to_pay'" class="mt-2 text-sm text-gray-600 prose">
              <ol>
                <li>Buka aplikasi BCA Mobile.</li>
                <li>Pilih menu m-Transfer.</li>
                <li>Pilih BCA Virtual Account.</li>
                <li>Masukkan nomor Virtual Account di atas.</li>
                <li>Pastikan detail pembayaran sudah benar, lalu konfirmasi.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentOptions',
  data() {
    return {
      activeMethod: 'bca_va', // -> Default yg aktif
      openAccordion: null,
      copyStatus: {},
      paymentMethods: [
        { id: 'bca_va', name: 'Virtual Account BCA', va_number: '1234 5678 9101 1121' },
        // Nanti bisa tambah metode lain di sini
      ]
    }
  },
  methods: {
    toggleAccordion(id) {
      this.openAccordion = this.openAccordion === id ? null : id;
    },
    copyToClipboard(text, id) {
      // Trik untuk copy ke clipboard
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);

      // Kasih feedback visual ke user
      this.copyStatus[id] = true;
      setTimeout(() => {
        this.copyStatus[id] = false;
      }, 2000); // -> Reset setelah 2 detik
    }
  }
}
</script>
