<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Globe, ArrowRight, Menu, X } from 'lucide-vue-next'

const { t, locale } = useI18n()
const mobileMenuOpen = ref(false)

function toggleLocale() {
  locale.value = locale.value === 'id' ? 'en' : 'id'
  localStorage.setItem('syasya_lang', locale.value)
}
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-obsidian-600/70 bg-obsidian-950/85 backdrop-blur-xl">
    <div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
      <!-- Logo -->
      <a href="#" class="group flex shrink-0 items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-growth-600 via-growth-500 to-sky-400 font-mono text-sm font-bold text-white shadow-lg shadow-growth-500/25 transition-transform group-hover:scale-105">
          RS
        </div>
        <div class="flex flex-col">
          <span class="text-base font-extrabold tracking-tight text-white">
            Reynalda<span class="text-growth-400">.growth</span>
          </span>
          <span class="text-[11px] font-medium text-zinc-400">
            SyaSya • Digital Marketing
          </span>
        </div>
      </a>

      <!-- Desktop Nav Items (lg:flex for proper breathing room) -->
      <nav class="hidden items-center gap-7 lg:flex">
        <a href="#chart" class="text-sm font-medium text-zinc-300 transition-colors hover:text-white">
          {{ t('nav.chart') }}
        </a>
        <a href="#deals" class="text-sm font-medium text-zinc-300 transition-colors hover:text-white">
          {{ t('nav.deals') }}
        </a>
        <a href="#ads" class="text-sm font-medium text-zinc-300 transition-colors hover:text-white">
          {{ t('nav.ads') }}
        </a>
        <a href="#pillars" class="text-sm font-medium text-zinc-300 transition-colors hover:text-white">
          {{ t('nav.pillars') }}
        </a>
        <a href="#experience" class="text-sm font-medium text-zinc-300 transition-colors hover:text-white">
          {{ t('nav.experience') }}
        </a>
      </nav>

      <!-- Right Actions: Language Switcher + CTA -->
      <div class="hidden shrink-0 items-center gap-4 lg:flex">
        <!-- Language Switcher -->
        <button
          @click="toggleLocale"
          class="flex items-center gap-2 rounded-full border border-obsidian-600 bg-obsidian-800/90 px-3.5 py-1.5 text-xs font-semibold text-zinc-200 transition-all hover:border-zinc-400 hover:text-white"
          :title="locale === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'"
        >
          <Globe class="h-3.5 w-3.5 text-growth-400" />
          <span>{{ locale.toUpperCase() }}</span>
          <span class="text-[10px] text-zinc-500">|</span>
          <span class="text-zinc-400">{{ locale === 'id' ? 'EN' : 'ID' }}</span>
        </button>

        <!-- CTA Button -->
        <a
          href="#contact"
          class="flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-all hover:bg-zinc-200 hover:shadow-lg hover:shadow-white/10"
        >
          <span>{{ t('nav.contact') }}</span>
          <ArrowRight class="h-4 w-4" />
        </a>
      </div>

      <!-- Mobile Hamburger Button -->
      <div class="flex items-center gap-3 lg:hidden">
        <button
          @click="toggleLocale"
          class="flex items-center gap-1.5 rounded-full border border-obsidian-600 bg-obsidian-800 px-3 py-1 text-xs font-semibold text-zinc-300"
        >
          <Globe class="h-3.5 w-3.5 text-growth-400" />
          <span>{{ locale.toUpperCase() }}</span>
        </button>
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="flex h-10 w-10 items-center justify-center rounded-xl border border-obsidian-600 bg-obsidian-800 text-zinc-300"
          aria-label="Toggle Menu"
        >
          <Menu v-if="!mobileMenuOpen" class="h-5 w-5" />
          <X v-else class="h-5 w-5" />
        </button>
      </div>
    </div>

    <!-- Mobile Drawer Menu -->
    <div v-if="mobileMenuOpen" class="border-b border-obsidian-600 bg-obsidian-950 px-6 py-5 lg:hidden">
      <div class="flex flex-col gap-4">
        <a
          href="#chart"
          @click="mobileMenuOpen = false"
          class="text-sm font-medium text-zinc-300 hover:text-white"
        >
          {{ t('nav.chart') }}
        </a>
        <a
          href="#deals"
          @click="mobileMenuOpen = false"
          class="text-sm font-medium text-zinc-300 hover:text-white"
        >
          {{ t('nav.deals') }}
        </a>
        <a
          href="#ads"
          @click="mobileMenuOpen = false"
          class="text-sm font-medium text-zinc-300 hover:text-white"
        >
          {{ t('nav.ads') }}
        </a>
        <a
          href="#pillars"
          @click="mobileMenuOpen = false"
          class="text-sm font-medium text-zinc-300 hover:text-white"
        >
          {{ t('nav.pillars') }}
        </a>
        <a
          href="#experience"
          @click="mobileMenuOpen = false"
          class="text-sm font-medium text-zinc-300 hover:text-white"
        >
          {{ t('nav.experience') }}
        </a>
        <a
          href="#contact"
          @click="mobileMenuOpen = false"
          class="mt-2 flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black"
        >
          <span>{{ t('nav.contact') }}</span>
          <ArrowRight class="h-4 w-4" />
        </a>
      </div>
    </div>
  </header>
</template>
