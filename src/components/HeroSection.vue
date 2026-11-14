<script setup>
import { useI18n } from 'vue-i18n'
import { ArrowUpRight, Download, BarChart2, ShieldCheck, Sparkles } from 'lucide-vue-next'
import ShinyText from './ui/ShinyText.vue'

const { t } = useI18n()
</script>

<template>
  <section class="relative overflow-hidden pt-12 pb-20 md:pt-24 md:pb-32 bg-grid-pattern">
    <!-- Ambient Aurora Glows for high-end studio depth -->
    <div class="pointer-events-none absolute -top-48 left-1/2 -z-10 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-growth-500/25 via-sky-500/15 to-transparent blur-[140px]"></div>

    <div class="mx-auto max-w-7xl px-6 sm:px-8">
      <!-- Status Badge -->
      <div class="flex justify-center">
        <div class="inline-flex items-center gap-2.5 rounded-full border border-growth-500/30 bg-growth-500/10 px-4 py-1.5 text-xs font-semibold text-growth-300 shadow-glow-emerald backdrop-blur-md">
          <span class="relative flex h-2 w-2">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-growth-400 opacity-75"></span>
            <span class="relative inline-flex h-2 w-2 rounded-full bg-growth-400"></span>
          </span>
          <ShinyText :text="t('hero.badge')" />
        </div>
      </div>

      <!-- Main Headline -->
      <div class="mt-8 text-center">
        <h1 class="mx-auto max-w-5xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl sm:leading-[1.12] md:text-7xl">
          {{ t('hero.title_prefix') }}
          <span class="emerald-gradient-text">{{ t('hero.title_highlight') }}</span>
          {{ t('hero.title_suffix') }}
        </h1>
        <p class="mx-auto mt-6 max-w-3xl text-base text-zinc-300 sm:text-lg sm:leading-relaxed">
          {{ t('hero.desc') }}
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
        <a
          href="#chart"
          class="inline-flex items-center gap-2 rounded-full bg-growth-500 px-7 py-3.5 text-sm font-bold text-obsidian-950 transition-all hover:bg-growth-400 hover:shadow-lg hover:shadow-growth-500/30"
        >
          <BarChart2 class="h-4 w-4" />
          <span>{{ t('hero.cta_chart') }}</span>
        </a>
        <a
          href="#deals"
          class="inline-flex items-center gap-2 rounded-full border border-obsidian-600 bg-obsidian-800/80 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:border-zinc-500 hover:bg-obsidian-700"
        >
          <span>{{ t('hero.cta_deals') }}</span>
          <ArrowUpRight class="h-4 w-4 text-zinc-400" />
        </a>
        <a
          href="REYNALDA_VONNA_SYALWA_CV.pdf"
          download="REYNALDA_VONNA_SYALWA_CV.pdf"
          class="inline-flex items-center gap-2 rounded-full border border-obsidian-600 bg-transparent px-6 py-3.5 text-sm font-semibold text-zinc-300 transition-all hover:border-zinc-400 hover:text-white"
        >
          <Download class="h-4 w-4" />
          <span>{{ t('hero.cta_cv') }}</span>
        </a>
      </div>

      <!-- Verified Social Proof Sub-bar -->
      <div class="mt-14 flex items-center justify-center gap-2 text-xs text-zinc-400">
        <ShieldCheck class="h-4 w-4 text-growth-400" />
        <span>{{ t('hero.trust') }}</span>
      </div>

      <!-- 4 Key Impact Metric Cards -->
      <div class="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <!-- Metric 1 -->
        <div class="relative rounded-2xl border border-obsidian-600/80 bg-obsidian-800/70 p-6 backdrop-blur-md transition-all hover:border-growth-500/40 hover:shadow-glow-emerald">
          <div class="flex items-center justify-between text-xs font-semibold text-zinc-400">
            <span>{{ t('stats.revenue_label') }}</span>
            <Sparkles class="h-4 w-4 text-growth-400" />
          </div>
          <div class="mt-3 font-mono text-3xl font-extrabold text-white">
            {{ t('stats.revenue_val') }}
          </div>
          <p class="mt-1 text-xs text-zinc-400">
            {{ t('stats.revenue_sub') }}
          </p>
        </div>

        <!-- Metric 2 -->
        <div class="relative rounded-2xl border border-growth-500/30 bg-growth-500/5 p-6 backdrop-blur-md transition-all hover:border-growth-400 hover:shadow-glow-emerald">
          <div class="flex items-center justify-between text-xs font-semibold text-growth-300">
            <span>{{ t('stats.roas_label') }}</span>
            <span class="rounded bg-growth-500/20 px-1.5 py-0.5 text-[10px] font-bold text-growth-300">PROVEN</span>
          </div>
          <div class="mt-3 font-mono text-3xl font-extrabold text-growth-400">
            {{ t('stats.roas_val') }}
          </div>
          <p class="mt-1 text-xs text-zinc-400">
            {{ t('stats.roas_sub') }}
          </p>
        </div>

        <!-- Metric 3 -->
        <div class="relative rounded-2xl border border-obsidian-600/80 bg-obsidian-800/70 p-6 backdrop-blur-md transition-all hover:border-zinc-500">
          <div class="flex items-center justify-between text-xs font-semibold text-zinc-400">
            <span>{{ t('stats.campaigns_label') }}</span>
            <span class="font-mono text-[11px] text-zinc-400">2025–2026</span>
          </div>
          <div class="mt-3 font-mono text-3xl font-extrabold text-white">
            {{ t('stats.campaigns_val') }}
          </div>
          <p class="mt-1 text-xs text-zinc-400">
            {{ t('stats.campaigns_sub') }}
          </p>
        </div>

        <!-- Metric 4 -->
        <div class="relative rounded-2xl border border-obsidian-600/80 bg-obsidian-800/70 p-6 backdrop-blur-md transition-all hover:border-sky-500/40">
          <div class="flex items-center justify-between text-xs font-semibold text-zinc-400">
            <span>{{ t('stats.cpr_label') }}</span>
            <span class="text-[10px] font-bold text-sky-400">BEST CPR</span>
          </div>
          <div class="mt-3 font-mono text-3xl font-extrabold text-sky-400">
            {{ t('stats.cpr_val') }}
          </div>
          <p class="mt-1 text-xs text-zinc-400">
            {{ t('stats.cpr_sub') }}
          </p>
        </div>
      </div>

    </div>
  </section>
</template>
