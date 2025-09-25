# Bhisa Shuttle - Redesain Frontend (Submission Tugas)

Selamat datang di repositori proyek redesain frontend untuk Bhisa Shuttle. Proyek ini adalah sebuah Single Page Application (SPA) yang dibangun untuk memenuhi tugas seleksi, dengan fokus pada alur pemesanan tiket dari Beranda hingga Pembayaran.

## Tautan Demo Langsung

[Demo di Vercel](https://your-demo-link.vercel.app)

## Ringkasan Tugas

Tugas utama adalah meredesain alur **Beranda → Pencarian → Reservasi → Pembayaran** dengan pendekatan desktop-first yang responsif. Proyek ini dibangun sepenuhnya sebagai aplikasi frontend tanpa backend, di mana data diambil dari file `shuttles.json` statis.

## Tampilan Aplikasi

> Disarankan untuk menambahkan screenshot aplikasi Anda di sini. Ini sangat membantu untuk memberikan gambaran visual.

<img width="1583" height="729" alt="image" src="https://github.com/user-attachments/assets/9cc1a9fe-9756-4723-9d1e-63592a040d7a" />


## Teknologi yang Digunakan

- **Framework:** Vue.js 3 (dengan Options API)
- **Routing:** Vue Router
- **State Management:** Pinia
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **HTTP Client:** Axios (untuk fetch data dari file JSON)
- **Linting & Formatting:** ESLint & Prettier

## Fitur Utama

### Alur Pemesanan Lengkap
Dari pencarian jadwal hingga konfirmasi pembayaran dengan kode booking.

### Pencarian & Penyaringan Dinamis
- Pencarian berdasarkan rute dan tanggal
- Filter hasil berdasarkan operator shuttle
- Urutkan hasil berdasarkan harga (termurah/termahal) dan jam keberangkatan (terawal)

### Desain Responsif
- Layout desktop-first dengan grid 12 kolom
- Sidebar filter yang berubah menjadi drawer di tampilan mobile
- Navigasi yang disesuaikan untuk layar kecil, termasuk tombol kembali dan "Ubah Pencarian"

### State Management Terpusat
Semua state booking (pilihan jadwal, kursi, data penumpang, kupon) dikelola oleh Pinia, memastikan data konsisten antar halaman.

### Peta Kursi Interaktif
Pengguna dapat memilih dan membatalkan pilihan kursi secara visual (dibangun murni dengan HTML & CSS Grid, tanpa canvas).

### Validasi Real-time
Form data penumpang memberikan feedback error secara langsung saat pengguna mengetik (misal: nama tidak boleh hanya spasi).

### Fitur UX Modern
- Notifikasi Toast untuk feedback (sukses/error) tanpa menggunakan `alert()` yang mengganggu
- Skeleton Loading saat mengambil data untuk pengalaman pengguna yang lebih baik
- Pengaman double-click pada tombol-tombol krusial untuk mencegah aksi ganda
- Countdown timer di halaman reservasi dan pembayaran untuk menciptakan urgensi


## Struktur Folder

Proyek ini mengikuti struktur standar yang disediakan oleh `create-vue`, dengan beberapa penyesuaian untuk skalabilitas.

```
/src
├── assets/          # File CSS global (main.css)
├── components/      # Komponen UI yang dapat digunakan kembali
│   ├── global/      # Komponen global (Navbar, Footer, Toast)
│   ├── payment/     # Komponen khusus halaman pembayaran
│   ├── reservation/ # Komponen khusus halaman reservasi
│   └── search/      # Komponen khusus halaman pencarian
├── router/          # Konfigurasi routing (index.js)
├── stores/          # File state management Pinia (bookingStore.js)
├── views/           # Komponen halaman utama (HomeView, SearchView, dll.)
├── App.vue          # Komponen root aplikasi
└── main.js          # Titik masuk utama aplikasi
```

## Cara Menjalankan Proyek

1. **Clone repositori ini:**
   ```bash
   git clone https://github.com/username-anda/nama-repo.git
   cd nama-repo
   ```

2. **Install semua dependency:**
   ```bash
   npm install
   ```

3. **Jalankan server development:**
   ```bash
   npm run dev
   ```

   Aplikasi akan berjalan di `http://localhost:5173`.

## Keputusan & Asumsi Teknis

### Data Backend
Karena tidak ada backend, data jadwal shuttle disimulasikan melalui file statis di `public/data/shuttles.json`. `axios` digunakan untuk mengambil data ini.

### Simulasi Latensi
`setTimeout` selama 1 detik ditambahkan pada proses fetch data untuk mensimulasikan network latency dan menampilkan state skeleton loading dengan lebih jelas.

### Penanganan Network Error
Pengguna diberikan tombol "Coba Lagi" jika terjadi kegagalan saat mengambil data, memungkinkan mereka untuk mengulang request tanpa harus me-refresh halaman.

### Kode Booking
Kode booking dibuat secara acak di sisi client setelah pembayaran "dikonfirmasi", karena tidak ada server untuk menggenerasinya.

### State UI di Pinia
State untuk UI yang sifatnya global, seperti status buka/tutup drawer filter, sengaja disimpan di Pinia untuk mempermudah manajemen state antar komponen yang terpisah.

### Options API
Sesuai permintaan, seluruh komponen Vue.js ditulis menggunakan Options API.
