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
  <section id="ads" class="relative py-20 border-t border-zendesk-divider bg-zendesk-white">
    <div class="mx-auto max-w-7xl px-6 sm:px-8">
      <!-- Section Header -->
      <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <span class="inline-block rounded-tags bg-zendesk-warm px-3 py-1 text-xs font-semibold uppercase tracking-zendesk text-zendesk-forest border border-zendesk-divider">
            {{ t('ads_section.tag') }}
          </span>
          <h2 class="mt-3 text-3xl font-semibold tracking-zendesk text-zendesk-ink sm:text-4xl">
            {{ t('ads_section.title') }}
          </h2>
          <p class="mt-3 max-w-2xl text-base text-zendesk-ink/80 tracking-zendesk leading-relaxed">
            {{ t('ads_section.desc') }}
          </p>
        </div>

        <!-- Button to open proof dashboard modal: Zendesk 16px button -->
        <button
          @click="emit('open-modal', 'ads')"
          class="inline-flex items-center gap-2 rounded-buttons border border-zendesk-ink bg-zendesk-white px-5 py-2.5 text-xs font-semibold tracking-zendesk text-zendesk-ink transition-colors hover:bg-stone-100"
        >
          <ImageIcon class="h-4 w-4 text-zendesk-forest" />
          <span>{{ t('ads_section.btn_view_dashboard') }}</span>
          <ExternalLink class="h-3.5 w-3.5 text-zendesk-stone" />
        </button>
      </div>

      <!-- Year Filter Tabs (Zendesk 16px button radii) -->
      <div class="mt-8 flex items-center gap-2">
        <button
          @click="selectedFilter = 'all'"
          :class="[
            'rounded-buttons px-4 py-2 text-xs font-semibold tracking-zendesk transition-all',
            selectedFilter === 'all'
              ? 'bg-zendesk-forest text-zendesk-lime'
              : 'border border-zendesk-divider bg-zendesk-warm text-zendesk-ink hover:bg-stone-200'
          ]"
        >
          {{ t('ads_section.tab_all') }}
        </button>
        <button
          @click="selectedFilter = '2025'"
          :class="[
            'rounded-buttons px-4 py-2 text-xs font-semibold tracking-zendesk transition-all',
            selectedFilter === '2025'
              ? 'bg-zendesk-forest text-zendesk-lime'
              : 'border border-zendesk-divider bg-zendesk-warm text-zendesk-ink hover:bg-stone-200'
          ]"
        >
          {{ t('ads_section.tab_2025') }}
        </button>
        <button
          @click="selectedFilter = '2026'"
          :class="[
            'rounded-buttons px-4 py-2 text-xs font-semibold tracking-zendesk transition-all',
            selectedFilter === '2026'
              ? 'bg-zendesk-forest text-zendesk-lime'
              : 'border border-zendesk-divider bg-zendesk-warm text-zendesk-ink hover:bg-stone-200'
          ]"
        >
          {{ t('ads_section.tab_2026') }}
        </button>
      </div>

      <!-- Highlights Banner: Flat 0px Cards, zero shadow, #f5f5f2 surface -->
      <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div class="rounded-cards border border-zendesk-divider bg-zendesk-warm p-5">
          <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-zendesk text-zendesk-stone">
            <Sparkles class="h-3.5 w-3.5 text-zendesk-forest" />
            <span>CPR Terendah 2026</span>
          </div>
          <div class="mt-2 font-mono text-2xl font-bold text-zendesk-forest">
            Rp 3.612 <span class="text-xs font-normal text-zendesk-stone">/ pesan</span>
          </div>
          <p class="mt-1 text-[11px] text-zendesk-ink/70">Ads NSM Mei 2026 MBG (10 hasil dari budget Rp 36.121)</p>
        </div>

        <div class="rounded-cards border border-zendesk-divider bg-zendesk-warm p-5">
          <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-zendesk text-zendesk-stone">
            <Sparkles class="h-3.5 w-3.5 text-zendesk-forest" />
            <span>CPR Terendah 2025</span>
          </div>
          <div class="mt-2 font-mono text-2xl font-bold text-zendesk-forest">
            Rp 5.435 <span class="text-xs font-normal text-zendesk-stone">/ pesan</span>
          </div>
          <p class="mt-1 text-[11px] text-zendesk-ink/70">Ads November - mbg 2025 (75 pesan, jangkauan 12.611)</p>
        </div>

        <div class="rounded-cards border border-zendesk-divider bg-zendesk-warm p-5">
          <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-zendesk text-zendesk-stone">
            <MessageSquare class="h-3.5 w-3.5 text-zendesk-forest" />
            <span>Rekor Volume Hasil Pesan</span>
          </div>
          <div class="mt-2 font-mono text-2xl font-bold text-zendesk-ink">
            75 Percakapan
          </div>
          <p class="mt-1 text-[11px] text-zendesk-ink/70">November 2025 (Menghasilkan omzet closing Rp 25.3 Juta)</p>
        </div>
      </div>

      <!-- Campaign Table: Flat Card 0px, zero shadow -->
      <div class="mt-6 overflow-hidden rounded-cards border border-zendesk-divider bg-zendesk-white">
        <div class="max-h-[520px] overflow-y-auto overflow-x-auto">
          <table class="w-full text-left text-sm text-zendesk-ink">
            <thead class="sticky top-0 z-10 border-b border-zendesk-divider bg-zendesk-warm text-xs font-semibold uppercase tracking-zendesk text-zendesk-ink">
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
            <tbody class="divide-y divide-zendesk-divider font-sans">
              <tr
                v-for="c in filteredCampaigns"
                :key="c.campaign_name + c.period"
                class="transition-colors hover:bg-zendesk-warm/60"
              >
                <td class="whitespace-nowrap py-3 pl-6 pr-3 font-mono text-xs font-semibold text-zendesk-forest">{{ c.period }}</td>
                <td class="px-3 py-3 font-medium text-zendesk-ink">
                  {{ c.campaign_name }}
                </td>
                <td class="whitespace-nowrap px-3 py-3 text-right font-mono text-xs text-zendesk-stone">
                  {{ formatIDR(c.amount_spent) }}
                </td>
                <td class="whitespace-nowrap px-3 py-3 text-right font-mono text-xs text-zendesk-stone">
                  {{ formatIDR(c.spent_with_tax) }}
                </td>
                <td class="whitespace-nowrap px-3 py-3 text-center">
                  <span class="inline-flex items-center gap-1 rounded-tags bg-zendesk-warm px-2.5 py-0.5 font-mono text-xs font-bold text-zendesk-forest border border-zendesk-divider">
                    {{ c.results_messaging }} pesan
                  </span>
                </td>
                <td class="whitespace-nowrap px-3 py-3 text-right font-mono text-xs font-bold text-zendesk-forest">
                  {{ formatIDR(c.cost_per_result) }}
                </td>
                <td class="whitespace-nowrap px-3 py-3 text-right font-mono text-xs text-zendesk-stone">
                  {{ c.reach.toLocaleString('id-ID') }}
                </td>
                <td class="whitespace-nowrap py-3 pl-3 pr-6 text-right font-mono text-xs text-zendesk-ink">
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
