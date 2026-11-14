import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import AOS from 'aos'
import App from './App.vue'
import './style.css'

import id from './locales/id.json'
import en from './locales/en.json'

const savedLocale = localStorage.getItem('syasya_lang') || 'id'

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'id',
  messages: {
    id,
    en
  }
})

const app = createApp(App)
app.use(i18n)
app.mount('#app')

// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 650,
  easing: 'ease-out-cubic',
  once: true,
  offset: 40
})
