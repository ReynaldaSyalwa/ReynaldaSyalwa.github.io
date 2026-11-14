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
          backgroundColor: '#203524', // Zendesk Forest Canopy
          borderColor: '#d1f470',     // Zendesk Electric Lime
          borderWidth: 1.5,
          borderRadius: 0,            // Strict Zendesk flat 0px
          barPercentage: 0.6,
          order: 2
        },
        {
          label: t('chart_section.legend_spend'),
          data: adSpendData,
          backgroundColor: '#90918c', // Zendesk Stone Neutral
          borderColor: '#11110d',     // Zendesk Near-Black Ink
          borderWidth: 1,
          borderRadius: 0,            // Strict Zendesk flat 0px
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
            color: '#11110d',
            font: {
              family: "'Inter', sans-serif",
              size: 13,
              weight: '600'
            },
            usePointStyle: true,
            padding: 20
          }
        },
        tooltip: {
          backgroundColor: '#ffffff',
          titleColor: '#11110d',
          bodyColor: '#11110d',
          borderColor: 'rgba(17, 17, 13, 0.2)',
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
            color: 'rgba(17, 17, 13, 0.06)'
          },
          ticks: {
            color: '#11110d',
            font: {
              family: "'Inter', sans-serif",
              size: 12
            }
          }
        },
        y: {
          grid: {
            color: 'rgba(17, 17, 13, 0.08)'
          },
          ticks: {
            color: '#11110d',
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
  <section id="chart" class="relative py-20 border-t border-zendesk-divider bg-zendesk-white">
    <div class="mx-auto max-w-7xl px-6 sm:px-8">
      <!-- Section Header -->
      <div class="max-w-3xl">
        <span class="inline-block rounded-tags bg-zendesk-warm px-3 py-1 text-xs font-semibold uppercase tracking-zendesk text-zendesk-forest">
          {{ t('chart_section.tag') }}
        </span>
        <h2 class="mt-3 text-3xl font-semibold tracking-zendesk text-zendesk-ink sm:text-4xl">
          {{ t('chart_section.title') }}
        </h2>
        <p class="mt-3 text-base font-normal leading-relaxed text-zendesk-ink/80 tracking-zendesk">
          {{ t('chart_section.desc') }}
        </p>
      </div>

      <!-- 4 KPI Summary Cards (Zendesk Flat Cards: 0px radius, #f5f5f2 background, zero shadow) -->
      <div class="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <!-- KPI 1 -->
        <div class="rounded-cards border border-zendesk-divider bg-zendesk-warm p-5">
          <div class="flex items-center justify-between text-xs font-semibold uppercase tracking-zendesk text-zendesk-stone">
            <span>{{ t('chart_section.kpi_total_revenue') }}</span>
            <DollarSign class="h-4 w-4 text-zendesk-forest" />
          </div>
          <div class="mt-2 font-mono text-2xl font-bold text-zendesk-ink">
            Rp 62.288.000
          </div>
          <span class="text-[11px] text-zendesk-ink/60">Verified Client Deals 2025</span>
        </div>

        <!-- KPI 2 -->
        <div class="rounded-cards border border-zendesk-divider bg-zendesk-warm p-5">
          <div class="flex items-center justify-between text-xs font-semibold uppercase tracking-zendesk text-zendesk-stone">
            <span>{{ t('chart_section.kpi_total_spend') }}</span>
            <Target class="h-4 w-4 text-zendesk-stone" />
          </div>
          <div class="mt-2 font-mono text-2xl font-bold text-zendesk-ink">
            Rp 2.284.762
          </div>
          <span class="text-[11px] text-zendesk-ink/60">Attributed Ad Spend in Closing Months</span>
        </div>

        <!-- KPI 3 -->
        <div class="rounded-cards border border-zendesk-forest bg-zendesk-warm p-5">
          <div class="flex items-center justify-between text-xs font-semibold uppercase tracking-zendesk text-zendesk-forest">
            <span>{{ t('chart_section.kpi_net_profit') }}</span>
            <TrendingUp class="h-4 w-4 text-zendesk-forest" />
          </div>
          <div class="mt-2 font-mono text-2xl font-bold text-zendesk-forest">
            +Rp 60.003.238
          </div>
          <span class="text-[11px] text-zendesk-ink/60">Revenue minus Ad Spend</span>
        </div>

        <!-- KPI 4 -->
        <div class="rounded-cards border border-zendesk-divider bg-zendesk-warm p-5">
          <div class="flex items-center justify-between text-xs font-semibold uppercase tracking-zendesk text-zendesk-stone">
            <span>{{ t('chart_section.kpi_roas') }}</span>
            <Award class="h-4 w-4 text-zendesk-forest" />
          </div>
          <div class="mt-2 font-mono text-2xl font-bold text-zendesk-ink">
            27.26x ROAS
          </div>
          <span class="text-[11px] text-zendesk-ink/60">Peak single-month ROAS: 95.7x (Dec)</span>
        </div>
      </div>

      <!-- Chart Container (Flat 0px card, #f5f5f2 warm surface, zero shadow) -->
      <div class="mt-8 rounded-cards border border-zendesk-divider bg-zendesk-warm p-6 sm:p-8">
        <div class="h-[360px] w-full sm:h-[420px]">
          <canvas ref="chartCanvas"></canvas>
        </div>
      </div>

      <!-- Commercial Takeaway Box (Flat 0px card with Forest accent border) -->
      <div class="mt-6 rounded-cards border-l-4 border-l-zendesk-forest border-y border-r border-zendesk-divider bg-zendesk-warm p-6">
        <h4 class="text-sm font-semibold tracking-zendesk text-zendesk-forest">
          {{ t('chart_section.takeaway_title') }}
        </h4>
        <p class="mt-2 text-sm leading-relaxed text-zendesk-ink/80 tracking-zendesk">
          {{ t('chart_section.takeaway_body') }}
        </p>
      </div>
    </div>
  </section>
</template>
