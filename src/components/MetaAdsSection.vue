<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Chart, registerables } from 'chart.js'
import { Search, TrendingDown, Filter, ChevronDown, ChevronUp, ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-vue-next'
import AnimatedCounter from './ui/AnimatedCounter.vue'
import metaData from '../data/meta_ads_and_deals.json'

Chart.register(...registerables)

const { t, locale } = useI18n()

const campaigns = ref(metaData.monthly_ad_performance || [])
const searchQuery = ref('')
const activeFilter = ref('all') // 'all' | '2026' | '2025' | 'efficient'
const isExpanded = ref(false)
const cprChartCanvas = ref(null)
let cprChartInstance = null

function formatIDR(val) {
  return 'Rp ' + Number(val).toLocaleString('id-ID')
}

function formatNumber(val) {
  return Number(val).toLocaleString('id-ID')
}

// Filtered campaigns
const filteredCampaigns = computed(() => {
  return campaigns.value.filter((item) => {
    // Search match
    const q = searchQuery.value.toLowerCase().trim()
    const matchesSearch = !q ||
      item.campaign_name.toLowerCase().includes(q) ||
      item.period.toLowerCase().includes(q)

    if (!matchesSearch) return false

    // Category filter
    if (activeFilter.value === '2026') {
      return item.period.includes('2026')
    }
    if (activeFilter.value === '2025') {
      return item.period.includes('2025')
    }
    if (activeFilter.value === 'efficient') {
      return item.cost_per_result <= 12000
    }
    return true
  })
})

// Displayed items with expand/collapse
const displayedCampaigns = computed(() => {
  if (isExpanded.value || filteredCampaigns.value.length <= 8) {
    return filteredCampaigns.value
  }
  return filteredCampaigns.value.slice(0, 8)
})

// Initialize CPR Efficiency Trend Chart
function initCprChart() {
  if (!cprChartCanvas.value) return
  if (cprChartInstance) {
    cprChartInstance.destroy()
  }

  const ctx = cprChartCanvas.value.getContext('2d')
  
  // Extract chronological data points
  const labels = campaigns.value.map(c => {
    return c.period.replace(' 2025', " '25").replace(' 2026', " '26")
  })
  const cprData = campaigns.value.map(c => c.cost_per_result)

  cprChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: locale.value === 'id' ? 'Biaya Per Hasil / CPR (Rp)' : 'Cost Per Result / CPR (IDR)',
          data: cprData,
          borderColor: '#18181b', // Ink black line
          backgroundColor: 'rgba(24, 24, 27, 0.05)',
          fill: true,
          tension: 0.35,
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: '#18181b',
          pointHoverRadius: 6,
          pointHoverBackgroundColor: '#18181b'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: '#18181b',
            font: { family: "'Inter', sans-serif", size: 11, weight: '500' },
            usePointStyle: true
          }
        },
        tooltip: {
          backgroundColor: '#ffffff',
          titleColor: '#18181b',
          bodyColor: '#18181b',
          borderColor: 'rgba(0, 0, 0, 0.1)',
          borderWidth: 1,
          padding: 10,
          callbacks: {
            title: function(context) {
              const idx = context[0].dataIndex
              return campaigns.value[idx]?.campaign_name || context[0].label
            },
            label: function(context) {
              const idx = context.dataIndex
              const item = campaigns.value[idx]
              return [
                `CPR: ${formatIDR(item.cost_per_result)}`,
                `Spent: ${formatIDR(item.amount_spent)}`,
                `Messaging Results: ${item.results_messaging} chats`
              ]
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: '#71717a',
            font: { family: "'Inter', sans-serif", size: 10 },
            maxRotation: 45,
            minRotation: 45,
            autoSkip: true,
            maxTicksLimit: 14
          }
        },
        y: {
          grid: { color: 'rgba(0, 0, 0, 0.04)' },
          ticks: {
            color: '#71717a',
            font: { family: "'JetBrains Mono', monospace", size: 10 },
            callback: function(val) {
              return 'Rp ' + (val >= 1000 ? (val / 1000).toFixed(0) + 'k' : val)
            }
          }
        }
      }
    }
  })
}

onMounted(() => {
  initCprChart()
})

watch(() => locale.value, () => {
  initCprChart()
})
</script>

<template>
  <section id="ads" class="py-14 sm:py-20 px-6 sm:px-10 bg-white">
    <div class="mx-auto max-w-5xl space-y-12">
      
      <!-- Section Header -->
      <div class="space-y-3" data-aos="fade-up">
        <div class="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-zinc-700">
          <Sparkles class="h-3 w-3 text-zinc-900" />
          <span>Meta Ads Manager Performance Audit</span>
        </div>
        <h2 class="font-serif text-2xl sm:text-3xl lg:text-4xl text-zinc-900 leading-snug font-normal">
          {{ locale === 'id' 
            ? 'Track Record 27 Kampanye Meta Ads & Optimasi CPR'
            : 'Track Record of 27 Meta Ads Campaigns & CPR Optimization'
          }}
        </h2>
        <p class="text-xs sm:text-sm text-zinc-500 max-w-3xl leading-relaxed">
          {{ locale === 'id'
            ? 'Transparansi data riil langsung dari Ads Manager. Dari pengujian audiens ABO hingga optimasi kreatif terarah yang berhasil memangkas biaya per hasil chat WhatsApp dari Rp 22.500 turun drastis hingga Rp 3.612/pesan.'
            : 'Real documented campaign analytics directly from Ads Manager. From ABO audience testing to laser-targeted creative optimization that slashed WhatsApp messaging cost from Rp 22.500 down to Rp 3.612/inquiry.'
          }}
        </p>
      </div>

      <!-- Live Stats Ribbon with Scrolling Odometer Numbers -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4" data-aos="fade-up">
        <div class="rounded-xl border border-zinc-200/80 bg-zinc-50/60 p-4">
          <span class="text-[10px] font-semibold uppercase tracking-editorial text-zinc-400">
            {{ locale === 'id' ? 'Total Belanja Iklan' : 'Total Ad Spend' }}
          </span>
          <div class="mt-1 font-mono text-lg sm:text-2xl font-bold text-zinc-900">
            <AnimatedCounter prefix="Rp " value="8.75" suffix="M+" :duration="1300" />
          </div>
          <span class="text-[10px] text-zinc-400">
            {{ locale === 'id' ? '27 kampanye terekam' : '27 documented campaigns' }}
          </span>
        </div>
        <div class="rounded-xl border border-zinc-200/80 bg-zinc-50/60 p-4">
          <span class="text-[10px] font-semibold uppercase tracking-editorial text-zinc-400">
            {{ locale === 'id' ? 'Total Akun Dijangkau' : 'Total Accounts Reached' }}
          </span>
          <div class="mt-1 font-mono text-lg sm:text-2xl font-bold text-zinc-900">
            <AnimatedCounter value="218.070" :suffix="locale === 'id' ? ' Akun' : ' Accounts'" :duration="1500" />
          </div>
          <span class="text-[10px] text-zinc-400">
            {{ locale === 'id' ? 'Audiens unik terverifikasi' : 'Verified unique audiences' }}
          </span>
        </div>
        <div class="rounded-xl border border-zinc-200/80 bg-zinc-50/60 p-4">
          <span class="text-[10px] font-semibold uppercase tracking-editorial text-zinc-400">
            {{ locale === 'id' ? 'Hasil Konsultasi (Leads)' : 'Consultation Inquiries' }}
          </span>
          <div class="mt-1 font-mono text-lg sm:text-2xl font-bold text-zinc-900">
            <AnimatedCounter value="606" suffix=" Chats" :duration="1400" />
          </div>
          <span class="text-[10px] text-zinc-400">
            {{ locale === 'id' ? 'High-intent inquiries' : 'High-intent inquiries' }}
          </span>
        </div>
        <div class="rounded-xl border border-zinc-200/80 bg-zinc-50/60 p-4">
          <span class="text-[10px] font-semibold uppercase tracking-editorial text-zinc-400">
            {{ locale === 'id' ? 'CPR Terendah (Rekor)' : 'Lowest CPR (Record)' }}
          </span>
          <div class="mt-1 font-mono text-lg sm:text-2xl font-bold text-zinc-900">
            <AnimatedCounter prefix="Rp " value="3.612" :duration="1600" />
          </div>
          <span class="text-[10px] text-zinc-400">
            {{ locale === 'id' ? 'Efisiensi Mei 2026' : 'May 2026 efficiency record' }}
          </span>
        </div>
      </div>

      <!-- Chart Jenis Lain: CPR Efficiency Curve Chart -->
      <div class="rounded-2xl border border-zinc-200/80 bg-white p-5 sm:p-7 space-y-4" data-aos="fade-up">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-zinc-100">
          <div>
            <h3 class="text-xs sm:text-sm font-semibold text-zinc-900 uppercase tracking-editorial">
              {{ locale === 'id' ? 'Kurva Optimasi CPR (Cost Per Result)' : 'Cost Per Result (CPR) Optimization Curve' }}
            </h3>
            <p class="text-[11px] text-zinc-400">
              {{ locale === 'id' ? 'Tren efisiensi biaya percakapan per kampanye (2025–2026)' : 'Messaging acquisition efficiency trend per campaign (2025–2026)' }}
            </p>
          </div>
          <div class="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60 self-start sm:self-auto">
            <TrendingDown class="h-3 w-3" />
            <span>-84% Rekor Efisiensi Biaya</span>
          </div>
        </div>

        <div class="h-[240px] sm:h-[280px] w-full">
          <canvas ref="cprChartCanvas"></canvas>
        </div>
      </div>

      <!-- Interactive Meta Ads Manager Data Table -->
      <div id="ads-table" class="space-y-4" data-aos="fade-up">
        <!-- Table Toolbar -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <!-- Filter Tabs -->
          <div class="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              @click="activeFilter = 'all'"
              :class="[
                'rounded-lg px-3 py-1.5 font-medium transition-colors',
                activeFilter === 'all' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:text-black'
              ]"
            >
              {{ locale === 'id' ? 'Semua (27)' : 'All (27)' }}
            </button>
            <button
              @click="activeFilter = '2026'"
              :class="[
                'rounded-lg px-3 py-1.5 font-medium transition-colors',
                activeFilter === '2026' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:text-black'
              ]"
            >
              {{ locale === 'id' ? 'Tahun 2026 (14)' : 'Year 2026 (14)' }}
            </button>
            <button
              @click="activeFilter = '2025'"
              :class="[
                'rounded-lg px-3 py-1.5 font-medium transition-colors',
                activeFilter === '2025' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:text-black'
              ]"
            >
              {{ locale === 'id' ? 'Tahun 2025 (13)' : 'Year 2025 (13)' }}
            </button>
            <button
              @click="activeFilter = 'efficient'"
              :class="[
                'rounded-lg px-3 py-1.5 font-medium transition-colors',
                activeFilter === 'efficient' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:text-black'
              ]"
            >
              {{ locale === 'id' ? 'CPR < Rp 12k' : 'CPR < Rp 12k' }}
            </button>
          </div>

          <!-- Search Input -->
          <div class="relative w-full sm:w-64">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="locale === 'id' ? 'Cari nama kampanye...' : 'Filter campaign name...'"
              class="w-full rounded-lg border border-zinc-200 bg-white py-1.5 pl-8 pr-3 text-xs text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500"
            />
          </div>
        </div>

        <!-- Table Container -->
        <div class="overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-xs">
          <table class="w-full text-left text-xs">
            <thead class="bg-zinc-50/80 border-b border-zinc-200/80 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              <tr>
                <th class="py-3 px-4">{{ locale === 'id' ? 'Nama Kampanye' : 'Campaign Name' }}</th>
                <th class="py-3 px-4">{{ locale === 'id' ? 'Periode' : 'Period' }}</th>
                <th class="py-3 px-4 text-right">Ad Spend</th>
                <th class="py-3 px-4 text-right">Reach</th>
                <th class="py-3 px-4 text-right">{{ locale === 'id' ? 'Hasil (Chat)' : 'Results (Inquiries)' }}</th>
                <th class="py-3 px-4 text-right">Cost Per Result (CPR)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-zinc-100 font-normal">
              <tr
                v-for="(row, idx) in displayedCampaigns"
                :key="idx"
                class="hover:bg-zinc-50/70 transition-colors"
              >
                <!-- Campaign Name -->
                <td class="py-3 px-4 font-medium text-zinc-900">
                  <div class="flex items-center gap-2">
                    <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                    <span>{{ row.campaign_name }}</span>
                  </div>
                </td>

                <!-- Period -->
                <td class="py-3 px-4 text-zinc-500 font-mono text-[11px]">
                  {{ row.period }}
                </td>

                <!-- Spend -->
                <td class="py-3 px-4 text-right font-mono font-medium text-zinc-800">
                  {{ formatIDR(row.amount_spent) }}
                </td>

                <!-- Reach -->
                <td class="py-3 px-4 text-right font-mono text-zinc-600">
                  {{ formatNumber(row.reach) }}
                </td>

                <!-- Results -->
                <td class="py-3 px-4 text-right font-mono font-semibold text-zinc-900">
                  {{ row.results_messaging }}
                </td>

                <!-- CPR with efficiency badge -->
                <td class="py-3 px-4 text-right">
                  <span
                    :class="[
                      'inline-block font-mono font-medium px-2 py-0.5 rounded text-[11px]',
                      row.cost_per_result <= 10000
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-bold'
                        : row.cost_per_result <= 16000
                        ? 'bg-zinc-100 text-zinc-800'
                        : 'text-zinc-500'
                    ]"
                  >
                    {{ formatIDR(row.cost_per_result) }}
                  </span>
                </td>
              </tr>
              <tr v-if="displayedCampaigns.length === 0">
                <td colspan="6" class="py-8 text-center text-zinc-400 text-xs">
                  {{ locale === 'id' ? 'Tidak ditemukan kampanye yang sesuai kata kunci pencarian.' : 'No campaigns found matching search query.' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Expand / Collapse All 27 Button -->
        <div v-if="filteredCampaigns.length > 8" class="flex justify-center pt-2">
          <button
            @click="isExpanded = !isExpanded"
            class="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-5 py-2 text-xs font-medium text-zinc-700 hover:border-zinc-400 hover:text-black transition-colors shadow-xs"
          >
            <span>
              {{ isExpanded 
                ? (locale === 'id' ? 'Sembunyikan Sebagian' : 'Collapse List')
                : (locale === 'id' ? `Tampilkan Semua ${filteredCampaigns.length} Kampanye` : `Show All ${filteredCampaigns.length} Campaigns`)
              }}
            </span>
            <ChevronUp v-if="isExpanded" class="h-3.5 w-3.5" />
            <ChevronDown v-else class="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

    </div>
  </section>
</template>
