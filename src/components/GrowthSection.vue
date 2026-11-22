<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import Chart from 'chart.js/auto'
import { ArrowUpRight, TrendingUp } from 'lucide-vue-next'
import SectionBanner from './SectionBanner.vue'
import {
  PERIOD, activePeriod, activeMeta, monthlySeries, groupedDeals,
  jutaStr, roasStr, formatIDR, compactNum,
} from '../composables/usePortfolio'

const { t, locale, tm } = useI18n()

const period = activePeriod
const meta = activeMeta
const series = monthlySeries
const groups = groupedDeals
const steps = computed(() => tm('growth.steps'))

const periods = [
  { id: 'all', key: 'growth.period_all' },
  { id: '2025', key: 'growth.period_2025' },
  { id: '2026', key: 'growth.period_2026' },
]

/* ── Chart ──────────────────────────────────────────────────────── */
const canvas = ref(null)
let chart = null

function buildChart() {
  if (!canvas.value) return
  const labels = series.value.map(m =>
    locale.value === 'id' ? m.short_id : m.short_en
  )
  const revenue = series.value.map(m => m.revenue)
  const spend = series.value.map(m => m.ad_spend)

  if (chart) chart.destroy()

  chart = new Chart(canvas.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: t('growth.chart_revenue'),
          data: revenue,
          backgroundColor: '#111111',
          borderRadius: 4,
          barPercentage: 0.72,
          categoryPercentage: 0.74,
          yAxisID: 'y',
        },
        {
          label: t('growth.chart_spend'),
          data: spend,
          type: 'line',
          borderColor: '#F5A24B',
          backgroundColor: 'rgba(245,162,75,0.12)',
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
          pointHoverBackgroundColor: '#F5A24B',
          tension: 0.35,
          fill: false,
          yAxisID: 'y1',
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#111111',
          padding: 10,
          titleFont: { family: 'Inter', size: 11, weight: '600' },
          bodyFont: { family: 'Inter', size: 11 },
          bodySpacing: 4,
          callbacks: {
            label: ctx => `${ctx.dataset.label}: ${formatIDR(ctx.parsed.y)}`,
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: {
            font: { family: 'Inter', size: 10 },
            color: '#9a9a94',
            maxRotation: 0,
            autoSkipPadding: 14,
          },
        },
        y: {
          position: 'left',
          grid: { color: 'rgba(17,17,17,0.06)' },
          border: { display: false },
          ticks: {
            font: { family: 'Inter', size: 10 },
            color: '#9a9a94',
            callback: v => (v >= 1_000_000 ? `${v / 1_000_000}Jt` : `${v / 1000}rb`),
          },
        },
        y1: {
          position: 'right',
          grid: { display: false },
          border: { display: false },
          ticks: {
            font: { family: 'Inter', size: 10 },
            color: '#F5A24B',
            callback: v => `${v / 1000}rb`,
          },
        },
      },
    },
  })
}

onMounted(buildChart)
onBeforeUnmount(() => chart && chart.destroy())

watch([PERIOD, locale], () => {
  buildChart()
})
</script>

<template>
  <section id="growth" class="bg-cream pb-16 sm:pb-24">
    <SectionBanner
      :no="t('growth.index')"
      :part1="t('growth.title_part1')"
      :part2="t('growth.title_part2')"
      :part3="t('growth.title_part3')"
    />

    <div class="mx-auto max-w-shell px-5 pt-10 sm:px-8 sm:pt-14">
      <!-- Lead + FILTER PERIODE (satu-satunya filter) -->
      <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <p class="max-w-xl text-[14.5px] leading-relaxed text-ink/60" data-aos="fade-up">
          {{ t('growth.lead') }}
        </p>

        <div class="shrink-0" data-aos="fade-left">
          <p class="mb-2 text-[10px] font-bold uppercase tracking-wide2 text-ink/35">
            {{ t('growth.filter_label') }}
          </p>
          <div class="inline-flex rounded-pill border border-ink/15 bg-white p-1 shadow-soft">
            <button
              v-for="p in periods"
              :key="p.id"
              type="button"
              class="rounded-pill px-4 py-2 text-[12.5px] font-bold transition-colors sm:px-5"
              :class="PERIOD === p.id ? 'bg-ink text-white' : 'text-ink/55 hover:text-ink'"
              @click="PERIOD = p.id"
            >{{ t(p.key) }}</button>
          </div>
        </div>
      </div>

      <!-- Kartu metrik utama: omzet / belanja / ROAS / deal -->
      <div class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div class="rounded-card bg-ink p-5 shadow-lift" data-aos="fade-up" data-aos-delay="0">
          <p class="text-[10px] font-bold uppercase tracking-wide2 text-white/40">{{ t('growth.metric_revenue') }}</p>
          <p class="mt-2 font-display text-[28px] font-extrabold leading-none tracking-tightest text-white">
            {{ jutaStr(period.revenue, locale, 1) }}
            <span class="text-[0.5em] font-bold text-white/45">Jt</span>
          </p>
          <p class="mt-2 font-mono text-[10.5px] text-white/35">{{ formatIDR(period.revenue) }}</p>
        </div>

        <div class="rounded-card border border-ink/8 bg-white p-5 shadow-soft" data-aos="fade-up" data-aos-delay="70">
          <p class="text-[10px] font-bold uppercase tracking-wide2 text-ink/35">{{ t('growth.metric_spend') }}</p>
          <p class="mt-2 font-display text-[28px] font-extrabold leading-none tracking-tightest text-ink">
            {{ jutaStr(period.ad_spend, locale, 2) }}
            <span class="text-[0.5em] font-bold text-ink/35">Jt</span>
          </p>
          <p class="mt-2 font-mono text-[10.5px] text-ink/30">{{ formatIDR(period.ad_spend) }}</p>
        </div>

        <div class="rounded-card border border-amber/30 bg-amber/8 p-5 shadow-soft" data-aos="fade-up" data-aos-delay="140">
          <p class="text-[10px] font-bold uppercase tracking-wide2 text-amber-deep/70">{{ t('growth.metric_roas') }}</p>
          <p class="mt-2 flex items-baseline gap-1 font-display text-[28px] font-extrabold leading-none tracking-tightest text-amber-deep tabular-figures">
            {{ roasStr(period.roas, locale) }}x
            <TrendingUp class="h-4 w-4" />
          </p>
          <p class="mt-2 font-mono text-[10.5px] text-amber-deep/50">
            {{ t('growth.metric_avg') }} {{ formatIDR(period.avg_deal_value) }}
          </p>
        </div>

        <div class="rounded-card border border-ink/8 bg-white p-5 shadow-soft" data-aos="fade-up" data-aos-delay="210">
          <p class="text-[10px] font-bold uppercase tracking-wide2 text-ink/35">{{ t('growth.metric_deals') }}</p>
          <p class="mt-2 font-display text-[28px] font-extrabold leading-none tracking-tightest text-ink tabular-figures">
            {{ period.deals }}
          </p>
          <p class="mt-2 font-mono text-[10.5px] text-ink/30">
            {{ period.campaigns }} {{ t('growth.metric_campaigns').toLowerCase() }}
          </p>
        </div>
      </div>

      <!-- Grafik -->
      <div
        class="mt-4 rounded-card border border-ink/8 bg-white p-5 shadow-soft sm:p-6"
        data-aos="fade-up"
      >
        <div class="flex flex-wrap items-center justify-between gap-3">
          <h3 class="font-display text-[14.5px] font-bold text-ink">{{ t('growth.chart_title') }}</h3>
          <div class="flex items-center gap-4 text-[10.5px] font-medium text-ink/50">
            <span class="flex items-center gap-1.5">
              <span class="h-2.5 w-2.5 rounded-sm bg-ink" />{{ t('growth.chart_revenue') }}
            </span>
            <span class="flex items-center gap-1.5">
              <span class="h-0.5 w-4 rounded-full bg-amber" />{{ t('growth.chart_spend') }}
            </span>
          </div>
        </div>
        <div class="mt-4 h-[260px] sm:h-[320px]">
          <canvas ref="canvas" />
        </div>
      </div>

      <!-- Tabel rincian -->
      <div
        class="mt-4 overflow-hidden rounded-card border border-ink/8 bg-white shadow-soft"
        data-aos="fade-up"
      >
        <div class="flex items-center justify-between border-b border-ink/8 px-5 py-4">
          <h3 class="font-display text-[14.5px] font-bold text-ink">{{ t('growth.table_title') }}</h3>
          <span class="rounded-pill bg-ink/5 px-2.5 py-1 font-mono text-[10.5px] text-ink/50 tabular-figures">
            {{ period.deals }} deal
          </span>
        </div>

        <div v-if="groups.length" class="max-h-[460px] overflow-y-auto">
          <table class="w-full border-collapse text-left">
            <!-- Header kolom: sebelumnya tidak ada, pembaca harus menebak -->
            <thead class="sticky top-0 z-10 bg-white shadow-[0_1px_0_rgba(17,17,17,0.08)]">
              <tr>
                <th class="px-5 py-2.5 text-[9.5px] font-bold uppercase tracking-wide2 text-ink/40">{{ t('growth.table_client') }}</th>
                <th class="px-5 py-2.5 text-[9.5px] font-bold uppercase tracking-wide2 text-ink/40">{{ t('growth.table_service') }}</th>
                <th class="px-5 py-2.5 text-right text-[9.5px] font-bold uppercase tracking-wide2 text-ink/40">{{ t('growth.table_value') }}</th>
                <th class="px-5 py-2.5 text-right text-[9.5px] font-bold uppercase tracking-wide2 text-ink/40">—</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="g in groups" :key="g.period">
                <tr class="bg-ink/[0.03]">
                  <td colspan="3" class="px-5 py-2 text-[10.5px] font-bold uppercase tracking-wide2 text-ink/45">
                    {{ locale === 'id' ? g.month_label : g.period }}
                  </td>
                  <td class="px-5 py-2 text-right font-mono text-[10.5px] font-semibold text-ink/50 tabular-figures">
                    {{ formatIDR(g.total) }}
                  </td>
                </tr>
                <tr
                  v-for="row in g.rows"
                  :key="`${row.period}-${row.client}`"
                  class="border-b border-ink/5 last:border-0 hover:bg-ink/[0.015]"
                >
                  <td class="px-5 py-2.5 text-[12.5px] font-medium text-ink">{{ row.client }}</td>
                  <td class="px-5 py-2.5 text-[11.5px] text-ink/50">{{ row.service }}</td>
                  <td class="px-5 py-2.5 text-right font-mono text-[12px] font-semibold text-ink tabular-figures">
                    {{ formatIDR(row.deal_value) }}
                  </td>
                  <td class="px-5 py-2.5 text-right">
                    <span
                      class="rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide2"
                      :class="row.line === 'iso' ? 'bg-ink/8 text-ink/60' : 'bg-sage/15 text-sage'"
                    >{{ row.line === 'iso' ? 'ISO' : 'IWASH' }}</span>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <p v-else class="px-5 py-8 text-center text-[12.5px] text-ink/40">{{ t('growth.table_empty') }}</p>
      </div>

      <!-- Cara membaca (3 langkah) -->
      <div class="mt-10 rounded-card border border-ink/8 bg-white/60 p-6 sm:p-7" data-aos="fade-up">
        <p class="text-[10px] font-bold uppercase tracking-wide2 text-amber">{{ t('growth.read_order') }}</p>
        <div class="mt-4 grid gap-5 sm:grid-cols-3">
          <div
            v-for="(s, i) in steps"
            :key="s.num"
            class="flex gap-3"
            data-aos="fade-up"
            :data-aos-delay="80 + i * 80"
          >
            <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink font-display text-[11px] font-bold text-white">
              {{ s.num }}
            </span>
            <div>
              <p class="font-display text-[13px] font-bold text-ink">{{ s.title }}</p>
              <p class="mt-1 text-[12px] leading-relaxed text-ink/55">{{ s.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <p class="mt-5 text-[11px] leading-relaxed text-ink/40" data-aos="fade-up">{{ t('growth.note') }}</p>
    </div>
  </section>
</template>
