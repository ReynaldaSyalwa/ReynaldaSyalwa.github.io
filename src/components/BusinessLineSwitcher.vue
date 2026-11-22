<script setup>
import { useI18n } from 'vue-i18n'
import { ACTIVE_LINE, YEAR_FILTER } from '@/composables/usePortfolio'

const { t } = useI18n()

const lineTabs = [
  { id: 'all', key: 'bizline.all' },
  { id: 'iso', key: 'bizline.iso' },
  { id: 'iwash', key: 'bizline.iwash' }
]

const yearTabs = ['all', 2025, 2026]
</script>

<template>
  <div class="flex flex-col gap-4 border-y border-editorial-divider py-4 sm:flex-row sm:items-center sm:justify-between">
    <!-- Business line tabs -->
    <div class="flex items-center gap-1.5 overflow-x-auto">
      <span class="mr-2 hidden shrink-0 text-[10px] font-semibold uppercase tracking-editorial text-zinc-400 lg:inline">
        {{ t('bizline.label') }}
      </span>
      <button
        v-for="tab in lineTabs"
        :key="tab.id"
        @click="ACTIVE_LINE = tab.id"
        class="shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[11px] font-medium transition-colors"
        :class="ACTIVE_LINE === tab.id
          ? 'bg-black text-white'
          : 'bg-transparent text-zinc-500 hover:bg-zinc-100 hover:text-black'"
      >
        {{ t(tab.key) }}
      </button>
    </div>

    <!-- Year filter -->
    <div class="flex items-center gap-1.5">
      <span class="mr-1 text-[10px] font-semibold uppercase tracking-editorial text-zinc-400">
        {{ t('bizline.period') }}
      </span>
      <button
        v-for="y in yearTabs"
        :key="y"
        @click="YEAR_FILTER = y"
        class="rounded-full px-3 py-1 font-mono text-[11px] font-medium transition-colors"
        :class="YEAR_FILTER === y
          ? 'bg-zinc-900 text-white'
          : 'text-zinc-500 hover:bg-zinc-100 hover:text-black'"
      >
        {{ y === 'all' ? t('bizline.all_years') : y }}
      </button>
    </div>
  </div>
</template>
