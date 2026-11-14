<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Globe, Menu, X, ArrowUpRight } from 'lucide-vue-next'

const { t, locale } = useI18n()
const mobileMenuOpen = ref(false)

function toggleLocale() {
  locale.value = locale.value === 'id' ? 'en' : 'id'
  localStorage.setItem('syasya_lang', locale.value)
}
</script>

<template>
  <header class="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-zinc-200/80 transition-all shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
    <!-- Top Utility Bar: Specialty & Social Links Left, Contact & Lang Right (Replaces media0) -->
    <div class="border-b border-zinc-100/90 py-2 px-6 sm:px-10">
      <div class="mx-auto max-w-5xl flex items-center justify-between gap-4">
        <!-- Left: Specialty & Social Profile Links -->
        <div class="flex items-center gap-3 sm:gap-4 overflow-x-auto text-[11px] font-mono">
          <!-- Specialty badge (responsive text on mobile) -->
          <span class="font-semibold text-zinc-900 whitespace-nowrap text-[10px] sm:text-[11px]">
            <span class="sm:hidden">Growth Specialist</span>
            <span class="hidden sm:inline">{{ t('nav.specialty') }}</span>
          </span>

          <span class="text-zinc-300 hidden sm:inline">•</span>

          <!-- LinkedIn Link -->
          <a
            href="https://www.linkedin.com/in/reynalda-vonna-syalwa-77359b279/"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1 text-zinc-600 hover:text-black transition-colors whitespace-nowrap"
          >
            <span>LinkedIn</span>
            <ArrowUpRight class="h-3 w-3 text-zinc-400" />
          </a>

          <span class="text-zinc-300">•</span>

          <!-- Instagram Link -->
          <a
            href="https://www.instagram.com/sylwa__/"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1 text-zinc-600 hover:text-black transition-colors whitespace-nowrap"
          >
            <span>Instagram</span>
            <ArrowUpRight class="h-3 w-3 text-zinc-400" />
          </a>
        </div>

        <!-- Right: Action CTA & Language Toggle -->
        <div class="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            class="hidden sm:inline-flex items-center justify-center rounded-full bg-black px-4 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-85"
          >
            {{ t('nav.contact_btn') }}
          </a>

          <!-- Language Switcher -->
          <button
            @click="toggleLocale"
            class="flex items-center gap-1.5 text-xs font-medium text-zinc-600 hover:text-black transition-colors"
            :title="locale === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'"
          >
            <Globe class="h-3.5 w-3.5 text-zinc-400" />
            <span class="tracking-wide font-mono font-semibold">{{ locale.toUpperCase() }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Navigation Bar: Brand Name (R.V. SYALWA) Left + Dynamic Nav Links Right (media3) -->
    <div class="py-3.5 sm:py-4 px-6 sm:px-10">
      <div class="mx-auto max-w-5xl flex items-center justify-between">
        <!-- Brand Name: Pure Typography R.V. SYALWA (No logo/icon per media3 request) -->
        <a href="#" class="text-xs sm:text-[14px] font-bold tracking-tracked uppercase text-zinc-900 hover:text-black transition-colors">
          R.V. SYALWA
        </a>

        <!-- Desktop Nav Links (Fully synced with ID / EN) -->
        <nav class="hidden md:flex items-center gap-8 text-[11px] font-medium tracking-tracked uppercase text-zinc-600">
          <a href="#ads" class="hover:text-black transition-colors">
            {{ t('nav.campaigns') }}
          </a>
          <a href="#chart" class="hover:text-black transition-colors">
            {{ t('nav.analytics') }}
          </a>
          <a href="#deals" class="hover:text-black transition-colors">
            {{ t('nav.deals') }}
          </a>
          <a href="#about" class="hover:text-black transition-colors">
            {{ t('nav.about') }}
          </a>
          <a href="#contact" class="hover:text-black transition-colors">
            {{ t('nav.contact') }}
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

    <!-- Mobile Drawer Menu (Fully synced with ID / EN) -->
    <div v-if="mobileMenuOpen" class="border-t border-zinc-100 bg-white px-6 py-4 md:hidden">
      <div class="flex flex-col gap-3 text-xs tracking-tracked uppercase text-zinc-700 font-medium">
        <a href="#ads" @click="mobileMenuOpen = false" class="py-1 hover:text-black">
          {{ t('nav.campaigns') }}
        </a>
        <a href="#chart" @click="mobileMenuOpen = false" class="py-1 hover:text-black">
          {{ t('nav.analytics') }}
        </a>
        <a href="#deals" @click="mobileMenuOpen = false" class="py-1 hover:text-black">
          {{ t('nav.deals') }}
        </a>
        <a href="#about" @click="mobileMenuOpen = false" class="py-1 hover:text-black">
          {{ t('nav.about') }}
        </a>
        <a href="#contact" @click="mobileMenuOpen = false" class="py-1 hover:text-black">
          {{ t('nav.contact') }}
        </a>
        <a
          href="#contact"
          @click="mobileMenuOpen = false"
          class="mt-2 inline-flex items-center justify-center rounded-full bg-black py-2 text-center text-xs text-white"
        >
          {{ t('nav.contact_btn') }}
        </a>
      </div>
    </div>
  </header>
</template>
