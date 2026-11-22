<script setup>
import { useI18n } from 'vue-i18n'
import { ArrowRight, ArrowUpRight } from 'lucide-vue-next'
import { activePeriod, jutaStr } from '../composables/usePortfolio'

const { t, locale } = useI18n()
const period = activePeriod
</script>

<template>
  <section id="top" class="relative overflow-hidden bg-cream pt-8 pb-14 sm:pt-12 sm:pb-20">
    <div class="mx-auto max-w-shell px-5 sm:px-8">
      <!-- Baris atas: ketersediaan kiri, tautan hasil kanan -->
      <div class="mb-8 flex flex-wrap items-center justify-between gap-3">
        <span
          class="inline-flex items-center gap-2 rounded-pill border border-ink/15 bg-white/70 px-3.5 py-1.5 text-[10.5px] font-semibold uppercase tracking-wide2 text-ink/70"
        >
          <span class="relative flex h-1.5 w-1.5">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
            <span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime" />
          </span>
          {{ t('hero.availability') }}
        </span>

        <a
          href="#growth"
          class="group inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-wide2 text-ink/45 transition-colors hover:text-ink"
        >
          {{ t('growth.index') }} — {{ t('growth.title_part1') }} {{ t('growth.title_part2') }} {{ t('growth.title_part3') }}
          <ArrowRight class="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>

      <!-- Headline -->
      <div class="relative">
        <h1 class="font-display text-display font-extrabold tracking-tightest text-ink">
          <span class="mb-1 block text-[0.32em] font-medium tracking-normal text-ink/40">{{ t('hero.hello') }}</span>
          <span class="text-amber">SyaSya</span><span class="ml-1 inline-block -translate-y-3 text-[0.46em]">👋</span>,
        </h1>

        <p class="mt-1 max-w-2xl font-display text-display-sm font-semibold text-ink/80">
          {{ t('hero.role') }}
        </p>

        <p class="mt-5 max-w-xl text-[14.5px] leading-relaxed text-ink/60">
          {{ t('hero.sub') }}
        </p>
      </div>

      <!-- Foto cutout di atas lingkaran orange + chips -->
      <div class="relative mt-9 flex flex-col items-center">
        <div class="relative flex items-end justify-center">
          <!-- Lingkaran orange -->
          <div
            class="absolute bottom-0 h-[58%] w-[290px] rounded-full bg-amber sm:h-[62%] sm:w-[380px]"
            aria-hidden="true"
          />

          <!-- Portrait -->
          <img
            src="/media/profile/syasya-portrait.png"
            :alt="`${t('hero.name')} — ${t('hero.role')}`"
            class="relative z-10 w-[262px] drop-shadow-[0_20px_44px_rgba(17,17,17,0.18)] sm:w-[336px]"
            width="799"
            height="900"
            fetchpriority="high"
          />

          <!-- Chip melayang -->
          <span
            class="absolute left-[-4%] top-[16%] z-20 -rotate-6 rounded-pill bg-ink px-3 py-1.5 text-[11px] font-semibold text-white shadow-chip sm:left-[4%]"
          >📢 {{ t('hero.chips.marketing') }}</span>
          <span
            class="absolute right-[-4%] top-[30%] z-20 rotate-3 rounded-pill bg-ink px-3 py-1.5 text-[11px] font-semibold text-white shadow-chip sm:right-[4%]"
          >🚀 {{ t('hero.chips.ads') }}</span>
          <span
            class="absolute left-[-3%] top-[56%] z-20 -rotate-3 rounded-pill bg-amber px-2.5 py-1 text-[10px] font-semibold text-white shadow-chip sm:left-[1%] sm:px-3 sm:py-1.5 sm:text-[11px]"
          >✨ {{ t('hero.chips.brand') }}</span>
          <span
            class="absolute right-[-3%] bottom-[22%] z-20 rotate-6 rounded-pill bg-ink px-2.5 py-1 text-[10px] font-semibold text-white shadow-chip sm:right-[2%] sm:px-3 sm:py-1.5 sm:text-[11px]"
          >📱 {{ t('hero.chips.social') }}</span>
        </div>

        <!-- Pengalaman + CTA -->
        <div class="relative z-30 -mt-1 flex w-full flex-col items-center gap-4 sm:-mt-3">
          <div class="flex items-center gap-2.5 rounded-pill border border-ink/10 bg-white/85 px-4 py-2 shadow-soft backdrop-blur">
            <span class="font-display text-base font-extrabold text-amber">{{ t('hero.exp_number') }}</span>
            <span class="max-w-[230px] text-[10.5px] leading-snug text-ink/55">{{ t('hero.exp_label') }}</span>
          </div>

          <!-- CTA: menumpuk di mobile, sejajar dari sm ke atas -->
          <div class="flex w-full max-w-[330px] flex-col overflow-hidden rounded-card border border-ink/15 shadow-soft sm:inline-flex sm:w-auto sm:max-w-none sm:flex-row sm:rounded-pill">
            <a
              href="#work"
              class="inline-flex items-center justify-center gap-1.5 bg-amber px-5 py-2.5 text-[12px] font-bold text-white transition-opacity hover:opacity-90"
            >
              {{ t('hero.cta_primary') }}
              <ArrowRight class="h-3.5 w-3.5" />
            </a>
            <a
              href="#contact"
              class="inline-flex items-center justify-center gap-1.5 border-t border-ink/10 bg-white px-5 py-2.5 text-[12px] font-bold text-ink transition-colors hover:bg-ink hover:text-white sm:border-t-0 sm:border-l"
            >
              {{ t('hero.cta_secondary') }}
              <ArrowUpRight class="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      <!-- Kutipan + 3 angka ringkas -->
      <div class="mt-12 grid gap-5 border-t border-ink/10 pt-8 sm:grid-cols-[auto_1fr]">
        <span class="font-display text-5xl leading-none text-amber/35">”</span>
        <div>
          <p class="max-w-lg text-[13px] italic leading-relaxed text-ink/55">
            {{ t('hero.quote') }}
          </p>
          <div class="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11.5px] text-ink/45">
            <span>
              <strong class="font-display font-extrabold text-ink">{{ period.deals }}</strong>
              {{ t('about.stat_deals') }}
            </span>
            <span class="h-3 w-px bg-ink/15" />
            <span>
              <strong class="font-display font-extrabold text-ink">Rp {{ jutaStr(period.revenue, locale) }} Jt</strong>
              {{ t('about.stat_revenue') }}
            </span>
            <span class="h-3 w-px bg-ink/15" />
            <span>
              <strong class="font-display font-extrabold text-ink">{{ period.roas }}x</strong>
              {{ t('about.stat_roas') }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
