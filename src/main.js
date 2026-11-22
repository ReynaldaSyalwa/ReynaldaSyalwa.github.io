import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import AOS from 'aos'
import App from './App.vue'
import './style.css'

import id from './locales/id.json'
import en from './locales/en.json'

const savedLocale = localStorage.getItem('syasya_lang') || 'id'
document.documentElement.lang = savedLocale

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'id',
  messages: { id, en },
})

const app = createApp(App)
app.use(i18n)
app.mount('#app')

// AOS — animasi saat scroll.
// once: true -> animasi hanya sekali, tidak flicker waktu scroll naik
// disable    -> hormati prefers-reduced-motion
AOS.init({
  duration: 700,
  easing: 'ease-out-cubic',
  once: true,
  offset: 60,
  delay: 0,
  anchorPlacement: 'top-bottom',
  disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
})

// Hitung ulang posisi setelah font & gambar selesai dimuat, supaya elemen
// yang tingginya berubah tidak terlewat animasinya.
window.addEventListener('load', () => AOS.refresh())

// Setiap ganti bahasa, tinggi konten berubah -> refresh posisi AOS.
const observer = new MutationObserver(() => AOS.refresh())
observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] })
