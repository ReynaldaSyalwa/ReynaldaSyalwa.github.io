<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { MessageSquare, Eye, MousePointerClick, Wallet, Target, TrendingDown, Users } from 'lucide-vue-next'
import SectionBanner from './SectionBanner.vue'
import {
  PERIOD, activeMeta, filteredCampaigns, PORTFOLIO,
  formatIDR, compactNum,
} from '../composables/usePortfolio'

const { t, locale } = useI18n()

const meta = activeMeta
const campaigns = filteredCampaigns
const iwash = PORTFOLIO.iwash_campaigns

const periods = [
  { id: 'all', key: 'ads.filter_label' },
  { id: '2025', key: 'growth.period_2025' },
  { id: '2026', key: 'growth.period_2026' },
]

const bestCpr = computed(() => {
  const list = campaigns.value
  if (!list.length) return null
  return list.reduce((a, b) => (a.cost_per_result <= b.cost_per_result ? a : b))
})

const metrics = computed(() => [
  { key: 'ads.metric_chats', value: meta.value.chats.toLocaleString(locale.value === 'id' ? 'id-ID' : 'en-US'), icon: MessageSquare },
  { key: 'ads.metric_reach', value: compactNum(meta.value.reach, locale.value), icon: Users },
  { key: 'ads.metric_impressions', value: compactNum(meta.value.impressions, locale.value), icon: Eye },
  { key: 'ads.metric_clicks', value: compactNum(meta.value.link_clicks, locale.value), icon: MousePointerClick },
  { key: 'ads.metric_spend', value: 'Rp ' + compactNum(meta.value.spend, locale.value), icon: Wallet },
  { key: 'ads.metric_cost_chat', value: formatIDR(meta.value.cost_per_chat), icon: Target },
])
</script>

<template>
  <section id="ads" class="bg-cream pb-16 sm:pb-24">
    <SectionBanner
      :no="t('ads.index')"
      :part1="t('ads.title_part1')"
      :part2="t('ads.title_part2')"
      :part3="t('ads.title_part3')"
    />

    <div class="mx-auto max-w-shell px-5 pt-10 sm:px-8 sm:pt-14">
      <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <p class="max-w-xl text-[14.5px] leading-relaxed text-ink/60">{{ t('ads.lead') }}</p>

        <div class="shrink-0">
          <p class="mb-2 text-[10px] font-bold uppercase tracking-wide2 text-ink/35">
            {{ t('ads.filter_label') }}
          </p>
          <div class="inline-flex rounded-pill border border-ink/15 bg-white p-1 shadow-soft">
            <button
              v-for="p in periods"
              :key="p.id"
              type="button"
              class="rounded-pill px-4 py-2 text-[12.5px] font-bold transition-colors sm:px-5"
              :class="PERIOD === p.id ? 'bg-ink text-white' : 'text-ink/55 hover:text-ink'"
              @click="PERIOD = p.id"
            >{{ p.id === 'all' ? t('growth.period_all') : p.id }}</button>
          </div>
        </div>
      </div>

      <!-- Grid metrik hitam -->
      <div class="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
        <div
          v-for="m in metrics"
          :key="m.key"
          class="rounded-card bg-ink p-4 shadow-soft"
        >
          <component :is="m.icon" class="h-3.5 w-3.5 text-amber" />
          <p class="mt-2.5 font-display text-[17px] font-extrabold leading-none tracking-tightest text-white">
            {{ m.value }}
          </p>
          <p class="mt-1.5 text-[9.5px] font-medium uppercase tracking-wide2 text-white/35">
            {{ t(m.key) }}
          </p>
        </div>
      </div>

      <!-- Kampanye terbaik -->
      <div v-if="bestCpr" class="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-card border border-amber/30 bg-amber/8 px-5 py-3.5">
        <span class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide2 text-amber-deep">
          <TrendingDown class="h-3.5 w-3.5" />
          {{ t('ads.best_label') }}
        </span>
        <span class="font-display text-[15px] font-extrabold text-ink">{{ formatIDR(bestCpr.cost_per_result) }}</span>
        <span class="text-[11.5px] text-ink/50">— {{ bestCpr.campaign_name }}</span>
      </div>

      <!-- Tabel kampanye -->
      <div class="mt-4 overflow-hidden rounded-card border border-ink/8 bg-white shadow-soft">
        <div class="flex items-center justify-between border-b border-ink/8 px-5 py-3.5">
          <h3 class="font-display text-[14.5px] font-bold text-ink">{{ t('ads.table_title') }}</h3>
          <span class="rounded-pill bg-ink/5 px-2.5 py-1 font-mono text-[10.5px] text-ink/50">
            {{ campaigns.length }} {{ locale === 'id' ? 'kampanye' : 'campaigns' }}
          </span>
        </div>

        <div class="max-h-[400px] overflow-auto">
          <table class="w-full min-w-[620px] border-collapse text-left">
            <thead class="sticky top-0 bg-white shadow-[0_1px_0_rgba(17,17,17,0.08)]">
              <tr>
                <th class="px-4 py-2.5 text-[9.5px] font-bold uppercase tracking-wide2 text-ink/40">{{ t('ads.col_campaign') }}</th>
                <th class="px-4 py-2.5 text-right text-[9.5px] font-bold uppercase tracking-wide2 text-ink/40">{{ t('ads.col_spend') }}</th>
                <th class="px-4 py-2.5 text-right text-[9.5px] font-bold uppercase tracking-wide2 text-ink/40">{{ t('ads.col_reach') }}</th>
                <th class="px-4 py-2.5 text-right text-[9.5px] font-bold uppercase tracking-wide2 text-ink/40">{{ t('ads.col_results') }}</th>
                <th class="px-4 py-2.5 text-right text-[9.5px] font-bold uppercase tracking-wide2 text-ink/40">{{ t('ads.col_cpr') }}</th>
                <th class="px-4 py-2.5 text-right text-[9.5px] font-bold uppercase tracking-wide2 text-ink/40">{{ t('ads.col_clicks') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="c in campaigns"
                :key="c.campaign_name"
                class="border-b border-ink/5 last:border-0 hover:bg-ink/[0.015]"
                :class="bestCpr && c.campaign_name === bestCpr.campaign_name ? 'bg-amber/6' : ''"
              >
                <td class="px-4 py-2.5 text-[12px] font-medium text-ink">{{ c.campaign_name }}</td>
                <td class="px-4 py-2.5 text-right font-mono text-[11.5px] text-ink/60">{{ formatIDR(c.amount_spent) }}</td>
                <td class="px-4 py-2.5 text-right font-mono text-[11.5px] text-ink/60">{{ c.reach.toLocaleString('id-ID') }}</td>
                <td class="px-4 py-2.5 text-right text-[12px] font-semibold text-ink">{{ c.results_messaging }}</td>
                <td class="px-4 py-2.5 text-right font-mono text-[11.5px] text-ink/60">{{ formatIDR(c.cost_per_result) }}</td>
                <td class="px-4 py-2.5 text-right font-mono text-[11.5px] text-ink/60">{{ c.link_clicks }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="border-t border-ink/8 px-4 py-2.5 text-[10.5px] text-ink/40">{{ t('ads.note') }}</p>
      </div>

      <!-- IWASH musiman -->
      <div class="mt-8">
        <h3 class="font-display text-lg font-extrabold text-ink">{{ t('ads.iwash_title') }}</h3>
        <p class="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-ink/55">{{ t('ads.iwash_desc') }}</p>

        <div class="mt-4 overflow-hidden rounded-card border border-ink/8 bg-white shadow-soft">
          <div class="overflow-x-auto">
            <table class="w-full min-w-[580px] border-collapse text-left">
              <thead>
                <tr class="border-b border-ink/8 bg-ink/[0.02]">
                  <th class="px-4 py-2.5 text-[9.5px] font-bold uppercase tracking-wide2 text-ink/40">{{ t('ads.iwash_col_moment') }}</th>
                  <th class="px-4 py-2.5 text-right text-[9.5px] font-bold uppercase tracking-wide2 text-ink/40">{{ t('ads.iwash_col_spend') }}</th>
                  <th class="px-4 py-2.5 text-right text-[9.5px] font-bold uppercase tracking-wide2 text-ink/40">{{ t('ads.iwash_col_leads') }}</th>
                  <th class="px-4 py-2.5 text-right text-[9.5px] font-bold uppercase tracking-wide2 text-ink/40">{{ t('ads.iwash_col_closing') }}</th>
                  <th class="px-4 py-2.5 text-right text-[9.5px] font-bold uppercase tracking-wide2 text-ink/40">{{ t('ads.iwash_col_revenue') }}</th>
                  <th class="px-4 py-2.5 text-right text-[9.5px] font-bold uppercase tracking-wide2 text-ink/40">{{ t('ads.iwash_col_roas') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="c in iwash"
                  :key="c.moment"
                  class="border-b border-ink/5 last:border-0"
                >
                  <td class="px-4 py-3 text-[12.5px] font-semibold text-ink">{{ c.moment_id }}</td>
                  <td class="px-4 py-3 text-right font-mono text-[11.5px] text-ink/60">{{ formatIDR(c.ad_spend) }}</td>
                  <td class="px-4 py-3 text-right text-[12px] text-ink/60">{{ c.leads }}</td>
                  <td class="px-4 py-3 text-right text-[12px] font-semibold text-ink">{{ c.results }}</td>
                  <td class="px-4 py-3 text-right font-mono text-[11.5px] text-ink/60">{{ formatIDR(c.revenue) }}</td>
                  <td class="px-4 py-3 text-right">
                    <span class="rounded-pill bg-sage/12 px-2.5 py-1 font-display text-[11.5px] font-extrabold text-sage">
                      {{ (c.revenue / c.ad_spend).toFixed(2) }}x
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
