<script setup>
import { useI18n } from 'vue-i18n'
import { activePeriod, jutaStr, roasStr } from '../composables/usePortfolio'

const { t, locale } = useI18n()
const period = activePeriod

// Binding (bukan atribut statis) supaya Vite tidak meng-hash ulang file.
const aboutPhoto = '/media/profile/syasya-casual.webp'

const stats = [
  { key: 'about.stat_deals', dark: false },
  { key: 'about.stat_revenue', dark: false },
  { key: 'about.stat_roas', dark: true },
]
</script>

<template>
  <section id="about" class="bg-cream px-5 py-16 sm:px-8 sm:py-24">
    <div class="mx-auto max-w-shell">
      <div class="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <!-- Kiri: judul + narasi -->
        <div>
          <h2
            class="font-display text-display-sm font-extrabold text-ink"
            data-aos="fade-up"
          >
            {{ t('about.title') }}
          </h2>

          <div class="mt-6 space-y-4 text-[14.5px] leading-relaxed text-ink/65">
            <p data-aos="fade-up" data-aos-delay="60">{{ t('about.p1') }}</p>
            <p data-aos="fade-up" data-aos-delay="120">{{ t('about.p2') }}</p>
            <p data-aos="fade-up" data-aos-delay="180">{{ t('about.p3') }}</p>
          </div>

          <!-- Pendidikan -->
          <div class="mt-8 border-t border-ink/10 pt-6" data-aos="fade-up" data-aos-delay="240">
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

            <!-- Statistik: 3 kolom sejajar, tinggi kolom kiri-kanan jadi seimbang -->
            <div class="mt-8 grid grid-cols-3 gap-2 sm:gap-2.5">
              <div
                v-for="(s, i) in stats"
                :key="s.key"
                class="min-w-0 rounded-card px-2.5 py-2.5 shadow-soft sm:px-3.5 sm:py-3"
                :class="s.dark ? 'bg-ink' : 'border border-ink/8 bg-white'"
                data-aos="fade-up"
                :data-aos-delay="300 + i * 70"
              >
                <p
                  class="text-[8px] font-bold uppercase leading-tight tracking-wide2 sm:text-[9.5px]"
                  :class="s.dark ? 'text-white/45' : 'text-ink/35'"
                >{{ t(s.key) }}</p>
                <p
                  class="mt-1.5 whitespace-nowrap font-display text-[13px] font-extrabold leading-none tracking-tightest tabular-figures sm:text-lg"
                  :class="s.dark ? 'text-amber' : 'text-ink'"
                >
                  <template v-if="s.key === 'about.stat_deals'">{{ period.deals }}</template>
                  <template v-else-if="s.key === 'about.stat_revenue'">
                    {{ jutaStr(period.revenue, locale, 1) }}<span class="ml-0.5 text-[0.7em] font-bold opacity-50">Jt</span>
                  </template>
                  <template v-else>{{ roasStr(period.roas, locale) }}<span class="text-[0.7em] font-bold opacity-60">x</span></template>
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Kanan: foto -->
        <div data-aos="fade-left" data-aos-delay="100">
          <div class="relative">
            <div class="aspect-[4/5] overflow-hidden rounded-card bg-ink/5 shadow-soft">
              <img
                :src="aboutPhoto"
                :alt="t('about.title')"
                class="h-full w-full object-cover object-top"
                width="1000"
                height="1250"
                loading="lazy"
              />
            </div>
            <!-- Badge kecil (di dalam tepi foto) -->
            <div class="absolute bottom-4 left-4 rounded-card bg-ink/95 px-4 py-3 shadow-lift backdrop-blur">
              <p class="font-display text-2xl font-extrabold leading-none text-amber">{{ t('hero.exp_number') }}</p>
              <p class="mt-1 text-[9.5px] font-medium uppercase tracking-wide2 text-white/60">
                {{ t('about.stat_exp') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
