<script setup>
import { useI18n } from 'vue-i18n'
import SectionBanner from './SectionBanner.vue'
import { PORTFOLIO, formatIDR } from '../composables/usePortfolio'

const { t, locale } = useI18n()
const iwash = PORTFOLIO.iwash_campaigns
</script>

<template>
  <section id="brand" class="bg-cream pb-16 sm:pb-24">
    <SectionBanner
      :no="t('brand.index')"
      :part1="t('brand.title_part1')"
      :part2="t('brand.title_part2')"
      :part3="t('brand.title_part3')"
    />

    <div class="mx-auto max-w-shell px-5 pt-10 sm:px-8 sm:pt-14">
      <p class="max-w-2xl text-[14.5px] leading-relaxed text-ink/60">{{ t('brand.lead') }}</p>

      <!-- Dua kartu brand -->
      <div class="mt-8 grid gap-4 lg:grid-cols-2">
        <!-- NSM -->
        <article class="rounded-card border border-ink/8 bg-white p-6 shadow-soft sm:p-7">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-[10px] font-bold uppercase tracking-wide2 text-ink/35">B2B · Institusi</p>
              <h3 class="mt-1 font-display text-xl font-extrabold text-ink">{{ t('brand.brand_iso_name') }}</h3>
            </div>
            <span class="rounded-pill bg-ink px-3 py-1 text-[10px] font-bold uppercase tracking-wide2 text-white">ISO</span>
          </div>

          <p class="mt-3 text-[13.5px] leading-relaxed text-ink/60">{{ t('brand.brand_iso_desc') }}</p>

          <ul class="mt-4 space-y-1.5">
            <li class="flex items-start gap-2 text-[12.5px] text-ink/60">
              <span class="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber" aria-hidden="true" />
              {{ t('brand.brand_iso_point1') }}
            </li>
            <li class="flex items-start gap-2 text-[12.5px] text-ink/60">
              <span class="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber" aria-hidden="true" />
              {{ t('brand.brand_iso_point2') }}
            </li>
          </ul>

          <div class="mt-5 flex gap-6 border-t border-ink/8 pt-4">
            <div>
              <p class="font-display text-2xl font-extrabold leading-none text-ink">{{ t('brand.brand_iso_metric1') }}</p>
              <p class="mt-1 text-[10.5px] uppercase tracking-wide2 text-ink/40">{{ t('brand.brand_iso_metric1_label') }}</p>
            </div>
            <div class="h-8 w-px bg-ink/10" />
            <div>
              <p class="font-display text-2xl font-extrabold leading-none text-ink">{{ t('brand.brand_iso_metric2') }}</p>
              <p class="mt-1 text-[10.5px] uppercase tracking-wide2 text-ink/40">{{ t('brand.brand_iso_metric2_label') }}</p>
            </div>
          </div>
        </article>

        <!-- Iwash -->
        <article class="rounded-card border border-ink/8 bg-white p-6 shadow-soft sm:p-7">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-[10px] font-bold uppercase tracking-wide2 text-ink/35">B2C · Rumah tangga</p>
              <h3 class="mt-1 font-display text-xl font-extrabold text-ink">{{ t('brand.brand_iwash_name') }}</h3>
            </div>
            <span class="rounded-pill border border-ink/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wide2 text-ink/70">IWASH</span>
          </div>

          <p class="mt-3 text-[13.5px] leading-relaxed text-ink/60">{{ t('brand.brand_iwash_desc') }}</p>

          <ul class="mt-4 space-y-1.5">
            <li class="flex items-start gap-2 text-[12.5px] text-ink/60">
              <span class="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-sage" aria-hidden="true" />
              {{ t('brand.brand_iwash_point1') }}
            </li>
            <li class="flex items-start gap-2 text-[12.5px] text-ink/60">
              <span class="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-sage" aria-hidden="true" />
              {{ t('brand.brand_iwash_point2') }}
            </li>
          </ul>

          <div class="mt-5 flex gap-6 border-t border-ink/8 pt-4">
            <div>
              <p class="font-display text-2xl font-extrabold leading-none text-ink">{{ t('brand.brand_iwash_metric1') }}</p>
              <p class="mt-1 text-[10.5px] uppercase tracking-wide2 text-ink/40">{{ t('brand.brand_iwash_metric1_label') }}</p>
            </div>
            <div class="h-8 w-px bg-ink/10" />
            <div>
              <p class="font-display text-2xl font-extrabold leading-none text-ink">{{ t('brand.brand_iwash_metric2') }}</p>
              <p class="mt-1 text-[10.5px] uppercase tracking-wide2 text-ink/40">{{ t('brand.brand_iwash_metric2_label') }}</p>
            </div>
          </div>
        </article>
      </div>

      <!-- Pola musiman -->
      <div class="mt-10">
        <h3 class="font-display text-lg font-extrabold text-ink">{{ t('brand.seasonal_title') }}</h3>
        <p class="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-ink/55">{{ t('brand.seasonal_desc') }}</p>

        <div class="mt-5 overflow-hidden rounded-card border border-ink/8 bg-white shadow-soft">
          <div class="overflow-x-auto">
            <table class="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr class="border-b border-ink/8 bg-ink/[0.02]">
                  <th class="px-4 py-2.5 text-[10px] font-bold uppercase tracking-wide2 text-ink/40">{{ t('brand.col_moment') }}</th>
                  <th class="px-4 py-2.5 text-[10px] font-bold uppercase tracking-wide2 text-ink/40">{{ t('brand.col_flyer') }}</th>
                  <th class="px-4 py-2.5 text-right text-[10px] font-bold uppercase tracking-wide2 text-ink/40">{{ t('brand.col_spend') }}</th>
                  <th class="px-4 py-2.5 text-right text-[10px] font-bold uppercase tracking-wide2 text-ink/40">{{ t('brand.col_closing') }}</th>
                  <th class="px-4 py-2.5 text-right text-[10px] font-bold uppercase tracking-wide2 text-ink/40">{{ t('brand.col_roas') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="c in iwash"
                  :key="c.moment"
                  class="border-b border-ink/5 last:border-0"
                >
                  <td class="px-4 py-3 text-[12.5px] font-semibold text-ink">{{ c.moment_id }}</td>
                  <td class="px-4 py-3 text-[12px] text-ink/55">
                    {{ c.moment === 'Imlek' ? 'Valentine Days' : c.moment === 'Ramadhan Batch 1' ? 'Promo Ramadhan' : 'HUT Surabaya' }}
                  </td>
                  <td class="px-4 py-3 text-right font-mono text-[12px] text-ink/60">{{ formatIDR(c.ad_spend) }}</td>
                  <td class="px-4 py-3 text-right text-[12.5px] font-semibold text-ink">{{ c.results }}</td>
                  <td class="px-4 py-3 text-right">
                    <span class="rounded-pill bg-amber/12 px-2.5 py-1 font-display text-[11.5px] font-extrabold text-amber-deep">
                      {{ (c.revenue / c.ad_spend).toFixed(2) }}x
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p class="mt-3 text-[11.5px] text-ink/40">
          {{ locale === 'id'
            ? 'Setiap flyer dipasangkan dengan kampanye iklan pada bulan yang sama — inilah yang membuat hasilnya bisa diukur.'
            : 'Each flyer is paired with an ad campaign in the same month — which is what makes the results measurable.' }}
        </p>
      </div>
    </div>
  </section>
</template>
