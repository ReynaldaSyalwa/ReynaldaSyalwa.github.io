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
  <section id="experience" class="relative py-20 border-t border-zendesk-divider bg-zendesk-warm">
    <div class="mx-auto max-w-7xl px-6 sm:px-8">
      <!-- Section Header -->
      <div class="max-w-3xl">
        <span class="inline-block rounded-tags bg-zendesk-white px-3 py-1 text-xs font-semibold uppercase tracking-zendesk text-zendesk-forest border border-zendesk-divider">
          {{ t('timeline.tag') }}
        </span>
        <h2 class="mt-3 text-3xl font-semibold tracking-zendesk text-zendesk-ink sm:text-4xl">
          {{ t('timeline.title') }}
        </h2>
        <p class="mt-3 text-base text-zendesk-ink/80 tracking-zendesk leading-relaxed">
          {{ t('timeline.desc') }}
        </p>
      </div>

      <!-- Timeline List: Zendesk Flat Cards (0px radius, white surface, zero shadow) -->
      <div class="mt-12 space-y-4">
        <div
          v-for="(item, idx) in timelineItems"
          :key="idx"
          class="relative rounded-cards border border-zendesk-divider bg-zendesk-white p-6 sm:p-8 transition-colors hover:border-zendesk-stone"
        >
          <div class="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div class="flex items-center gap-3.5">
              <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-zendesk-warm border border-zendesk-divider text-zendesk-forest">
                <Briefcase v-if="item.type === 'exp'" class="h-5 w-5" />
                <GraduationCap v-else class="h-5 w-5" />
              </div>
              <div>
                <h3 class="text-base sm:text-lg font-semibold tracking-zendesk text-zendesk-ink">
                  {{ t(item.roleKey) }}
                </h3>
                <span class="text-xs font-medium tracking-zendesk text-zendesk-forest">
                  {{ t(item.companyKey) }}
                </span>
              </div>
            </div>

            <div class="flex items-center gap-3 self-start sm:self-auto">
              <span v-if="item.periodKey" class="font-mono text-xs text-zendesk-stone">
                {{ t(item.periodKey) }}
              </span>
              <span class="rounded-tags bg-zendesk-forest px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wider text-zendesk-lime">
                {{ item.badge }}
              </span>
            </div>
          </div>

          <p class="mt-4 text-sm leading-relaxed text-zendesk-ink/80 tracking-zendesk">
            {{ t(item.descKey) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
