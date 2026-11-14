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
  
  // Gradients
  const incomeGradient = ctx.createLinearGradient(0, 0, 0, 350)
  incomeGradient.addColorStop(0, 'rgba(16, 185, 129, 0.9)')
  incomeGradient.addColorStop(1, 'rgba(16, 185, 129, 0.2)')

  const spendGradient = ctx.createLinearGradient(0, 0, 0, 350)
  spendGradient.addColorStop(0, 'rgba(239, 68, 68, 0.7)')
  spendGradient.addColorStop(1, 'rgba(239, 68, 68, 0.15)')

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
          backgroundColor: incomeGradient,
          borderColor: '#10b981',
          borderWidth: 1.5,
          borderRadius: 8,
          barPercentage: 0.6,
          order: 2
        },
        {
          label: t('chart_section.legend_spend'),
          data: adSpendData,
          backgroundColor: spendGradient,
          borderColor: '#ef4444',
          borderWidth: 1.5,
          borderRadius: 8,
          barPercentage: 0.6,
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
            color: '#d4d4d8',
            font: {
              family: "'Plus Jakarta Sans', sans-serif",
              size: 13,
              weight: '600'
            },
            usePointStyle: true,
            padding: 20
          }
        },
        tooltip: {
          backgroundColor: '#18181b',
          titleColor: '#ffffff',
          bodyColor: '#e4e4e7',
          borderColor: '#3f3f46',
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
                return '\nROAS: ' + roas + 'x (Revenue / Spend)'
              }
              return ''
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.05)'
          },
          ticks: {
            color: '#a1a1aa',
            font: {
              family: "'Plus Jakarta Sans', sans-serif",
              size: 12
            }
          }
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.06)'
          },
          ticks: {
            color: '#a1a1aa',
            font: {
              family: "'JetBrains Mono', monospace",
              size: 11
            },
            callback: function(value) {
              if (value >= 1000000) {
                return 'Rp ' + (value / 1000000) + ' Jt'
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
  <section id="chart" class="relative py-20 border-t border-obsidian-600/70 bg-obsidian-900/40">
    <div class="mx-auto max-w-7xl px-6 sm:px-8">
      <!-- Section Header -->
      <div class="max-w-3xl">
        <span class="text-xs font-bold uppercase tracking-wider text-growth-400">
          {{ t('chart_section.tag') }}
        </span>
        <h2 class="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          {{ t('chart_section.title') }}
        </h2>
        <p class="mt-4 text-base text-zinc-400">
          {{ t('chart_section.desc') }}
        </p>
      </div>

      <!-- 4 KPI Summary Cards -->
      <div class="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <!-- KPI 1 -->
        <div class="rounded-xl border border-growth-500/30 bg-growth-500/10 p-5 backdrop-blur-sm">
          <div class="flex items-center justify-between text-xs font-semibold text-growth-300">
            <span>{{ t('chart_section.kpi_total_revenue') }}</span>
            <DollarSign class="h-4 w-4 text-growth-400" />
          </div>
          <div class="mt-2 font-mono text-2xl font-bold text-white">
            Rp 62.288.000
          </div>
          <span class="text-[11px] text-zinc-400">Verified Client Deals 2025</span>
        </div>

        <!-- KPI 2 -->
        <div class="rounded-xl border border-obsidian-600 bg-obsidian-800/80 p-5 backdrop-blur-sm">
          <div class="flex items-center justify-between text-xs font-semibold text-zinc-400">
            <span>{{ t('chart_section.kpi_total_spend') }}</span>
            <Target class="h-4 w-4 text-red-400" />
          </div>
          <div class="mt-2 font-mono text-2xl font-bold text-zinc-200">
            Rp 2.284.762
          </div>
          <span class="text-[11px] text-zinc-400">Attributed Ad Spend Across Closing Months</span>
        </div>

        <!-- KPI 3 -->
        <div class="rounded-xl border border-growth-500/30 bg-growth-500/10 p-5 backdrop-blur-sm">
          <div class="flex items-center justify-between text-xs font-semibold text-growth-300">
            <span>{{ t('chart_section.kpi_net_profit') }}</span>
            <TrendingUp class="h-4 w-4 text-growth-400" />
          </div>
          <div class="mt-2 font-mono text-2xl font-bold text-growth-400">
            +Rp 60.003.238
          </div>
          <span class="text-[11px] text-zinc-400">Revenue minus Ad Spend</span>
        </div>

        <!-- KPI 4 -->
        <div class="rounded-xl border border-obsidian-600 bg-obsidian-800/80 p-5 backdrop-blur-sm">
          <div class="flex items-center justify-between text-xs font-semibold text-zinc-400">
            <span>{{ t('chart_section.kpi_roas') }}</span>
            <Award class="h-4 w-4 text-amber-400" />
          </div>
          <div class="mt-2 font-mono text-2xl font-bold text-amber-400">
            27.26x ROAS
          </div>
          <span class="text-[11px] text-zinc-400">Peak single-month ROAS: 95.7x (Dec)</span>
        </div>
      </div>

      <!-- Chart Container -->
      <div class="mt-8 rounded-2xl border border-obsidian-600/80 bg-obsidian-800/90 p-6 sm:p-8 shadow-trifecta">
        <div class="h-[360px] w-full sm:h-[420px]">
          <canvas ref="chartCanvas"></canvas>
        </div>
      </div>

      <!-- Commercial Takeaway Box -->
      <div class="mt-6 rounded-xl border border-obsidian-600 bg-obsidian-800/50 p-6">
        <h4 class="text-sm font-bold text-growth-400">
          {{ t('chart_section.takeaway_title') }}
        </h4>
        <p class="mt-2 text-sm leading-relaxed text-zinc-300">
          {{ t('chart_section.takeaway_body') }}
        </p>
      </div>
    </div>
  </section>
</template>
