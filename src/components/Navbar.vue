<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Search, Globe, Menu, X, ArrowUpRight } from 'lucide-vue-next'

const { t, locale } = useI18n()
const mobileMenuOpen = ref(false)
const searchSkillsQuery = ref('')

function toggleLocale() {
  locale.value = locale.value === 'id' ? 'en' : 'id'
  localStorage.setItem('syasya_lang', locale.value)
}

function handleSearchFocus() {
  const target = document.getElementById('work') || document.getElementById('ads')
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <header class="w-full bg-white text-zinc-900 border-b border-zinc-100">
    <!-- Top Utility Bar: Search pill & Action CTA matching screenshot -->
    <div class="border-b border-zinc-100/80 py-2.5 px-6 sm:px-10">
      <div class="mx-auto max-w-5xl flex items-center justify-between gap-4">
        <!-- Search Pill -->
        <div class="relative w-full max-w-xs sm:max-w-sm">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
          <input
            v-model="searchSkillsQuery"
            type="text"
            @focus="handleSearchFocus"
            :placeholder="locale === 'id' ? 'Search Skills / Meta Ads...' : 'Search Skills / Case Studies...'"
            class="w-full rounded-full border border-zinc-200/90 bg-white py-1.5 pl-8 pr-3 text-xs text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors"
          />
        </div>

        <!-- Right Utility Actions: Black Pill CTA & Language Toggle -->
        <div class="flex items-center gap-3">
          <a
            href="#contact"
            class="hidden sm:inline-flex items-center justify-center rounded-full bg-black px-4 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-85"
          >
            {{ locale === 'id' ? 'Hubungi SyaSya' : 'Submit Portfolio' }}
          </a>

          <!-- Language Switcher -->
          <button
            @click="toggleLocale"
            class="flex items-center gap-1.5 text-xs font-medium text-zinc-600 hover:text-black transition-colors"
            :title="locale === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'"
          >
            <Globe class="h-3.5 w-3.5 text-zinc-400" />
            <span class="tracking-wide">{{ locale.toUpperCase() }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Navigation Bar: Brand Name Left + Nav Links Right -->
    <div class="py-5 px-6 sm:px-10">
      <div class="mx-auto max-w-5xl flex items-center justify-between">
        <!-- Brand Name (Uppercase tracked out) -->
        <a href="#" class="text-xs sm:text-[13px] font-semibold tracking-tracked uppercase text-zinc-800 hover:text-black transition-colors">
          REYNALDA SYALWA
        </a>

        <!-- Desktop Nav Links -->
        <nav class="hidden md:flex items-center gap-8 text-[11px] font-medium tracking-tracked uppercase text-zinc-600">
          <a href="#work" class="hover:text-black transition-colors">
            WORK
          </a>
          <a href="#chart" class="hover:text-black transition-colors">
            ANALYTICS
          </a>
          <a href="#experience" class="hover:text-black transition-colors">
            ABOUT
          </a>
          <a href="#contact" class="hover:text-black transition-colors">
            CONTACT
          </a>
        </nav>

        <!-- Mobile Menu Toggle -->
        <div class="flex items-center gap-2 md:hidden">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="flex h-8 w-8 items-center justify-center text-zinc-700"
            aria-label="Toggle Navigation Menu"
          >
            <Menu v-if="!mobileMenuOpen" class="h-5 w-5" />
            <X v-else class="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Drawer Menu -->
    <div v-if="mobileMenuOpen" class="border-t border-zinc-100 bg-white px-6 py-4 md:hidden">
      <div class="flex flex-col gap-3 text-xs tracking-tracked uppercase text-zinc-700 font-medium">
        <a href="#work" @click="mobileMenuOpen = false" class="py-1 hover:text-black">WORK</a>
        <a href="#chart" @click="mobileMenuOpen = false" class="py-1 hover:text-black">ANALYTICS</a>
        <a href="#experience" @click="mobileMenuOpen = false" class="py-1 hover:text-black">ABOUT</a>
        <a href="#contact" @click="mobileMenuOpen = false" class="py-1 hover:text-black">CONTACT</a>
        <a
          href="#contact"
          @click="mobileMenuOpen = false"
          class="mt-2 inline-flex items-center justify-center rounded-full bg-black py-2 text-center text-xs text-white"
        >
          {{ locale === 'id' ? 'Hubungi SyaSya' : 'Submit Portfolio' }}
        </a>
      </div>
    </div>
  </header>
</template>
