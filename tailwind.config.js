/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Di sini kita bisa nambahin custom font, warna, dll
      // Sesuai dengan brand Bhisa Shuttle
    },
    container: {
      center: true,
      padding: '1rem', // Default padding untuk container
      screens: {
        '2xl': '1280px', // Max-width sesuai brief
      },
    },
  },
  plugins: [],
}
