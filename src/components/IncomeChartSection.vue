<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Chart, registerables } from 'chart.js'
import AnimatedCounter from './ui/AnimatedCounter.vue'
import {
  ACTIVE_LINE,
  YEAR_FILTER,
  LINE_BY_ID,
  monthlySeries,
  activeTotals,
  allDealRows,
  formatIDR,
  jutaStr
} from '@/composables/usePortfolio'

Chart.register(...registerables)

const { t, locale } = useI18n()
const chartCanvas = ref(null)
const doughnutCanvas = ref(null)
const activeView = ref('bar')
let barInstance = null
let doughnutInstance = null

const isEmpty = computed(() => monthlySeries.value.length === 0)

const avgDeal = computed(() => {
  const { revenue, deals } = activeTotals.value
  return deals > 0 ? Math.round(revenue / deals) : 0
})

/* Odometer: pecah jadi juta supaya tidak render 9 digit */
function jutaParts(value) {
  return { value: jutaStr(value, locale.value), suffix: locale.value === 'id' ? ' Jt' : 'M' }
}
const revenueParts = computed(() => jutaParts(activeTotals.value.revenue))
const spendParts = computed(() => jutaParts(activeTotals.value.ad_spend))
const roasVal = computed(() => activeTotals.value.roas.toFixed(1))

/* Komposisi klien untuk doughnut: top 5 + gabungan sisanya */
const clientComposition = computed(() => {
  const map = new Map()
  for (const r of allDealRows.value) {
    map.set(r.client, (map.get(r.client) || 0) + r.deal_value)
  }
  const sorted = [...map.entries()].sort((a, b) => b[1] - a[1])
  const top = sorted.slice(0, 5).map(([name, value]) => ({ name, value }))
  const restValue = sorted.slice(5).reduce((s, [, v]) => s + v, 0)
  const restCount = sorted.length - top.length
  if (restValue > 0) {
    top.push({
      name: locale.value === 'id' ? `${restCount} klien lainnya` : `${restCount} other clients`,
      value: restValue
    })
  }
  return top
})

function renderBar() {
  if (!chartCanvas.value) return
  if (barInstance) { barInstance.destroy(); barInstance = null }

  const series = monthlySeries.value
  const ctx = chartCanvas.value.getContext('2d')
  const labels = series.map(m => (locale.value === 'id' ? m.short_id : m.short_en))
  const revenueData = series.map(m => m.revenue)
  const spendData = series.map(m => m.ad_spend)

  barInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          type: 'bar',
          yAxisID: 'y',
          label: t('chart_section.legend_revenue'),
          data: revenueData,
          backgroundColor: '#18181b',
          borderRadius: 2,
          barPercentage: 0.68,
          categoryPercentage: 0.68,
          order: 2
        },
        {
          type: 'line',
          yAxisID: 'y1',
          label: t('chart_section.legend_spend'),
          data: spendData,
          borderColor: '#a1a1aa',
          backgroundColor: 'rgba(161,161,170,0.15)',
          borderWidth: 1.5,
          pointRadius: 2.5,
          pointHoverRadius: 5,
          pointBackgroundColor: '#71717a',
          tension: 0.35,
          fill: false,
          order: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          position: 'top',
          align: 'end',
          labels: {
            color: '#52525b',
            font: { family: "'Inter', sans-serif", size: 11 },
            usePointStyle: true,
            pointStyle: 'circle',
            boxWidth: 6,
            boxHeight: 6,
            padding: 14
          }
        },
        tooltip: {
          backgroundColor: '#18181b',
          titleColor: '#fff',
          bodyColor: '#f4f4f5',
          borderColor: '#3f3f46',
          borderWidth: 1,
          padding: 12,
          cornerRadius: 4,
          boxWidth: 6,
          boxHeight: 6,
          callbacks: {
            label: c => c.dataset.label + ': ' + formatIDR(c.parsed.y),
            afterBody: contexts => {
              const i = contexts[0].dataIndex
              const spend = spendData[i]
              const rev = revenueData[i]
              if (spend > 0 && rev > 0) return '\nROAS: ' + (rev / spend).toFixed(1) + 'x'
              if (spend === 0 && rev > 0) return '\nROAS: — (ad spend tidak tercatat)'
              return ''
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          border: { color: 'rgba(0,0,0,0.08)' },
          ticks: {
            color: '#71717a',
            font: { family: "'JetBrains Mono', monospace", size: 9 },
            maxRotation: 60,
            minRotation: 0,
            autoSkip: true,
            maxTicksLimit: 12
          }
        },
        y: {
          position: 'left',
          grid: { color: 'rgba(0,0,0,0.05)' },
          border: { display: false },
          ticks: {
            color: '#a1a1aa',
            font: { family: "'JetBrains Mono', monospace", size: 10 },
            callback: v => (v >= 1_000_000 ? v / 1_000_000 + ' Jt' : v / 1000 + ' rb')
          }
        },
        y1: {
          position: 'right',
          grid: { display: false },
          border: { display: false },
          ticks: {
            color: '#a1a1aa',
            font: { family: "'JetBrains Mono', monospace", size: 9 },
            callback: v => (v >= 1_000_000 ? v / 1_000_000 + ' Jt' : v / 1000 + ' rb')
          }
        }
      }
    }
  })
}

function renderDoughnut() {
  if (!doughnutCanvas.value) return
  if (doughnutInstance) { doughnutInstance.destroy(); doughnutInstance = null }

  const items = clientComposition.value
  const ctx = doughnutCanvas.value.getContext('2d')
  const shades = ['#18181b', '#3f3f46', '#52525b', '#71717a', '#a1a1aa', '#d4d4d8']

  doughnutInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: items.map(i => i.name),
      datasets: [{
        data: items.map(i => i.value),
        backgroundColor: shades.slice(0, items.length),
        borderColor: '#ffffff',
        borderWidth: 2,
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '66%',
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: '#3f3f46',
            font: { family: "'Inter', sans-serif", size: 10 },
            usePointStyle: true,
            pointStyle: 'circle',
            boxWidth: 6,
            boxHeight: 6,
            padding: 10
          }
        },
        tooltip: {
          backgroundColor: '#18181b',
          titleColor: '#fff',
          bodyColor: '#f4f4f5',
          borderColor: '#3f3f46',
          borderWidth: 1,
          padding: 12,
          cornerRadius: 4,
          callbacks: {
            label: c => {
              const total = items.reduce((s, i) => s + i.value, 0)
              const pct = ((c.parsed / total) * 100).toFixed(1)
              return `${formatIDR(c.parsed)} (${pct}%)`
            }
          }
        }
      }
    }
  })
}

function renderActive() {
  if (activeView.value === 'bar') renderBar()
  else renderDoughnut()
}

function switchView(view) {
  activeView.value = view
  setTimeout(renderActive, 40)
}

onMounted(renderBar)
onBeforeUnmount(() => {
  if (barInstance) barInstance.destroy()
  if (doughnutInstance) doughnutInstance.destroy()
})

watch([ACTIVE_LINE, YEAR_FILTER, () => locale.value], renderActive)
</script>

<template>
  <section id="chart" class="border-t border-zinc-100 bg-white px-6 py-16 sm:px-10 sm:py-20">
    <div class="mx-auto max-w-5xl space-y-8" data-aos="fade-up">
      <!-- Header + view toggle -->
      <div class="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div class="max-w-2xl space-y-2">
          <span class="text-[10px] font-semibold uppercase tracking-tracked text-zinc-400">
            {{ t('chart_section.tag') }}
          </span>
          <h2 class="font-serif text-2xl leading-snug text-zinc-900 sm:text-3xl">
            {{ t('chart_section.title') }}
          </h2>
          <p class="text-xs font-normal leading-relaxed text-zinc-500 sm:text-sm">
            {{ t('chart_section.desc') }}
          </p>
        </div>

        <div class="inline-flex items-center self-start rounded-full border border-zinc-200/90 bg-zinc-50 p-1 text-xs font-medium md:self-auto">
          <button
            @click="switchView('bar')"
            class="rounded-full px-3.5 py-1.5 text-xs font-medium transition-all"
            :class="activeView === 'bar' ? 'bg-black text-white' : 'text-zinc-600 hover:text-black'"
          >
            {{ locale === 'id' ? 'Bar: Omzet vs Biaya' : 'Bar: Revenue vs Spend' }}
          </button>
          <button
            @click="switchView('doughnut')"
            class="rounded-full px-3.5 py-1.5 text-xs font-medium transition-all"
            :class="activeView === 'doughnut' ? 'bg-black text-white' : 'text-zinc-600 hover:text-black'"
          >
            {{ locale === 'id' ? 'Doughnut: Porsi Klien' : 'Doughnut: Deal Share' }}
          </button>
        </div>
      </div>

      <!-- KPI strip -->
      <div class="grid grid-cols-2 gap-px border border-editorial-divider bg-editorial-divider sm:grid-cols-3 lg:grid-cols-5">
        <div class="bg-white p-3.5 sm:p-4">
          <span class="text-[9px] font-semibold uppercase tracking-editorial text-zinc-400">
            {{ t('chart_section.kpi_revenue') }}
          </span>
          <div class="mt-1 text-base font-bold text-zinc-900 sm:text-xl">
            <AnimatedCounter prefix="Rp " :value="revenueParts.value" :suffix="revenueParts.suffix" :duration="1100" />
          </div>
        </div>
        <div class="bg-white p-3.5 sm:p-4">
          <span class="text-[9px] font-semibold uppercase tracking-editorial text-zinc-400">
            {{ t('chart_section.kpi_spend') }}
          </span>
          <div class="mt-1 text-base font-bold text-zinc-700 sm:text-xl">
            <AnimatedCounter prefix="Rp " :value="spendParts.value" :suffix="spendParts.suffix" :duration="1100" />
          </div>
        </div>
        <div class="bg-white p-3.5 sm:p-4">
          <span class="text-[9px] font-semibold uppercase tracking-editorial text-zinc-400">
            {{ t('chart_section.kpi_roas') }}
          </span>
          <div class="mt-1 text-base font-bold text-zinc-900 sm:text-xl">
            <AnimatedCounter :value="roasVal" suffix="x" :duration="1200" />
          </div>
        </div>
        <div class="bg-white p-3.5 sm:p-4">
          <span class="text-[9px] font-semibold uppercase tracking-editorial text-zinc-400">
            {{ t('chart_section.kpi_deals') }}
          </span>
          <div class="mt-1 text-base font-bold text-zinc-900 sm:text-xl">
            <AnimatedCounter :value="String(activeTotals.deals)" :duration="900" />
          </div>
        </div>
        <div class="col-span-2 bg-white p-3.5 sm:col-span-1 sm:p-4">
          <span class="text-[9px] font-semibold uppercase tracking-editorial text-zinc-400">
            {{ t('chart_section.kpi_avg_deal') }}
          </span>
          <div class="mt-1 font-mono text-sm font-bold text-zinc-900 sm:text-base">
            {{ formatIDR(avgDeal) }}
          </div>
        </div>
      </div>

      <!-- Charts -->
      <div class="rounded-2xl border border-zinc-200/80 bg-white p-5 sm:p-7">
        <div v-if="isEmpty" class="flex h-64 items-center justify-center text-xs text-zinc-400">
          {{ t('chart_section.empty_state') }}
        </div>
        <template v-else>
          <div v-show="activeView === 'bar'" class="h-[320px] w-full sm:h-[380px]">
            <canvas ref="chartCanvas"></canvas>
          </div>
          <div v-show="activeView === 'doughnut'" class="relative flex h-[320px] w-full items-center justify-center sm:h-[380px]">
            <canvas ref="doughnutCanvas"></canvas>
            <div class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center sm:-translate-x-24">
              <span class="text-[10px] font-medium uppercase tracking-wider text-zinc-400">
                {{ t('chart_section.kpi_revenue') }}
              </span>
              <span class="font-mono text-base font-bold text-zinc-900 sm:text-xl">
                {{ formatIDR(activeTotals.revenue) }}
              </span>
              <span class="font-mono text-[10px] text-zinc-500">
                {{ activeTotals.deals }} {{ t('deals_section.summary_deals') }}
              </span>
            </div>
          </div>
        </template>
      </div>

      <!-- Insight -->
      <div class="border-l-2 border-zinc-800 py-1 pl-4">
        <h4 class="text-xs font-semibold uppercase tracking-editorial text-zinc-800">
          {{ t('chart_section.takeaway_title') }}
        </h4>
        <p class="mt-1 text-xs font-normal leading-relaxed text-zinc-500 sm:text-sm">
          {{ t('chart_section.takeaway_body') }}
        </p>
      </div>
    </div>
  </section>
</template>
