<script setup>
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const toolGroups = [
  {
    key: 'skills.group_strategy',
    tools: ['Google Analytics', 'Google Trends', 'Meta Ads Library', 'Google Search Console'],
  },
  {
    key: 'skills.group_design',
    tools: ['Canva', 'Adobe Photoshop', 'CapCut', 'Figma'],
  },
  {
    key: 'skills.group_ads',
    tools: ['Meta Ads Manager', 'Instagram Ads', 'WhatsApp Business', 'Facebook Pages'],
  },
  {
    key: 'skills.group_admin',
    tools: ['Microsoft Excel', 'Microsoft Word', 'Google Workspace', 'WordPress'],
  },
]
</script>

<template>
  <section id="skills" class="bg-cream px-5 py-16 sm:px-8 sm:py-24">
    <div class="mx-auto max-w-shell">
      <h2 class="font-display text-display-sm font-extrabold text-ink">{{ t('skills.title') }}</h2>
      <p class="mt-3 max-w-2xl text-[14px] leading-relaxed text-ink/55">{{ t('skills.lead') }}</p>

      <!-- Pill keahlian -->
      <div class="mt-7 flex flex-wrap gap-2">
        <span
          v-for="(pill, i) in tm('skills.pills')"
          :key="i"
          class="rounded-pill border border-ink/15 bg-white/60 px-4 py-1.5 text-[12px] font-medium text-ink/70"
        >{{ pill }}</span>
      </div>

      <div class="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
        <!-- Tools grid -->
        <div>
          <h3 class="font-display text-lg font-extrabold text-ink">{{ t('skills.tools_title') }}</h3>

          <div class="mt-5 grid gap-4 sm:grid-cols-2">
            <div
              v-for="g in toolGroups"
              :key="g.key"
              class="rounded-card border border-ink/8 bg-white p-5 shadow-soft"
            >
              <p class="text-[10.5px] font-bold uppercase tracking-wide2 text-amber">{{ t(g.key) }}</p>
              <ul class="mt-3 space-y-1.5">
                <li
                  v-for="tool in g.tools"
                  :key="tool"
                  class="flex items-start gap-2 text-[13px] text-ink/65"
                >
                  <span class="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink/25" aria-hidden="true" />
                  {{ tool }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Cara kerja -->
        <div class="rounded-card bg-ink p-6 shadow-lift sm:p-7">
          <h3 class="font-display text-lg font-extrabold text-white">{{ t('skills.soft_title') }}</h3>
          <ol class="mt-5 space-y-4">
            <li
              v-for="n in 6"
              :key="n"
              class="flex items-start gap-3"
            >
              <span class="mt-0.5 font-mono text-[11px] font-bold text-amber">
                {{ String(n).padStart(2, '0') }}
              </span>
              <span class="text-[13px] leading-relaxed text-white/75">
                {{ t(`skills.soft_${n}`) }}
              </span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>
