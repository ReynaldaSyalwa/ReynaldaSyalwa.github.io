<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Sparkles, ExternalLink, Image as ImageIcon, MessageSquare } from 'lucide-vue-next'
import adsData from '../data/meta_ads_and_deals.json'

const emit = defineEmits(['open-modal'])
const { t } = useI18n()
const selectedFilter = ref('all')

const allCampaigns = adsData.monthly_ad_performance

const filteredCampaigns = computed(() => {
  if (selectedFilter.value === '2025') {
    return allCampaigns.filter(c => c.period.includes('2025'))
  }
  if (selectedFilter.value === '2026') {
    return allCampaigns.filter(c => c.period.includes('2026'))
  }
  return allCampaigns
})

function formatIDR(val) {
  return 'Rp ' + Number(val).toLocaleString('id-ID')
}
</script>

<template>
  <section id="ads" class="relative py-20 border-t border-obsidian-600/70 bg-obsidian-900/60">
    <div class="mx-auto max-w-7xl px-6 sm:px-8">
      <!-- Section Header -->
      <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-growth-400">
            {{ t('ads_section.tag') }}
          </span>
          <h2 class="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {{ t('ads_section.title') }}
          </h2>
          <p class="mt-3 max-w-2xl text-base text-zinc-400">
            {{ t('ads_section.desc') }}
          </p>
        </div>

        <!-- Button to open proof dashboard modal -->
        <button
          @click="emit('open-modal', 'ads')"
          class="inline-flex items-center gap-2 rounded-xl border border-sky-500/30 bg-sky-500/10 px-4 py-2.5 text-xs font-semibold text-sky-300 transition-all hover:bg-sky-500/20"
        >
          <ImageIcon class="h-4 w-4 text-sky-400" />
          <span>{{ t('ads_section.btn_view_dashboard') }}</span>
          <ExternalLink class="h-3.5 w-3.5" />
        </button>
      </div>

      <!-- Year Filter Tabs -->
      <div class="mt-8 flex items-center gap-3">
        <button
          @click="selectedFilter = 'all'"
          :class="['rounded-full px-4 py-1.5 text-xs font-semibold transition-all', selectedFilter === 'all' ? 'bg-white text-black' : 'border border-obsidian-600 bg-obsidian-800 text-zinc-400 hover:text-white']"
        >
          {{ t('ads_section.tab_all') }}
        </button>
        <button
          @click="selectedFilter = '2025'"
          :class="['rounded-full px-4 py-1.5 text-xs font-semibold transition-all', selectedFilter === '2025' ? 'bg-white text-black' : 'border border-obsidian-600 bg-obsidian-800 text-zinc-400 hover:text-white']"
        >
          {{ t('ads_section.tab_2025') }}
        </button>
        <button
          @click="selectedFilter = '2026'"
          :class="['rounded-full px-4 py-1.5 text-xs font-semibold transition-all', selectedFilter === '2026' ? 'bg-white text-black' : 'border border-obsidian-600 bg-obsidian-800 text-zinc-400 hover:text-white']"
        >
          {{ t('ads_section.tab_2026') }}
        </button>
      </div>

      <!-- Highlights Banner -->
      <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div class="rounded-xl border border-growth-500/30 bg-growth-500/10 p-4">
          <div class="flex items-center gap-2 text-xs font-semibold text-growth-300">
            <Sparkles class="h-3.5 w-3.5 text-growth-400" />
            <span>CPR Terendah 2026 (Rekor Efisiensi)</span>
          </div>
          <div class="mt-2 font-mono text-2xl font-extrabold text-growth-400">
            Rp 3.612 <span class="text-xs font-normal text-zinc-400">/ pesan</span>
          </div>
          <p class="mt-1 text-[11px] text-zinc-400">Ads NSM Mei 2026 MBG (10 hasil dari budget Rp 36.121)</p>
        </div>

        <div class="rounded-xl border border-growth-500/30 bg-growth-500/10 p-4">
          <div class="flex items-center gap-2 text-xs font-semibold text-growth-300">
            <Sparkles class="h-3.5 w-3.5 text-growth-400" />
            <span>CPR Terendah 2025</span>
          </div>
          <div class="mt-2 font-mono text-2xl font-extrabold text-growth-400">
            Rp 5.435 <span class="text-xs font-normal text-zinc-400">/ pesan</span>
          </div>
          <p class="mt-1 text-[11px] text-zinc-400">Ads November - mbg 2025 (75 pesan, jangkauan 12.611)</p>
        </div>

        <div class="rounded-xl border border-sky-500/30 bg-sky-500/10 p-4">
          <div class="flex items-center gap-2 text-xs font-semibold text-sky-300">
            <MessageSquare class="h-3.5 w-3.5 text-sky-400" />
            <span>Rekor Volume Hasil Pesan</span>
          </div>
          <div class="mt-2 font-mono text-2xl font-extrabold text-sky-400">
            75 Percakapan
          </div>
          <p class="mt-1 text-[11px] text-zinc-400">November 2025 (Menghasilkan omzet deal Rp 25.3 Juta)</p>
        </div>
      </div>

      <!-- Campaign Table -->
      <div class="mt-6 overflow-hidden rounded-2xl border border-obsidian-600/80 bg-obsidian-800/60 shadow-trifecta">
        <div class="max-h-[520px] overflow-y-auto overflow-x-auto">
          <table class="w-full text-left text-sm text-zinc-300">
            <thead class="sticky top-0 z-10 border-b border-obsidian-600 bg-obsidian-800 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              <tr>
                <th scope="col" class="py-3.5 pl-6 pr-3">Periode</th>
                <th scope="col" class="px-3 py-3.5">Nama Kampanye</th>
                <th scope="col" class="px-3 py-3.5 text-right">{{ t('ads_section.metric_spent') }}</th>
                <th scope="col" class="px-3 py-3.5 text-right">{{ t('ads_section.metric_spent_tax') }}</th>
                <th scope="col" class="px-3 py-3.5 text-center">{{ t('ads_section.metric_results') }}</th>
                <th scope="col" class="px-3 py-3.5 text-right">{{ t('ads_section.metric_cpr') }}</th>
                <th scope="col" class="px-3 py-3.5 text-right">{{ t('ads_section.metric_reach') }}</th>
                <th scope="col" class="py-3.5 pl-3 pr-6 text-right">{{ t('ads_section.metric_clicks') }}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-obsidian-600/60 font-sans">
              <tr
                v-for="c in filteredCampaigns"
                :key="c.campaign_name + c.period"
                class="transition-colors hover:bg-obsidian-700/40"
              >
                <td class="whitespace-nowrap py-3 pl-6 pr-3 font-mono text-xs text-growth-400">{{ c.period }}</td>
                <td class="px-3 py-3 font-semibold text-white">
                  {{ c.campaign_name }}
                </td>
                <td class="whitespace-nowrap px-3 py-3 text-right font-mono text-xs text-zinc-300">
                  {{ formatIDR(c.amount_spent) }}
                </td>
                <td class="whitespace-nowrap px-3 py-3 text-right font-mono text-xs text-zinc-400">
                  {{ formatIDR(c.spent_with_tax) }}
                </td>
                <td class="whitespace-nowrap px-3 py-3 text-center">
                  <span class="inline-flex items-center gap-1 rounded-full bg-growth-500/10 px-2.5 py-0.5 font-mono text-xs font-bold text-growth-400">
                    {{ c.results_messaging }} pesan
                  </span>
                </td>
                <td class="whitespace-nowrap px-3 py-3 text-right font-mono text-xs font-semibold text-sky-400">
                  {{ formatIDR(c.cost_per_result) }}
                </td>
                <td class="whitespace-nowrap px-3 py-3 text-right font-mono text-xs text-zinc-400">
                  {{ c.reach.toLocaleString('id-ID') }}
                </td>
                <td class="whitespace-nowrap py-3 pl-3 pr-6 text-right font-mono text-xs text-zinc-300">
                  {{ c.link_clicks }} klik
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>
