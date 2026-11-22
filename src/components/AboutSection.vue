<script setup>
import { useI18n } from 'vue-i18n'
import { activePeriod, jutaStr } from '../composables/usePortfolio'

const { t, locale } = useI18n()
const period = activePeriod
</script>

<template>
  <section id="about" class="bg-cream px-5 py-16 sm:px-8 sm:py-24">
    <div class="mx-auto max-w-shell">
      <div class="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <!-- Kiri: judul + narasi -->
        <div>
          <h2 class="font-display text-display-sm font-extrabold text-ink">
            {{ t('about.title') }}
          </h2>

          <div class="mt-6 space-y-4 text-[14.5px] leading-relaxed text-ink/65">
            <p>{{ t('about.p1') }}</p>
            <p>{{ t('about.p2') }}</p>
            <p>{{ t('about.p3') }}</p>
          </div>

          <!-- Pendidikan -->
          <div class="mt-8 border-t border-ink/10 pt-6">
            <p class="mb-3 text-[10.5px] font-bold uppercase tracking-wide2 text-ink/35">
              {{ t('about.education') }}
            </p>
            <div class="space-y-3">
              <div>
                <p class="font-display text-sm font-bold text-ink">{{ t('about.edu_school') }}</p>
                <p class="text-[12.5px] text-ink/55">
                  {{ t('about.edu_major') }} · {{ t('about.edu_gpa') }} · {{ t('about.edu_years') }}
                </p>
              </div>
              <div>
                <p class="font-display text-sm font-bold text-ink">{{ t('about.edu_high') }}</p>
                <p class="text-[12.5px] text-ink/55">
                  {{ t('about.edu_high_major') }} · {{ t('about.edu_high_years') }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Kanan: foto + statistik -->
        <div>
          <div class="relative">
            <div class="overflow-hidden rounded-card bg-ink/5 shadow-soft">
              <img
                src="/media/profile/syasya-casual.webp"
                :alt="t('about.title')"
                class="h-full w-full object-cover"
                width="1000"
                height="1250"
                loading="lazy"
              />
            </div>
            <!-- Badge kecil -->
            <div class="absolute -bottom-4 -left-4 rounded-card bg-ink px-4 py-3 shadow-lift">
              <p class="font-display text-2xl font-extrabold leading-none text-amber">{{ t('hero.exp_number') }}</p>
              <p class="mt-1 text-[10px] font-medium uppercase tracking-wide2 text-white/55">
                {{ t('about.stat_exp') }}
              </p>
            </div>
          </div>

          <!-- Statistik -->
          <div class="mt-9 grid grid-cols-1 gap-3">
            <div class="flex items-baseline justify-between rounded-card bg-white px-5 py-4 shadow-soft">
              <span class="text-[12px] font-medium text-ink/55">{{ t('about.stat_deals') }}</span>
              <span class="font-display text-xl font-extrabold text-ink">{{ period.deals }}</span>
            </div>
            <div class="flex items-baseline justify-between rounded-card bg-white px-5 py-4 shadow-soft">
              <span class="text-[12px] font-medium text-ink/55">{{ t('about.stat_revenue') }}</span>
              <span class="font-display text-xl font-extrabold text-ink">
                Rp {{ jutaStr(period.revenue, locale, 1) }} Jt
              </span>
            </div>
            <div class="flex items-baseline justify-between rounded-card bg-ink px-5 py-4 shadow-soft">
              <span class="text-[12px] font-medium text-white/55">{{ t('about.stat_roas') }}</span>
              <span class="font-display text-xl font-extrabold text-amber">{{ period.roas }}x</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
