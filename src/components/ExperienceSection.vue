<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const jobs = [
  { n: 1, role: 'experience.e1_role', company: 'experience.e1_company', period: 'experience.e1_period', desc: 'experience.e1_desc' },
  { n: 2, role: 'experience.e2_role', company: 'experience.e2_company', period: 'experience.e2_period', desc: 'experience.e2_desc' },
  { n: 3, role: 'experience.e3_role', company: 'experience.e3_company', period: 'experience.e3_period', desc: 'experience.e3_desc' },
  { n: 4, role: 'experience.e4_role', company: 'experience.e4_company', period: 'experience.e4_period', desc: 'experience.e4_desc' },
]
</script>

<template>
  <section id="experience" class="bg-cream px-5 py-16 sm:px-8 sm:py-24">
    <div class="mx-auto max-w-shell">
      <div class="max-w-2xl">
        <h2 class="font-display text-display-sm font-extrabold text-ink">{{ t('experience.title') }}</h2>
        <p class="mt-3 text-[14px] leading-relaxed text-ink/55">{{ t('experience.lead') }}</p>
      </div>

      <div class="mt-10 space-y-0">
        <article
          v-for="(job, i) in jobs"
          :key="job.n"
          class="group relative grid gap-4 border-t border-ink/10 py-7 sm:grid-cols-[130px_1fr] sm:gap-8"
        >
          <!-- Periode -->
          <div class="flex items-start gap-2">
            <span
              v-if="i === 0"
              class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber ring-4 ring-amber/20"
              aria-hidden="true"
            />
            <span v-else class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-ink/20" aria-hidden="true" />
            <p class="text-[11.5px] font-semibold uppercase tracking-wide2 text-ink/45">
              {{ t(job.period) }}
            </p>
          </div>

          <!-- Detail -->
          <div>
            <h3 class="font-display text-[15.5px] font-bold leading-snug text-ink">
              {{ t(job.role) }}
            </h3>
            <p class="mt-0.5 text-[12.5px] font-medium text-amber">{{ t(job.company) }}</p>
            <p class="mt-2.5 max-w-2xl text-[13.5px] leading-relaxed text-ink/60">
              {{ t(job.desc) }}
            </p>
          </div>
        </article>

        <!-- Penutup garis -->
        <div class="border-t border-ink/10" />
      </div>
    </div>
  </section>
</template>
