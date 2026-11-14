<script setup>
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Chart, registerables } from 'chart.js'
import { TrendingUp, DollarSign, Target, Award } from 'lucide-vue-next'

Chart.register(...registerables)

const { t, locale } = useI18n()
const chartCanvas = ref(null)
let chartInstance = null

function formatIDR(val) {
  return 'Rp ' + Number(val).toLocaleString('id-ID')
}

function initChart() {
  if (!chartCanvas.value) return
  if (chartInstance) {
    chartInstance.destroy()
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

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: t('chart_section.legend_income'),
          data: salesIncomeData,
          backgroundColor: '#18181b', // Crisp ink black
          borderColor: '#000000',
          borderWidth: 1,
          borderRadius: 4,
          barPercentage: 0.55,
          order: 2
        },
        {
          label: t('chart_section.legend_spend'),
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
            font: {
              family: "'Inter', sans-serif",
              size: 12,
              weight: '500'
            },
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
          grid: {
            color: 'rgba(0, 0, 0, 0.04)'
          },
          ticks: {
            color: '#71717a',
            font: {
              family: "'Inter', sans-serif",
              size: 11
            }
          }
        },
        y: {
          grid: {
            color: 'rgba(0, 0, 0, 0.04)'
          },
          ticks: {
            color: '#71717a',
            font: {
              family: "'JetBrains Mono', monospace",
              size: 11
            },
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

onMounted(() => {
  initChart()
})

watch(() => locale.value, () => {
  initChart()
})
</script>

<template>
  <section id="chart" class="py-16 sm:py-20 px-6 sm:px-10 border-t border-zinc-100 bg-white">
    <div class="mx-auto max-w-5xl space-y-10" data-aos="fade-up">
      <!-- Section Header -->
      <div class="max-w-3xl space-y-2">
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

      <!-- KPI Indicators -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="rounded-xl border border-zinc-100 bg-zinc-50/70 p-4">
          <span class="text-[10px] sm:text-[11px] font-medium uppercase tracking-editorial text-zinc-400">Total Omzet</span>
          <div class="mt-1 font-mono text-xl sm:text-2xl font-bold text-zinc-900">Rp 62.2M</div>
          <span class="text-[10px] text-zinc-400">Closing ISO 2025</span>
        </div>
        <div class="rounded-xl border border-zinc-100 bg-zinc-50/70 p-4">
          <span class="text-[10px] sm:text-[11px] font-medium uppercase tracking-editorial text-zinc-400">Total Ad Spend</span>
          <div class="mt-1 font-mono text-xl sm:text-2xl font-bold text-zinc-900">Rp 2.28M</div>
          <span class="text-[10px] text-zinc-400">Total belanja iklan</span>
        </div>
        <div class="rounded-xl border border-zinc-100 bg-zinc-50/70 p-4">
          <span class="text-[10px] sm:text-[11px] font-medium uppercase tracking-editorial text-zinc-400">Gross Margin Lift</span>
          <div class="mt-1 font-mono text-xl sm:text-2xl font-bold text-zinc-900">+Rp 60.0M</div>
          <span class="text-[10px] text-zinc-400">Net revenue margin</span>
        </div>
        <div class="rounded-xl border border-zinc-100 bg-zinc-50/70 p-4">
          <span class="text-[10px] sm:text-[11px] font-medium uppercase tracking-editorial text-zinc-400">Average ROAS</span>
          <div class="mt-1 font-mono text-xl sm:text-2xl font-bold text-zinc-900">27.2x</div>
          <span class="text-[10px] text-zinc-400">Peak Dec: 95.7x</span>
        </div>
      </div>

      <!-- Chart Container -->
      <div class="rounded-2xl border border-zinc-200/80 bg-white p-5 sm:p-7">
        <div class="h-[320px] w-full sm:h-[380px]">
          <canvas ref="chartCanvas"></canvas>
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
