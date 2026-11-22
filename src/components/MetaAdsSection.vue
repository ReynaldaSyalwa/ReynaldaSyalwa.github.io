<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Chart, registerables } from 'chart.js'
import { Search, TrendingDown, ChevronDown, ChevronUp, Sparkles, CalendarDays } from 'lucide-vue-next'
import AnimatedCounter from './ui/AnimatedCounter.vue'
import { CAMPAIGNS, IWASH_CAMPAIGNS, YEAR_FILTER, formatIDR, jutaStr } from '@/composables/usePortfolio'

Chart.register(...registerables)

const { t, locale } = useI18n()

const searchQuery = ref('')
const activeFilter = ref('all') // 'all' | '2026' | '2025' | 'efficient'
const isExpanded = ref(false)
const cprChartCanvas = ref(null)
let cprChartInstance = null

function formatNumber(val) {
  return Number(val).toLocaleString('id-ID')
}

/* ── agregat Meta ISO (dihitung, bukan hardcode) ───────────────────────────── */
const metaTotals = computed(() => {
  const spend = CAMPAIGNS.reduce((s, c) => s + c.amount_spent, 0)
  const reach = CAMPAIGNS.reduce((s, c) => s + c.reach, 0)
  const results = CAMPAIGNS.reduce((s, c) => s + c.results_messaging, 0)
  const cprs = CAMPAIGNS.map(c => c.cost_per_result)
  return {
    spend,
    spendJt: jutaStr(spend, locale.value, 2),
    reach,
    results,
    minCpr: Math.min(...cprs),
    count: CAMPAIGNS.length
  }
})

const iwashTotals = computed(() => {
  const spend = IWASH_CAMPAIGNS.reduce((s, c) => s + c.ad_spend, 0)
  const revenue = IWASH_CAMPAIGNS.reduce((s, c) => s + c.revenue, 0)
  const leads = IWASH_CAMPAIGNS.reduce((s, c) => s + c.leads, 0)
  return {
    spend,
    revenue,
    leads,
    roas: +(revenue / spend).toFixed(2)
  }
})

/* ── filter kampanye: ikut YEAR_FILTER global + filter lokal ───────────────── */
const filteredCampaigns = computed(() =>
  CAMPAIGNS.filter(item => {
    const q = searchQuery.value.toLowerCase().trim()
    const matchesSearch =
      !q ||
      item.campaign_name.toLowerCase().includes(q) ||
      item.period.toLowerCase().includes(q)
    if (!matchesSearch) return false

    if (activeFilter.value === 'efficient') return item.cost_per_result <= 12000
    if (activeFilter.value === '2026') return item.period.includes('2026')
    if (activeFilter.value === '2025') return item.period.includes('2025')

    // 'all' tetap menghormati filter periode global
    if (YEAR_FILTER.value !== 'all') return item.period.includes(String(YEAR_FILTER.value))
    return true
  })
)

const displayedCampaigns = computed(() =>
  isExpanded.value || filteredCampaigns.value.length <= 8
    ? filteredCampaigns.value
    : filteredCampaigns.value.slice(0, 8)
)

/* ── CPR curve ─────────────────────────────────────────────────────────────── */
function initCprChart() {
  if (!cprChartCanvas.value) return
  if (cprChartInstance) cprChartInstance.destroy()

  const ctx = cprChartCanvas.value.getContext('2d')
  const labels = CAMPAIGNS.map(c => c.period.replace(' 2025', " '25").replace(' 2026', " '26"))
  const cprData = CAMPAIGNS.map(c => c.cost_per_result)

  cprChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: locale.value === 'id' ? 'Biaya Per Hasil / CPR' : 'Cost Per Result / CPR',
          data: cprData,
          borderColor: '#18181b',
          backgroundColor: 'rgba(24, 24, 27, 0.05)',
          fill: true,
          tension: 0.35,
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: '#18181b',
          pointHoverRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
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
            title: ctx2 => CAMPAIGNS[ctx2[0].dataIndex]?.campaign_name || ctx2[0].label,
            label: ctx2 => {
              const item = CAMPAIGNS[ctx2.dataIndex]
              return [
                `CPR: ${formatIDR(item.cost_per_result)}`,
                `Spent: ${formatIDR(item.amount_spent)}`,
                `${locale.value === 'id' ? 'Hasil pesan' : 'Messaging results'}: ${item.results_messaging}`
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
            callback: v => 'Rp ' + (v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v)
          }
        }
      }
    }
  })
}

onMounted(initCprChart)
onBeforeUnmount(() => cprChartInstance && cprChartInstance.destroy())
watch(() => locale.value, initCprChart)
</script>

<template>
  <section id="ads" class="bg-white px-6 py-14 sm:px-10 sm:py-20">
    <div class="mx-auto max-w-5xl space-y-12">

      <!-- Header -->
      <div class="space-y-3" data-aos="fade-up">
        <div class="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-zinc-700">
          <Sparkles class="h-3 w-3 text-zinc-900" />
          <span>Meta Ads Manager Performance Audit</span>
        </div>
        <h2 class="font-serif text-2xl font-normal leading-snug text-zinc-900 sm:text-3xl lg:text-4xl">
          {{ locale === 'id'
            ? `Track Record ${metaTotals.count} Kampanye Meta Ads & Optimasi CPR`
            : `Track Record of ${metaTotals.count} Meta Ads Campaigns & CPR Optimization` }}
        </h2>
        <p class="max-w-3xl text-xs leading-relaxed text-zinc-500 sm:text-sm">
          {{ locale === 'id'
            ? 'Transparansi data riil langsung dari Ads Manager. Dari pengujian audiens ABO hingga optimasi kreatif terarah yang memangkas biaya per hasil chat WhatsApp dari Rp 22.500 turun drastis hingga Rp 3.612/pesan.'
            : 'Real documented campaign analytics straight from Ads Manager. From ABO audience testing to focused creative optimization that cut WhatsApp cost per inquiry from Rp 22,500 down to Rp 3,612.' }}
        </p>
      </div>

      <!-- Stats ribbon -->
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4" data-aos="fade-up">
        <div class="rounded-xl border border-zinc-200/80 bg-zinc-50/60 p-3.5 sm:p-4">
          <span class="text-[10px] font-semibold uppercase tracking-editorial text-zinc-400">
            {{ locale === 'id' ? 'Total Belanja Iklan' : 'Total Ad Spend' }}
          </span>
          <div class="mt-1 text-lg font-bold text-zinc-900 sm:text-2xl">
            <AnimatedCounter prefix="Rp " :value="metaTotals.spendJt" :suffix="locale === 'id' ? ' Jt+' : 'M+'" :duration="1300" />
          </div>
          <span class="text-[10px] text-zinc-400">
            {{ metaTotals.count }} {{ locale === 'id' ? 'kampanye terekam' : 'documented campaigns' }}
          </span>
        </div>
        <div class="rounded-xl border border-zinc-200/80 bg-zinc-50/60 p-3.5 sm:p-4">
          <span class="text-[10px] font-semibold uppercase tracking-editorial text-zinc-400">
            {{ locale === 'id' ? 'Total Akun Dijangkau' : 'Total Accounts Reached' }}
          </span>
          <div class="mt-1 text-lg font-bold text-zinc-900 sm:text-2xl">
            <AnimatedCounter :value="formatNumber(metaTotals.reach)" :suffix="locale === 'id' ? ' Akun' : ' Accounts'" :duration="1500" />
          </div>
          <span class="text-[10px] text-zinc-400">
            {{ locale === 'id' ? 'Audiens unik terverifikasi' : 'Verified unique audiences' }}
          </span>
        </div>
        <div class="rounded-xl border border-zinc-200/80 bg-zinc-50/60 p-3.5 sm:p-4">
          <span class="text-[10px] font-semibold uppercase tracking-editorial text-zinc-400">
            {{ locale === 'id' ? 'Hasil Konsultasi (Leads)' : 'Consultation Inquiries' }}
          </span>
          <div class="mt-1 text-lg font-bold text-zinc-900 sm:text-2xl">
            <AnimatedCounter :value="String(metaTotals.results)" suffix=" Chats" :duration="1400" />
          </div>
          <span class="text-[10px] text-zinc-400">High-intent inquiries</span>
        </div>
        <div class="rounded-xl border border-zinc-200/80 bg-zinc-50/60 p-3.5 sm:p-4">
          <span class="text-[10px] font-semibold uppercase tracking-editorial text-zinc-400">
            {{ locale === 'id' ? 'CPR Terendah (Rekor)' : 'Lowest CPR (Record)' }}
          </span>
          <div class="mt-1 text-lg font-bold text-zinc-900 sm:text-2xl">
            <AnimatedCounter prefix="Rp " :value="formatNumber(metaTotals.minCpr)" :duration="1600" />
          </div>
          <span class="text-[10px] text-zinc-400">
            {{ locale === 'id' ? 'Efisiensi Mei 2026' : 'May 2026 efficiency record' }}
          </span>
        </div>
      </div>

      <!-- CPR curve -->
      <div class="space-y-4 rounded-2xl border border-zinc-200/80 bg-white p-5 sm:p-7" data-aos="fade-up">
        <div class="flex flex-col justify-between gap-2 border-b border-zinc-100 pb-2 sm:flex-row sm:items-center">
          <div>
            <h3 class="text-xs font-semibold uppercase tracking-editorial text-zinc-900 sm:text-sm">
              {{ locale === 'id' ? 'Kurva Optimasi CPR (Cost Per Result)' : 'Cost Per Result (CPR) Optimization Curve' }}
            </h3>
            <p class="text-[11px] text-zinc-400">
              {{ locale === 'id' ? 'Tren efisiensi biaya percakapan per kampanye (2025–2026)' : 'Messaging acquisition efficiency trend per campaign (2025–2026)' }}
            </p>
          </div>
          <div class="inline-flex items-center gap-1.5 self-start rounded-full border border-emerald-200/60 bg-emerald-50 px-2.5 py-1 font-mono text-[11px] text-emerald-700 sm:self-auto">
            <TrendingDown class="h-3 w-3" />
            <span>{{ locale === 'id' ? '-84% Rekor Efisiensi Biaya' : '-84% Cost Efficiency Record' }}</span>
          </div>
        </div>
        <div class="h-[240px] w-full sm:h-[280px]">
          <canvas ref="cprChartCanvas"></canvas>
        </div>
      </div>

      <!-- Campaign table -->
      <div id="ads-table" class="space-y-4" data-aos="fade-up">
        <div class="flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
          <div class="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              @click="activeFilter = 'all'"
              class="rounded-lg px-3 py-1.5 font-medium transition-colors"
              :class="activeFilter === 'all' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:text-black'"
            >
              {{ t('ads_section.tab_all') }}
            </button>
            <button
              @click="activeFilter = '2026'"
              class="rounded-lg px-3 py-1.5 font-medium transition-colors"
              :class="activeFilter === '2026' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:text-black'"
            >
              {{ t('ads_section.tab_2026') }}
            </button>
            <button
              @click="activeFilter = '2025'"
              class="rounded-lg px-3 py-1.5 font-medium transition-colors"
              :class="activeFilter === '2025' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:text-black'"
            >
              {{ t('ads_section.tab_2025') }}
            </button>
            <button
              @click="activeFilter = 'efficient'"
              class="rounded-lg px-3 py-1.5 font-medium transition-colors"
              :class="activeFilter === 'efficient' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:text-black'"
            >
              CPR &lt; Rp 12k
            </button>
          </div>

          <div class="relative w-full sm:w-64">
            <Search class="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="locale === 'id' ? 'Cari nama kampanye...' : 'Filter campaign name...'"
              class="w-full rounded-lg border border-zinc-200 bg-white py-1.5 pl-8 pr-3 text-xs text-zinc-800 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none"
            />
          </div>
        </div>

        <div class="overflow-x-auto rounded-xl border border-zinc-200 bg-white">
          <table class="w-full text-left text-xs">
            <thead class="border-b border-zinc-200/80 bg-zinc-50/80 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              <tr>
                <th class="px-4 py-3">{{ locale === 'id' ? 'Nama Kampanye' : 'Campaign Name' }}</th>
                <th class="px-4 py-3">{{ locale === 'id' ? 'Periode' : 'Period' }}</th>
                <th class="px-4 py-3 text-right">Ad Spend</th>
                <th class="px-4 py-3 text-right">Reach</th>
                <th class="px-4 py-3 text-right">{{ locale === 'id' ? 'Hasil (Chat)' : 'Results' }}</th>
                <th class="px-4 py-3 text-right">CPR</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-zinc-100 font-normal">
              <tr v-for="(row, idx) in displayedCampaigns" :key="idx" class="transition-colors hover:bg-zinc-50/70">
                <td class="px-4 py-3 font-medium text-zinc-900">
                  <div class="flex items-center gap-2">
                    <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                    <span>{{ row.campaign_name }}</span>
                  </div>
                </td>
                <td class="px-4 py-3 font-mono text-[11px] text-zinc-500">{{ row.period }}</td>
                <td class="px-4 py-3 text-right font-mono font-medium text-zinc-800">{{ formatIDR(row.amount_spent) }}</td>
                <td class="px-4 py-3 text-right font-mono text-zinc-600">{{ formatNumber(row.reach) }}</td>
                <td class="px-4 py-3 text-right font-mono font-semibold text-zinc-900">{{ row.results_messaging }}</td>
                <td class="px-4 py-3 text-right">
                  <span
                    class="inline-block rounded px-2 py-0.5 font-mono text-[11px] font-medium"
                    :class="row.cost_per_result <= 10000
                      ? 'border border-emerald-200/80 bg-emerald-50 font-bold text-emerald-800'
                      : row.cost_per_result <= 16000
                      ? 'bg-zinc-100 text-zinc-800'
                      : 'text-zinc-500'"
                  >
                    {{ formatIDR(row.cost_per_result) }}
                  </span>
                </td>
              </tr>
              <tr v-if="displayedCampaigns.length === 0">
                <td colspan="6" class="py-8 text-center text-xs text-zinc-400">
                  {{ locale === 'id' ? 'Tidak ditemukan kampanye yang sesuai.' : 'No campaigns found.' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="filteredCampaigns.length > 8" class="flex justify-center pt-2">
          <button
            @click="isExpanded = !isExpanded"
            class="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-5 py-2 text-xs font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:text-black"
          >
            <span>
              {{ isExpanded
                ? (locale === 'id' ? 'Sembunyikan Sebagian' : 'Collapse List')
                : (locale === 'id' ? `Tampilkan Semua ${filteredCampaigns.length} Kampanye` : `Show All ${filteredCampaigns.length} Campaigns`) }}
            </span>
            <ChevronUp v-if="isExpanded" class="h-3.5 w-3.5" />
            <ChevronDown v-else class="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <!-- ── IWASH seasonal campaigns (baris bisnis 2) ─────────────────────── -->
      <div id="iwash-ads" class="space-y-4" data-aos="fade-up">
        <div class="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div class="space-y-1.5">
            <div class="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-zinc-700">
              <CalendarDays class="h-3 w-3 text-zinc-900" />
              <span>IWASH Cleaning Service</span>
            </div>
            <h3 class="font-serif text-xl font-normal leading-snug text-zinc-900 sm:text-2xl">
              {{ t('ads_section.iwash_title') }}
            </h3>
            <p class="max-w-2xl text-xs leading-relaxed text-zinc-500">
              {{ t('ads_section.iwash_desc') }}
            </p>
          </div>

          <div class="flex items-center gap-4 font-mono text-xs text-zinc-500">
            <span>{{ iwashTotals.leads }} leads</span>
            <span class="text-zinc-300">|</span>
            <span>Rp {{ (iwashTotals.revenue / 1_000_000).toFixed(2) }} Jt</span>
            <span class="text-zinc-300">|</span>
            <span class="font-bold text-zinc-900">{{ iwashTotals.roas }}x</span>
          </div>
        </div>

        <div class="overflow-hidden rounded-xl border border-zinc-200 bg-white">
          <table class="w-full text-left text-xs">
            <thead class="border-b border-zinc-200/80 bg-zinc-50/80 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              <tr>
                <th class="px-4 py-3">{{ t('ads_section.iwash_col_moment') }}</th>
                <th class="px-4 py-3 text-right">{{ t('ads_section.iwash_col_spend') }}</th>
                <th class="px-4 py-3 text-right">{{ t('ads_section.iwash_col_leads') }}</th>
                <th class="px-4 py-3 text-right">{{ t('ads_section.iwash_col_results') }}</th>
                <th class="px-4 py-3 text-right">{{ t('ads_section.iwash_col_revenue') }}</th>
                <th class="px-4 py-3 text-right">{{ t('ads_section.iwash_col_roas') }}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-zinc-100">
              <tr v-for="c in IWASH_CAMPAIGNS" :key="c.moment" class="transition-colors hover:bg-zinc-50/70">
                <td class="px-4 py-3 font-medium text-zinc-900">
                  {{ locale === 'id' ? c.moment_id : c.moment_en }}
                </td>
                <td class="px-4 py-3 text-right font-mono text-zinc-700">{{ formatIDR(c.ad_spend) }}</td>
                <td class="px-4 py-3 text-right font-mono text-zinc-500">{{ c.leads }}</td>
                <td class="px-4 py-3 text-right font-mono font-semibold text-zinc-900">{{ c.results }}</td>
                <td class="px-4 py-3 text-right font-mono font-semibold text-zinc-900">{{ formatIDR(c.revenue) }}</td>
                <td class="px-4 py-3 text-right">
                  <span class="inline-block rounded bg-zinc-100 px-2 py-0.5 font-mono text-[11px] font-bold text-zinc-900">
                    {{ (c.revenue / c.ad_spend).toFixed(2) }}x
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="border-l-2 border-zinc-800 py-1 pl-4 text-xs leading-relaxed text-zinc-500">
          {{ t('ads_section.iwash_insight') }}
        </p>
      </div>

    </div>
  </section>
</template>
