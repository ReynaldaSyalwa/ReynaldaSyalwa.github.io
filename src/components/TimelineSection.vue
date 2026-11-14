<script setup>
import { useI18n } from 'vue-i18n'
import { Briefcase, GraduationCap } from 'lucide-vue-next'

const { t } = useI18n()

const timelineItems = [
  {
    type: 'exp',
    roleKey: 'timeline.exp1_title',
    companyKey: 'timeline.exp1_company',
    periodKey: 'timeline.exp1_period',
    descKey: 'timeline.exp1_desc',
    badge: 'FULL-TIME'
  },
  {
    type: 'exp',
    roleKey: 'timeline.exp2_title',
    companyKey: 'timeline.exp2_company',
    periodKey: 'timeline.exp2_period',
    descKey: 'timeline.exp2_desc',
    badge: 'INTERNSHIP'
  },
  {
    type: 'exp',
    roleKey: 'timeline.exp3_title',
    companyKey: 'timeline.exp3_company',
    periodKey: 'timeline.exp3_period',
    descKey: 'timeline.exp3_desc',
    badge: 'INTERNSHIP'
  },
  {
    type: 'edu',
    roleKey: 'timeline.edu_title',
    companyKey: 'timeline.edu_sub',
    periodKey: '',
    descKey: 'timeline.edu_desc',
    badge: 'ACADEMIC'
  }
]
</script>

<template>
  <section id="experience" class="relative py-20 border-t border-obsidian-600/70 bg-obsidian-900/40">
    <div class="mx-auto max-w-7xl px-6 sm:px-8">
      <!-- Section Header -->
      <div class="max-w-3xl">
        <span class="text-xs font-bold uppercase tracking-wider text-growth-400">
          {{ t('timeline.tag') }}
        </span>
        <h2 class="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          {{ t('timeline.title') }}
        </h2>
        <p class="mt-3 text-base text-zinc-400">
          {{ t('timeline.desc') }}
        </p>
      </div>

      <!-- Timeline List -->
      <div class="mt-12 space-y-6">
        <div
          v-for="(item, idx) in timelineItems"
          :key="idx"
          class="relative rounded-2xl border border-obsidian-600/80 bg-obsidian-800/80 p-6 sm:p-8 backdrop-blur-sm transition-all hover:border-zinc-500"
        >
          <div class="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-xl border border-obsidian-600 bg-obsidian-900 text-growth-400">
                <Briefcase v-if="item.type === 'exp'" class="h-5 w-5" />
                <GraduationCap v-else class="h-5 w-5" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-white">
                  {{ t(item.roleKey) }}
                </h3>
                <span class="text-xs font-medium text-growth-400">
                  {{ t(item.companyKey) }}
                </span>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <span v-if="item.periodKey" class="font-mono text-xs text-zinc-400">
                {{ t(item.periodKey) }}
              </span>
              <span class="rounded-full border border-obsidian-600 bg-obsidian-900 px-3 py-1 font-mono text-[10px] font-bold tracking-wider text-zinc-400">
                {{ item.badge }}
              </span>
            </div>
          </div>

          <p class="mt-4 text-sm leading-relaxed text-zinc-300">
            {{ t(item.descKey) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
