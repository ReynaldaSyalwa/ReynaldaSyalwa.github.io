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
  <section id="experience" class="py-16 sm:py-20 px-6 sm:px-10 border-t border-zinc-100 bg-white">
    <div class="mx-auto max-w-5xl space-y-10" data-aos="fade-up">
      <!-- Section Header -->
      <div class="max-w-3xl space-y-2">
        <span class="text-[11px] font-semibold uppercase tracking-editorial text-zinc-400">
          {{ t('timeline.tag') }}
        </span>
        <h2 class="font-serif text-2xl sm:text-3xl text-zinc-900 leading-snug">
          {{ t('timeline.title') }}
        </h2>
        <p class="text-xs sm:text-sm text-zinc-500 font-normal leading-relaxed">
          {{ t('timeline.desc') }}
        </p>
      </div>

      <!-- Timeline List: Clean Borderless Cards with Hairline Dividers -->
      <div class="space-y-4">
        <div
          v-for="(item, idx) in timelineItems"
          :key="idx"
          class="rounded-2xl border border-zinc-200/70 bg-white p-6 sm:p-7 transition-all hover:border-zinc-400"
          data-aos="fade-up"
          :data-aos-delay="idx * 50"
        >
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="flex items-center gap-3.5">
              <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zinc-50 border border-zinc-200/80 text-zinc-800">
                <Briefcase v-if="item.type === 'exp'" class="h-4 w-4" />
                <GraduationCap v-else class="h-4 w-4" />
              </div>
              <div>
                <h3 class="font-serif text-base sm:text-lg text-zinc-900 font-medium">
                  {{ t(item.roleKey) }}
                </h3>
                <span class="text-xs text-zinc-500 font-normal">
                  {{ t(item.companyKey) }}
                </span>
              </div>
            </div>

            <div class="flex items-center gap-3 self-start sm:self-auto">
              <span v-if="item.periodKey" class="font-mono text-xs text-zinc-400">
                {{ t(item.periodKey) }}
              </span>
              <span class="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-zinc-700">
                {{ item.badge }}
              </span>
            </div>
          </div>

          <p class="mt-3 text-xs sm:text-[13px] leading-relaxed text-zinc-600 font-normal">
            {{ t(item.descKey) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
