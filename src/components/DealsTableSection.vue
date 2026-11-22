<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Search, ShieldCheck } from 'lucide-vue-next'
import AnimatedCounter from './ui/AnimatedCounter.vue'
import { groupedDeals, allDealRows, filteredSummary, formatIDR } from '@/composables/usePortfolio'

const { t, locale } = useI18n()
const searchQuery = ref('')

/* Terapkan pencarian di atas grup bulan (rowspan tetap konsisten) */
const filteredGroups = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return groupedDeals.value

  const out = []
  for (const g of groupedDeals.value) {
    const rows = g.rows.filter(
      r =>
        r.client.toLowerCase().includes(q) ||
        r.service.toLowerCase().includes(q) ||
        r.month_label.toLowerCase().includes(q)
    )
    if (rows.length) {
      out.push({ ...g, rows, total: rows.reduce((s, r) => s + r.deal_value, 0) })
    }
  }
  return out
})

const visibleDeals = computed(() => filteredGroups.value.flatMap(g => g.rows).length)
const visibleRevenue = computed(() => filteredGroups.value.reduce((s, g) => s + g.total, 0))
const totalDeals = computed(() => allDealRows.value.length)

/* Nomor urut global yang ikut tersaring */
let counter = 0
const numberedGroups = computed(() => {
  counter = 0
  return filteredGroups.value.map(g => ({
    ...g,
    rows: g.rows.map(r => ({ ...r, no: ++counter }))
  }))
})

function lineLabel(id) {
  return id === 'iso' ? t('bizline.iso') : t('bizline.iwash')
}
</script>

<template>
  <section id="deals" class="border-t border-zinc-100 bg-white px-6 py-16 sm:px-10 sm:py-20">
    <div class="mx-auto max-w-5xl space-y-8" data-aos="fade-up">
      <!-- Header -->
      <div class="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div class="space-y-2">
          <span class="text-[10px] font-semibold uppercase tracking-tracked text-zinc-400">
            {{ t('deals_section.tag') }}
          </span>
          <h2 class="font-serif text-2xl leading-snug text-zinc-900 sm:text-3xl">
            {{ t('deals_section.title') }}
          </h2>
          <p class="max-w-2xl text-xs font-normal leading-relaxed text-zinc-500 sm:text-sm">
            {{ t('deals_section.desc') }}
          </p>
        </div>

        <div class="inline-flex items-center gap-2 self-start rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-mono text-zinc-700 md:self-auto">
          <ShieldCheck class="h-3.5 w-3.5 text-zinc-900" />
          <span>{{ locale === 'id' ? 'Nama konsumen disamarkan' : 'Consumer names masked' }}</span>
        </div>
      </div>

      <!-- Search + count -->
      <div class="flex items-center justify-between gap-4">
        <div class="relative w-full max-w-xs">
          <Search class="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="t('deals_section.search_placeholder')"
            class="w-full rounded-full border border-zinc-200 py-1.5 pl-8 pr-3 text-xs text-zinc-800 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none"
          />
        </div>
        <div class="font-mono text-xs text-zinc-400">
          {{ visibleDeals }} / {{ totalDeals }} {{ t('deals_section.summary_deals') }}
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white">
        <div class="overflow-x-auto">
          <table class="w-full border-collapse text-left text-xs text-zinc-800 sm:text-sm">
            <thead class="border-b border-zinc-100 bg-zinc-50/70 text-[11px] font-semibold uppercase tracking-editorial text-zinc-400">
              <tr>
                <th scope="col" class="py-3.5 pl-6 pr-3">{{ t('deals_section.col_no') }}</th>
                <th scope="col" class="px-3 py-3.5">{{ t('deals_section.col_month') }}</th>
                <th scope="col" class="px-3 py-3.5">{{ t('deals_section.col_client') }}</th>
                <th scope="col" class="hidden px-3 py-3.5 md:table-cell">{{ t('deals_section.col_service') }}</th>
                <th scope="col" class="hidden px-3 py-3.5 text-center lg:table-cell">{{ t('deals_section.col_line') }}</th>
                <th scope="col" class="px-3 py-3.5 text-right">{{ t('deals_section.col_value') }}</th>
                <th scope="col" class="py-3.5 pl-3 pr-6 text-center">{{ t('deals_section.col_status') }}</th>
              </tr>
            </thead>

            <tbody v-if="numberedGroups.length" class="divide-y divide-zinc-100 font-sans">
              <template v-for="g in numberedGroups" :key="g.period">
                <tr
                  v-for="(d, i) in g.rows"
                  :key="g.period + '-' + d.client + '-' + d.service"
                  class="transition-colors hover:bg-zinc-50/50"
                >
                  <!-- No -->
                  <td class="py-3.5 pl-6 pr-3 align-middle font-mono text-xs text-zinc-400">
                    {{ d.no }}
                  </td>

                  <!-- Month (rowspan) -->
                  <td
                    v-if="i === 0"
                    :rowspan="g.rows.length"
                    class="whitespace-nowrap border-r border-zinc-100 bg-zinc-50/40 px-3 py-3.5 align-top font-mono text-xs font-medium text-zinc-800"
                  >
                    <div class="flex items-center gap-1.5">
                      <span v-if="g.rows.length > 1" class="h-2 w-2 rounded-full bg-zinc-900"></span>
                      <span>{{ g.month_label }}</span>
                    </div>
                    <span v-if="g.rows.length > 1" class="block text-[10px] font-normal text-zinc-400">
                      {{ g.rows.length }} {{ t('deals_section.summary_deals') }} · {{ formatIDR(g.total) }}
                    </span>
                  </td>

                  <!-- Client -->
                  <td class="px-3 py-3.5 align-middle text-xs font-semibold text-zinc-900">
                    {{ d.client }}
                    <span class="mt-0.5 block text-[10px] font-normal text-zinc-400 md:hidden">
                      {{ d.service }}
                    </span>
                  </td>

                  <!-- Service -->
                  <td class="hidden px-3 py-3.5 align-middle text-xs text-zinc-600 md:table-cell">
                    {{ d.service }}
                  </td>

                  <!-- Business line -->
                  <td class="hidden px-3 py-3.5 text-center align-middle lg:table-cell">
                    <span
                      class="inline-block rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold"
                      :class="d.line === 'iso'
                        ? 'border-zinc-900 bg-zinc-900 text-white'
                        : 'border-zinc-300 bg-white text-zinc-700'"
                    >
                      {{ d.line === 'iso' ? 'ISO' : 'IWASH' }}
                    </span>
                  </td>

                  <!-- Value -->
                  <td class="whitespace-nowrap px-3 py-3.5 text-right align-middle font-mono text-xs font-bold text-zinc-900 sm:text-sm">
                    {{ formatIDR(d.deal_value) }}
                  </td>

                  <!-- Status -->
                  <td class="py-3.5 pl-3 pr-6 text-center align-middle">
                    <span class="inline-flex items-center rounded-full bg-black px-2.5 py-0.5 text-[10px] font-semibold text-white">
                      DEAL
                    </span>
                  </td>
                </tr>
              </template>
            </tbody>

            <tbody v-else>
              <tr>
                <td colspan="7" class="py-10 text-center text-xs text-zinc-400">
                  {{ t('deals_section.empty_state') }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Summary footer -->
        <div class="flex flex-col items-center justify-between gap-3 border-t border-zinc-100 bg-zinc-50/60 px-6 py-3.5 text-xs sm:flex-row">
          <div class="text-zinc-500">
            {{ t('deals_section.summary_count') }}
            <span class="font-mono font-bold text-zinc-900">{{ visibleDeals }}</span>
            {{ t('deals_section.summary_deals') }}
            <span class="ml-1 text-zinc-400">· {{ t('deals_section.filtered_note') }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-[10px] uppercase tracking-editorial text-zinc-400">
              {{ t('deals_section.summary_sum') }}
            </span>
            <span class="font-mono text-base font-bold text-zinc-900">
              {{ formatIDR(visibleRevenue) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
