<script setup>
import { useI18n } from 'vue-i18n'

const { tm } = useI18n()
</script>

<template>
  <!-- Ticker miring -2.5deg; lebar dinaikkan & digeser agar sudut miring tetap
       tertutup tanpa menimbulkan overflow horizontal pada halaman. -->
  <div class="relative overflow-hidden py-3 sm:py-4" aria-hidden="true">
    <div class="-rotate-[2.5deg]">
      <div class="ml-[-8%] w-[116%] border-y border-ink/10 bg-white py-2.5 shadow-[0_6px_20px_-14px_rgba(17,17,17,0.35)]">
        <div class="marquee-track">
          <template v-for="copy in 2" :key="copy">
            <span
              v-for="(word, i) in tm('marquee')"
              :key="`${copy}-${i}`"
              class="flex items-center whitespace-nowrap px-4 font-display text-sm font-semibold uppercase tracking-wide2 text-ink/80 sm:text-base"
            >
              {{ word }}
              <svg class="ml-4 h-3 w-3 shrink-0 text-amber" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0l2.4 7.2L22 9.6l-6 4.8L18 22l-6-4.4L6 22l2-7.6-6-4.8 7.6-2.4z" />
              </svg>
            </span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
