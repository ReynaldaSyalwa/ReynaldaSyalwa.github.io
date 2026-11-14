<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { CheckCircle2, Search, ExternalLink, FileSpreadsheet } from 'lucide-vue-next'

const emit = defineEmits(['open-modal'])
const { t } = useI18n()
const searchQuery = ref('')

const deals = [
  {
    no: 1,
    month: 'Januari 2025',
    client: 'Agus Susanto',
    service: 'Sertifikasi ISO & Konsultasi Manajemen',
    ad_spend: 654790,
    deal_value: 5550000,
    status: 'DEAL',
    roas: '8.5x'
  },
  {
    no: 2,
    month: 'November 2025',
    client: 'Pak Ady (Yayasan KPM Hadist)',
    service: 'Layanan Sertifikasi ISO Manajemen Mutu',
    ad_spend: 407602,
    deal_value: 9990000,
    status: 'DEAL',
    roas: '24.5x'
  },
  {
    no: 3,
    month: 'November 2025',
    client: 'Hermawan',
    service: 'Paket Sertifikasi Manajemen Bisnis',
    ad_spend: 407602,
    deal_value: 8658000,
    status: 'DEAL',
    roas: '21.2x'
  },
  {
    no: 4,
    month: 'November 2025',
    client: 'Pak Yuda (Yayasan Nurul Anwar)',
    service: 'Sertifikasi ISO & Verifikasi Legalitas Dokumen',
    ad_spend: 407602,
    deal_value: 6660000,
    status: 'DEAL',
    roas: '16.3x'
  },
  {
    no: 5,
    month: 'Desember 2025',
    client: '(Pak Khoirul) Yayasan Al-barokah',
    service: 'Paket Sertifikasi Institusional Skala Besar',
    ad_spend: 328468,
    deal_value: 31430000,
    status: 'DEAL',
    roas: '95.7x'
  }
]

function formatIDR(val) {
  return 'Rp ' + Number(val).toLocaleString('id-ID')
}

const filteredDeals = computed(() => {
  if (!searchQuery.value.trim()) return deals
  const q = searchQuery.value.toLowerCase()
  return deals.filter(d => 
    d.client.toLowerCase().includes(q) ||
    d.service.toLowerCase().includes(q) ||
    d.month.toLowerCase().includes(q)
  )
})

const totalRevenue = computed(() => {
  return filteredDeals.value.reduce((acc, curr) => acc + curr.deal_value, 0)
})
</script>

<template>
  <section id="deals" class="relative py-20 border-t border-obsidian-600/70 bg-obsidian-950">
    <div class="mx-auto max-w-7xl px-6 sm:px-8">
      <!-- Section Header -->
      <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-growth-400">
            {{ t('deals_section.tag') }}
          </span>
          <h2 class="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {{ t('deals_section.title') }}
          </h2>
          <p class="mt-3 max-w-2xl text-base text-zinc-400">
            {{ t('deals_section.desc') }}
          </p>
        </div>

        <!-- Button to open proof sheet -->
        <button
          @click="emit('open-modal', 'sheet')"
          class="inline-flex items-center gap-2 rounded-xl border border-growth-500/30 bg-growth-500/10 px-4 py-2.5 text-xs font-semibold text-growth-300 transition-all hover:bg-growth-500/20"
        >
          <FileSpreadsheet class="h-4 w-4 text-growth-400" />
          <span>{{ t('deals_section.btn_view_sheet') }}</span>
          <ExternalLink class="h-3.5 w-3.5" />
        </button>
      </div>

      <!-- Search & Filters -->
      <div class="mt-8 flex items-center justify-between">
        <div class="relative w-full max-w-xs">
          <Search class="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="t('deals_section.search_placeholder')"
            class="w-full rounded-xl border border-obsidian-600 bg-obsidian-800/80 py-2.5 pl-10 pr-4 text-xs text-zinc-200 placeholder-zinc-500 focus:border-growth-500 focus:outline-none"
          />
        </div>
        <div class="text-xs text-zinc-400">
          Showing <span class="font-bold text-white">{{ filteredDeals.length }}</span> of {{ deals.length }} Deals
        </div>
      </div>

      <!-- Static Responsive Table -->
      <div class="mt-4 overflow-hidden rounded-2xl border border-obsidian-600/80 bg-obsidian-800/60 shadow-trifecta">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm text-zinc-300">
            <thead class="border-b border-obsidian-600 bg-obsidian-800 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              <tr>
                <th scope="col" class="py-4 pl-6 pr-3">{{ t('deals_section.col_no') }}</th>
                <th scope="col" class="px-3 py-4">{{ t('deals_section.col_month') }}</th>
                <th scope="col" class="px-3 py-4">{{ t('deals_section.col_client') }}</th>
                <th scope="col" class="px-3 py-4">{{ t('deals_section.col_service') }}</th>
                <th scope="col" class="px-3 py-4 text-right">{{ t('deals_section.col_ad_spend') }}</th>
                <th scope="col" class="px-3 py-4 text-right">{{ t('deals_section.col_deal_value') }}</th>
                <th scope="col" class="py-4 pl-3 pr-6 text-center">{{ t('deals_section.col_status') }}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-obsidian-600/60 font-sans">
              <tr
                v-for="d in filteredDeals"
                :key="d.no"
                class="transition-colors hover:bg-obsidian-700/40"
              >
                <td class="py-4 pl-6 pr-3 font-mono text-xs text-zinc-500">{{ d.no }}</td>
                <td class="whitespace-nowrap px-3 py-4 font-mono text-xs font-medium text-zinc-300">{{ d.month }}</td>
                <td class="px-3 py-4 font-bold text-white">
                  {{ d.client }}
                </td>
                <td class="px-3 py-4 text-xs text-zinc-400">{{ d.service }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-right font-mono text-xs text-red-400">
                  {{ formatIDR(d.ad_spend) }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-right font-mono font-bold text-growth-400">
                  {{ formatIDR(d.deal_value) }}
                  <span class="ml-1 text-[10px] text-zinc-400">({{ d.roas }})</span>
                </td>
                <td class="py-4 pl-3 pr-6 text-center">
                  <span class="inline-flex items-center gap-1.5 rounded-full border border-growth-500/40 bg-growth-500/10 px-3 py-1 text-xs font-bold text-growth-400">
                    <CheckCircle2 class="h-3.5 w-3.5" />
                    {{ d.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Summary Bar Footer -->
        <div class="flex flex-col justify-between gap-4 border-t border-obsidian-600 bg-obsidian-800/90 px-6 py-4 sm:flex-row sm:items-center">
          <div class="text-xs text-zinc-400">
            {{ t('deals_section.summary_count') }}
            <strong class="text-white">{{ filteredDeals.length }} Klien Berhasil Closing</strong>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xs uppercase tracking-wider text-zinc-400">{{ t('deals_section.summary_sum') }}</span>
            <span class="font-mono text-xl font-extrabold text-growth-400">
              {{ formatIDR(totalRevenue) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
