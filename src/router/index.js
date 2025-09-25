import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Beranda - Bhisa Shuttle' },
    },
    {
      path: '/pencarian',
      name: 'search',
      component: () => import('../views/SearchView.vue'),
      meta: { title: 'Cari Jadwal Shuttle' },
    },
    {
      path: '/reservasi',
      name: 'reservation',
      component: () => import('../views/ReservationView.vue'),
      meta: { title: 'Detail Reservasi' },
    },
    {
      path: '/pembayaran',
      name: 'payment',
      component: () => import('../views/PaymentView.vue'),
      meta: { title: 'Pembayaran' },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Bhisa Shuttle'
  next()
})

export default router
