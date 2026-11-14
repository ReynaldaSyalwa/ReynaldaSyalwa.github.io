<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Globe, ArrowRight, Menu, X, ArrowUpRight } from 'lucide-vue-next'

const { t, locale } = useI18n()
const mobileMenuOpen = ref(false)

function toggleLocale() {
  locale.value = locale.value === 'id' ? 'en' : 'id'
  localStorage.setItem('syasya_lang', locale.value)
}
</script>

<template>
  <div class="sticky top-0 z-50">
    <!-- Top Announcement Strip (Zendesk Style: Midnight #000000 with Electric Lime link) -->
    <aside class="w-full bg-zendesk-midnight px-4 py-2 text-center text-xs sm:text-sm text-white">
      <div class="mx-auto flex max-w-7xl items-center justify-center gap-2 tracking-zendesk">
        <span class="font-normal text-zinc-300">
          {{ locale === 'id' ? 'Tersedia untuk Performance Marketing & Growth Q1/Q2 2026' : 'Open for Performance Marketing & Growth Projects Q1/Q2 2026' }}
        </span>
        <span class="hidden sm:inline text-zinc-500">•</span>
        <a
          href="#contact"
          class="inline-flex items-center gap-1 font-semibold text-zendesk-lime underline decoration-zendesk-lime underline-offset-4 hover:opacity-90 transition-opacity"
        >
          <span>{{ locale === 'id' ? 'Konsultasi Gratis' : 'Book a Session' }}</span>
          <ArrowUpRight class="h-3.5 w-3.5" />
        </a>
      </div>
    </aside>

    <!-- Main Navigation Bar (Zendesk Style: Pure White #ffffff with 1px border rgba(17,17,13,0.11)) -->
    <header class="w-full border-b border-zendesk-divider bg-zendesk-white/95 backdrop-blur-md">
      <div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
        <!-- Logo (Monochrome Near-Black #11110d) -->
        <a href="#" class="group flex shrink-0 items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-zendesk-forest text-zendesk-lime font-mono text-sm font-bold transition-transform group-hover:scale-105">
            RS
          </div>
          <div class="flex flex-col">
            <span class="text-base font-bold tracking-tight text-zendesk-ink">
              Reynalda<span class="font-medium text-zendesk-stone">.growth</span>
            </span>
            <span class="text-[11px] font-medium text-zendesk-stone tracking-zendesk">
              SyaSya • Digital Marketing
            </span>
          </div>
        </a>

        <!-- Desktop Nav Items -->
        <nav class="hidden items-center gap-8 lg:flex">
          <a
            href="#chart"
            class="text-sm font-medium tracking-zendesk text-zendesk-ink/80 transition-colors hover:text-zendesk-ink"
          >
            {{ t('nav.chart') }}
          </a>
          <a
            href="#deals"
            class="text-sm font-medium tracking-zendesk text-zendesk-ink/80 transition-colors hover:text-zendesk-ink"
          >
            {{ t('nav.deals') }}
          </a>
          <a
            href="#ads"
            class="text-sm font-medium tracking-zendesk text-zendesk-ink/80 transition-colors hover:text-zendesk-ink"
          >
            {{ t('nav.ads') }}
          </a>
          <a
            href="#pillars"
            class="text-sm font-medium tracking-zendesk text-zendesk-ink/80 transition-colors hover:text-zendesk-ink"
          >
            {{ t('nav.pillars') }}
          </a>
          <a
            href="#experience"
            class="text-sm font-medium tracking-zendesk text-zendesk-ink/80 transition-colors hover:text-zendesk-ink"
          >
            {{ t('nav.experience') }}
          </a>
        </nav>

        <!-- Right Actions: Language Switcher + Primary Lime CTA -->
        <div class="hidden shrink-0 items-center gap-4 lg:flex">
          <!-- Language Switcher -->
          <button
            @click="toggleLocale"
            class="flex items-center gap-2 rounded-buttons border border-zendesk-divider bg-zendesk-warm px-3.5 py-2 text-xs font-semibold text-zendesk-ink transition-colors hover:bg-stone-200"
            :title="locale === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'"
          >
            <Globe class="h-3.5 w-3.5 text-zendesk-forest" />
            <span>{{ locale.toUpperCase() }}</span>
            <span class="text-[10px] text-zendesk-stone">|</span>
            <span class="text-zendesk-stone">{{ locale === 'id' ? 'EN' : 'ID' }}</span>
          </button>

          <!-- Primary Lime CTA Button (Zendesk signature: 16px radius, #d1f470 bg, #11110d color, weight 600) -->
          <a
            href="#contact"
            class="inline-flex items-center gap-2 rounded-buttons bg-zendesk-lime px-5 py-2.5 text-sm font-semibold text-zendesk-ink transition-opacity hover:opacity-90"
          >
            <span>{{ t('nav.contact') }}</span>
            <ArrowRight class="h-4 w-4" />
          </a>
        </div>

        <!-- Mobile Hamburger Button -->
        <div class="flex items-center gap-3 lg:hidden">
          <button
            @click="toggleLocale"
            class="flex items-center gap-1.5 rounded-buttons border border-zendesk-divider bg-zendesk-warm px-3 py-1.5 text-xs font-semibold text-zendesk-ink"
          >
            <Globe class="h-3.5 w-3.5 text-zendesk-forest" />
            <span>{{ locale.toUpperCase() }}</span>
          </button>
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="flex h-10 w-10 items-center justify-center rounded-buttons border border-zendesk-divider bg-zendesk-warm text-zendesk-ink"
            aria-label="Toggle Menu"
          >
            <Menu v-if="!mobileMenuOpen" class="h-5 w-5" />
            <X v-else class="h-5 w-5" />
          </button>
        </div>
      </div>

      <!-- Mobile Drawer Menu -->
      <div v-if="mobileMenuOpen" class="border-b border-zendesk-divider bg-zendesk-white px-6 py-5 lg:hidden">
        <div class="flex flex-col gap-4">
          <a
            href="#chart"
            @click="mobileMenuOpen = false"
            class="text-sm font-medium tracking-zendesk text-zendesk-ink/80 hover:text-zendesk-ink"
          >
            {{ t('nav.chart') }}
          </a>
          <a
            href="#deals"
            @click="mobileMenuOpen = false"
            class="text-sm font-medium tracking-zendesk text-zendesk-ink/80 hover:text-zendesk-ink"
          >
            {{ t('nav.deals') }}
          </a>
          <a
            href="#ads"
            @click="mobileMenuOpen = false"
            class="text-sm font-medium tracking-zendesk text-zendesk-ink/80 hover:text-zendesk-ink"
          >
            {{ t('nav.ads') }}
          </a>
          <a
            href="#pillars"
            @click="mobileMenuOpen = false"
            class="text-sm font-medium tracking-zendesk text-zendesk-ink/80 hover:text-zendesk-ink"
          >
            {{ t('nav.pillars') }}
          </a>
          <a
            href="#experience"
            @click="mobileMenuOpen = false"
            class="text-sm font-medium tracking-zendesk text-zendesk-ink/80 hover:text-zendesk-ink"
          >
            {{ t('nav.experience') }}
          </a>
          <a
            href="#contact"
            @click="mobileMenuOpen = false"
            class="mt-2 flex items-center justify-center gap-2 rounded-buttons bg-zendesk-lime px-5 py-3 text-sm font-semibold text-zendesk-ink hover:opacity-90 transition-opacity"
          >
            <span>{{ t('nav.contact') }}</span>
            <ArrowRight class="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  </div>
</template>
