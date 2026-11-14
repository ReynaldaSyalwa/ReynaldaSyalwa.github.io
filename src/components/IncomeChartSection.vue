<script setup>
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Chart, registerables } from 'chart.js'
import AnimatedCounter from './ui/AnimatedCounter.vue'
import metaData from '../data/meta_ads_and_deals.json'

Chart.register(...registerables)

const { t, locale } = useI18n()
const chartCanvas = ref(null)
const doughnutCanvas = ref(null)
const activeView = ref('bar') // 'bar' | 'doughnut'
let barChartInstance = null
let doughnutChartInstance = null

function formatIDR(val) {
  return 'Rp ' + Number(val).toLocaleString('id-ID')
}

function initBarChart() {
  if (!chartCanvas.value) return
  if (barChartInstance) {
    barChartInstance.destroy()
  }

  const ctx = chartCanvas.value.getContext('2d')
  const labels = [
    locale.value === 'id' ? 'Januari 2025' : 'Jan 2025',
    locale.value === 'id' ? 'Februari 2025' : 'Feb 2025',
    locale.value === 'id' ? 'September 2025' : 'Sep 2025',
    locale.value === 'id' ? 'Oktober 2025' : 'Oct 2025',
    locale.value === 'id' ? 'November 2025' : 'Nov 2025',
    locale.value === 'id' ? 'Desember 2025' : 'Dec 2025'
  ]

  const adSpendData = [654790, 506000, 541374, 352528, 407602, 328468]
  const salesIncomeData = [5550000, 0, 0, 0, 25308000, 31430000]

  barChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: locale.value === 'id' ? 'Omzet Penjualan (Rp)' : 'Sales Income (IDR)',
          data: salesIncomeData,
          backgroundColor: '#18181b', // Ink black
          borderColor: '#000000',
          borderWidth: 1,
          borderRadius: 4,
          barPercentage: 0.55,
          order: 2
        },
        {
          label: locale.value === 'id' ? 'Biaya Iklan Meta (Rp)' : 'Meta Ad Spend (IDR)',
          data: adSpendData,
          backgroundColor: '#a1a1aa', // Muted zinc
          borderColor: '#71717a',
          borderWidth: 1,
          borderRadius: 4,
          barPercentage: 0.55,
          order: 3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: '#18181b',
            font: { family: "'Inter', sans-serif", size: 12, weight: '500' },
            usePointStyle: true,
            padding: 16
          }
        },
        tooltip: {
          backgroundColor: '#ffffff',
          titleColor: '#18181b',
          bodyColor: '#18181b',
          borderColor: 'rgba(0, 0, 0, 0.1)',
          borderWidth: 1,
          padding: 12,
          boxPadding: 6,
          usePointStyle: true,
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': ' + formatIDR(context.parsed.y)
            },
            afterBody: function(contexts) {
              const dataIndex = contexts[0].dataIndex
              const spend = adSpendData[dataIndex]
              const income = salesIncomeData[dataIndex]
              if (spend > 0 && income > 0) {
                const roas = (income / spend).toFixed(1)
                return '\nROAS: ' + roas + 'x (Sales Revenue / Ad Spend)'
              }
              return ''
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(0, 0, 0, 0.04)' },
          ticks: { color: '#71717a', font: { family: "'Inter', sans-serif", size: 11 } }
        },
        y: {
          grid: { color: 'rgba(0, 0, 0, 0.04)' },
          ticks: {
            color: '#71717a',
            font: { family: "'JetBrains Mono', monospace", size: 11 },
            callback: function(value) {
              if (value >= 1000000) {
                return 'Rp ' + (value / 1000000) + 'M'
              }
              return 'Rp ' + value
            }
          }
        }
      }
    }
  })
}

function initDoughnutChart() {
  if (!doughnutCanvas.value) return
  if (doughnutChartInstance) {
    doughnutChartInstance.destroy()
  }

  const ctx = doughnutCanvas.value.getContext('2d')
  const deals = metaData.verified_deals_2025 || []

  function maskName(name) {
    if (name.includes('Agus')) return 'A** S**'
    if (name.includes('Hadist') || name.includes('KPM')) return 'P** A** (Yayasan K**)'
    if (name.includes('Hermawan')) return 'H******'
    if (name.includes('Anwar') || name.includes('Yuda')) return 'P** Y** (Yayasan N**)'
    if (name.includes('barokah') || name.includes('Khoirul')) return 'P** K** (Yayasan A**)'
    return 'Klien Terverifikasi'
  }

  const labels = deals.map(d => maskName(d.client_name))
  const values = deals.map(d => d.deal_value)
  const colors = [
    '#18181b', // Black (Yayasan Al-barokah 50.5%)
    '#3f3f46', // Zinc-700 (Yayasan KPM Hadist)
    '#71717a', // Zinc-500 (Hermawan)
    '#a1a1aa', // Zinc-400 (Yayasan Nurul Anwar)
    '#d4d4d8'  // Zinc-300 (Agus Susanto)
  ]

  doughnutChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: colors,
          borderColor: '#ffffff',
          borderWidth: 2,
          hoverOffset: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '68%',
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: '#18181b',
            font: { family: "'Inter', sans-serif", size: 11, weight: '500' },
            usePointStyle: true,
            padding: 12
          }
        },
        tooltip: {
          backgroundColor: '#ffffff',
          titleColor: '#18181b',
          bodyColor: '#18181b',
          borderColor: 'rgba(0, 0, 0, 0.1)',
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: function(context) {
              const val = context.parsed
              const total = values.reduce((a, b) => a + b, 0)
              const pct = ((val / total) * 100).toFixed(1)
              const deal = deals[context.dataIndex]
              return `${formatIDR(val)} (${pct}%) — ROAS ${deal.roas}x`
            }
          }
        }
      }
    }
  })
}

function switchView(view) {
  activeView.value = view
  setTimeout(() => {
    if (view === 'bar') {
      initBarChart()
    } else {
      initDoughnutChart()
    }
  }, 50)
}

onMounted(() => {
  initBarChart()
})

watch(() => locale.value, () => {
  if (activeView.value === 'bar') initBarChart()
  else initDoughnutChart()
})
</script>

<template>
  <section id="chart" class="py-16 sm:py-20 px-6 sm:px-10 border-t border-zinc-100 bg-white">
    <div class="mx-auto max-w-5xl space-y-10" data-aos="fade-up">
      <!-- Section Header with View Toggle -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div class="max-w-2xl space-y-2">
          <span class="text-[11px] font-semibold uppercase tracking-editorial text-zinc-400">
            {{ t('chart_section.tag') }}
          </span>
          <h2 class="font-serif text-2xl sm:text-3xl text-zinc-900 leading-snug">
            {{ t('chart_section.title') }}
          </h2>
          <p class="text-xs sm:text-sm text-zinc-500 font-normal leading-relaxed">
            {{ t('chart_section.desc') }}
          </p>
        </div>

        <!-- Chart Type Switcher Pills -->
        <div class="inline-flex items-center rounded-full border border-zinc-200/90 p-1 bg-zinc-50 text-xs font-medium self-start md:self-auto">
          <button
            @click="switchView('bar')"
            :class="[
              'rounded-full px-3.5 py-1.5 transition-all text-xs font-medium',
              activeView === 'bar' ? 'bg-black text-white shadow-xs' : 'text-zinc-600 hover:text-black'
            ]"
          >
            {{ locale === 'id' ? 'Bar: Omzet vs Biaya' : 'Bar: Revenue vs Spend' }}
          </button>
          <button
            @click="switchView('doughnut')"
            :class="[
              'rounded-full px-3.5 py-1.5 transition-all text-xs font-medium',
              activeView === 'doughnut' ? 'bg-black text-white shadow-xs' : 'text-zinc-600 hover:text-black'
            ]"
          >
            {{ locale === 'id' ? 'Doughnut: Porsi Klien' : 'Doughnut: Deal Share' }}
          </button>
        </div>
      </div>

      <!-- KPI Indicators with Scrolling Odometer Numbers -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="rounded-xl border border-zinc-100 bg-zinc-50/70 p-4">
          <span class="text-[10px] sm:text-[11px] font-medium uppercase tracking-editorial text-zinc-400">
            {{ locale === 'id' ? 'Total Omzet' : 'Total Revenue' }}
          </span>
          <div class="mt-1 font-mono text-xl sm:text-2xl font-bold text-zinc-900">
            <AnimatedCounter prefix="Rp " value="62.2" suffix="M" :duration="1400" />
          </div>
          <span class="text-[10px] text-zinc-400">
            {{ locale === 'id' ? 'Closing ISO 2025' : 'ISO 2025 Deals' }}
          </span>
        </div>
        <div class="rounded-xl border border-zinc-100 bg-zinc-50/70 p-4">
          <span class="text-[10px] sm:text-[11px] font-medium uppercase tracking-editorial text-zinc-400">
            {{ locale === 'id' ? 'Total Ad Spend' : 'Total Ad Spend' }}
          </span>
          <div class="mt-1 font-mono text-xl sm:text-2xl font-bold text-zinc-900">
            <AnimatedCounter prefix="Rp " value="2.28" suffix="M" :duration="1300" />
          </div>
          <span class="text-[10px] text-zinc-400">
            {{ locale === 'id' ? 'Total belanja iklan' : 'Total advertising cost' }}
          </span>
        </div>
        <div class="rounded-xl border border-zinc-100 bg-zinc-50/70 p-4">
          <span class="text-[10px] sm:text-[11px] font-medium uppercase tracking-editorial text-zinc-400">
            {{ locale === 'id' ? 'Gross Margin Lift' : 'Gross Margin Lift' }}
          </span>
          <div class="mt-1 font-mono text-xl sm:text-2xl font-bold text-zinc-900">
            <AnimatedCounter prefix="+Rp " value="60.0" suffix="M" :duration="1500" />
          </div>
          <span class="text-[10px] text-zinc-400">
            {{ locale === 'id' ? 'Net revenue margin' : 'Net revenue margin' }}
          </span>
        </div>
        <div class="rounded-xl border border-zinc-100 bg-zinc-50/70 p-4">
          <span class="text-[10px] sm:text-[11px] font-medium uppercase tracking-editorial text-zinc-400">
            {{ locale === 'id' ? 'Average ROAS' : 'Average ROAS' }}
          </span>
          <div class="mt-1 font-mono text-xl sm:text-2xl font-bold text-zinc-900">
            <AnimatedCounter value="27.2" suffix="x" :duration="1600" />
          </div>
          <span class="text-[10px] text-zinc-400">
            {{ locale === 'id' ? 'Puncak Des: 95.7x' : 'Peak Dec: 95.7x' }}
          </span>
        </div>
      </div>

      <!-- Chart Display Container -->
      <div class="rounded-2xl border border-zinc-200/80 bg-white p-5 sm:p-7">
        <!-- View 1: Bar Chart -->
        <div v-show="activeView === 'bar'" class="h-[320px] w-full sm:h-[380px]">
          <canvas ref="chartCanvas"></canvas>
        </div>

        <!-- View 2: Doughnut Chart -->
        <div v-show="activeView === 'doughnut'" class="relative h-[320px] w-full sm:h-[380px] flex items-center justify-center">
          <canvas ref="doughnutCanvas"></canvas>
          <div class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center -translate-x-12 sm:-translate-x-20">
            <span class="text-[10px] uppercase tracking-wider text-zinc-400 font-medium">Verified Deals</span>
            <span class="font-mono text-lg sm:text-xl font-bold text-zinc-900">Rp 62.2M</span>
            <span class="text-[10px] text-zinc-500 font-mono">5 Institutional Deals</span>
          </div>
        </div>
      </div>

      <!-- Insight Box -->
      <div class="border-l-2 border-zinc-800 pl-4 py-1">
        <h4 class="text-xs font-semibold uppercase tracking-editorial text-zinc-800">
          {{ t('chart_section.takeaway_title') }}
        </h4>
        <p class="mt-1 text-xs sm:text-sm text-zinc-500 leading-relaxed font-normal">
          {{ t('chart_section.takeaway_body') }}
        </p>
      </div>
    </div>
  </section>
</template>
