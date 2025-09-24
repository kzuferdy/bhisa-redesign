<template>
  <footer class="bg-gray-800 text-white">
    <div class="container mx-auto py-8 px-4 sm:px-6">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <!-- Kolom 1: Tentang -->
        <div>
          <h3 class="text-lg font-bold mb-4">BhisaShuttle</h3>
          <ul class="space-y-2 text-sm text-gray-300">
            <li><a href="#" class="hover:text-white">Tentang Kami</a></li>
            <li><a href="#" class="hover:text-white">Karir</a></li>
            <li><a href="#" class="hover:text-white">Press</a></li>
          </ul>
        </div>
        <!-- Kolom 2: Produk -->
        <div>
          <h3 class="text-lg font-bold mb-4">Produk</h3>
          <ul class="space-y-2 text-sm text-gray-300">
            <li><a href="#" class="hover:text-white">Shuttle Antar Kota</a></li>
            <li><a href="#" class="hover:text-white">Sewa Mobil</a></li>
            <li><a href="#" class="hover:text-white">Paket Wisata</a></li>
          </ul>
        </div>
        <!-- Kolom 3: Bantuan -->
        <div>
          <h3 class="text-lg font-bold mb-4">Bantuan</h3>
          <ul class="space-y-2 text-sm text-gray-300">
            <li><a href="#" class="hover:text-white">FAQ</a></li>
            <li><a href="#" class="hover:text-white">Syarat & Ketentuan</a></li>
            <li><a href="#" class="hover:text-white">Hubungi Kami</a></li>
          </ul>
        </div>
        <!-- Kolom 4: Social Media -->
        <div>
          <h3 class="text-lg font-bold mb-4">Ikuti Kami</h3>
           <div class="flex space-x-4">
              <!-- Ikon SVG sederhana -->
              <a href="#" class="text-gray-300 hover:text-white"><svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.494v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.323-1.325z"></path></svg></a>
              <a href="#" class="text-gray-300 hover:text-white"><svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.585.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.644-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"></path></svg></a>
           </div>
        </div>
      </div>
      <div class="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        <p>&copy; 2025 BhisaShuttle. Hak Cipta Dilindungi.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>
