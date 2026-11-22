<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Menu, X, ArrowUpRight } from 'lucide-vue-next'

const { t, locale } = useI18n()
const open = ref(false)

const links = [
  { href: '#about', key: 'nav.about' },
  { href: '#experience', key: 'nav.experience' },
  { href: '#skills', key: 'nav.skills' },
  { href: '#work', key: 'nav.work' },
  { href: '#brand', key: 'nav.brand' },
  { href: '#growth', key: 'nav.growth' },
  { href: '#ads', key: 'nav.ads' },
]

function toggleLocale() {
  locale.value = locale.value === 'id' ? 'en' : 'id'
  localStorage.setItem('syasya_lang', locale.value)
  document.documentElement.lang = locale.value
}
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-ink/8 bg-cream/85 backdrop-blur-md">
    <div class="mx-auto flex h-14 max-w-shell items-center justify-between px-5 sm:h-16 sm:px-8">
      <!-- Brand -->
      <a href="#top" class="font-display text-[13px] font-extrabold uppercase tracking-wide2 text-ink sm:text-sm">
        R.V. Syalwa
      </a>

      <!-- Desktop nav -->
      <nav class="hidden items-center gap-6 text-[12.5px] font-medium text-ink/65 lg:flex">
        <a
          v-for="l in links"
          :key="l.href"
          :href="l.href"
          class="transition-colors hover:text-ink"
        >{{ t(l.key) }}</a>
      </nav>

      <div class="flex items-center gap-3">
        <!-- Lang -->
        <button
          type="button"
          class="rounded-pill border border-ink/15 px-3 py-1.5 text-[11px] font-bold tracking-wide2 text-ink/70 transition-colors hover:border-ink/35 hover:text-ink"
          :aria-label="locale === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'"
          @click="toggleLocale"
        >{{ t('common.lang_switch') }}</button>

        <!-- CTA -->
        <a
          href="#contact"
          class="hidden items-center gap-1.5 rounded-pill bg-ink px-4 py-2 text-[12px] font-semibold text-white transition-opacity hover:opacity-85 sm:inline-flex"
        >
          {{ t('nav.cta') }}
          <ArrowUpRight class="h-3.5 w-3.5" />
        </a>

        <!-- Mobile toggle -->
        <button
          type="button"
          class="flex h-9 w-9 items-center justify-center text-ink lg:hidden"
          :aria-label="open ? 'Close menu' : 'Open menu'"
          @click="open = !open"
        >
          <X v-if="open" class="h-5 w-5" />
          <Menu v-else class="h-5 w-5" />
        </button>
      </div>
    </div>

    <!-- Mobile drawer -->
    <div v-if="open" class="border-t border-ink/8 bg-cream px-5 py-4 lg:hidden">
      <div class="flex flex-col gap-1">
        <a
          v-for="l in links"
          :key="l.href"
          :href="l.href"
          class="rounded-lg py-2 text-sm font-medium text-ink/75 hover:bg-ink/5 hover:text-ink"
          @click="open = false"
        >{{ t(l.key) }}</a>
        <a
          href="#contact"
          class="mt-2 inline-flex items-center justify-center rounded-pill bg-ink py-2.5 text-sm font-semibold text-white"
          @click="open = false"
        >{{ t('nav.cta') }}</a>
      </div>
    </div>
  </header>
</template>
