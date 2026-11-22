<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AnimatedCounter from './ui/AnimatedCounter.vue'
import { TOTALS, LINES, jutaStr } from '@/composables/usePortfolio'
import sketchAvatar from '@/assets/sketch-avatar.png'

const { t, locale } = useI18n()

const skills = [
  'Meta Ads Blueprint',
  'Sales Closing (ROAS 24.2x)',
  'Creative Ads Strategy',
  'Google Analytics GA4',
  'Looker Studio',
  'Sistem Informasi (IPK 3.78)'
]

const isId = computed(() => locale.value === 'id')

const revenueParts = computed(() => ({
  value: jutaStr(TOTALS.revenue, locale.value),
  suffix: isId.value ? ' Jt+' : 'M+'
}))

const roasValue = computed(() => TOTALS.roas.toFixed(1))

const campaignCount = computed(
  () => LINES.reduce((s, l) => s + (l.id === 'iso' ? 27 : 3), 0)
)

const breakdown = computed(() => {
  const iso = LINES.find(l => l.id === 'iso')
  const iwash = LINES.find(l => l.id === 'iwash')
  return `${iso?.deals ?? 0} ${isId.value ? 'deal ISO' : 'ISO deals'} · ${iwash?.deals ?? 0} ${isId.value ? 'deal IWASH' : 'IWASH deals'}`
})
</script>

<template>
  <section class="bg-white px-6 py-10 sm:px-10 sm:py-16">
    <div class="mx-auto max-w-5xl">
      <div class="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <!-- Left Column -->
        <div class="space-y-6 lg:col-span-7" data-aos="fade-up">

          <h1 class="font-serif text-3xl font-normal leading-[1.24] tracking-tight text-zinc-900 sm:text-4xl lg:text-[42px]">
            {{ t('hero.title_part1') }}
            <span class="font-bold text-black">{{ t('hero.title_highlight') }}</span>
            {{ t('hero.title_part2') }}
            <span class="font-bold text-black">{{ t('hero.title_part3') }}</span>
          </h1>

          <!-- Skill pills -->
          <div class="flex flex-wrap items-center gap-1.5 pt-1 sm:gap-2">
            <span
              v-for="(skill, idx) in skills"
              :key="idx"
              class="inline-flex items-center rounded-full bg-black px-3 py-1 font-mono text-[10px] font-medium text-white transition-colors hover:bg-zinc-800 sm:text-[11px]"
            >
              {{ skill }}
            </span>
          </div>

          <!-- Description -->
          <div class="border-t border-zinc-100 pt-2">
            <p class="text-xs font-normal leading-relaxed text-zinc-600 sm:text-[13px]">
              {{ t('hero.desc') }}
            </p>
          </div>

          <!-- Key metrics -->
          <div class="grid grid-cols-2 gap-3 border-t border-zinc-100 pt-4 sm:grid-cols-4 sm:gap-4">
            <div>
              <span class="text-[10px] font-semibold uppercase tracking-editorial text-zinc-400">
                {{ t('hero.metric_revenue') }}
              </span>
              <div class="mt-0.5 text-base font-bold text-zinc-900 sm:text-xl">
                <AnimatedCounter prefix="Rp " :value="revenueParts.value" :suffix="revenueParts.suffix" :duration="1400" />
              </div>
            </div>
            <div>
              <span class="text-[10px] font-semibold uppercase tracking-editorial text-zinc-400">
                {{ t('hero.metric_roas') }}
              </span>
              <div class="mt-0.5 text-base font-bold text-zinc-900 sm:text-xl">
                <AnimatedCounter :value="roasValue" suffix="x" :duration="1500" />
              </div>
            </div>
            <div>
              <span class="text-[10px] font-semibold uppercase tracking-editorial text-zinc-400">
                {{ t('hero.metric_deals') }}
              </span>
              <div class="mt-0.5 text-base font-bold text-zinc-900 sm:text-xl">
                <AnimatedCounter :value="String(TOTALS.deals)" :duration="1200" />
              </div>
            </div>
            <div>
              <span class="text-[10px] font-semibold uppercase tracking-editorial text-zinc-400">
                {{ t('hero.metric_cpr') }}
              </span>
              <div class="mt-0.5 text-base font-bold text-zinc-900 sm:text-xl">
                <AnimatedCounter prefix="Rp " value="3.612" :duration="1600" />
              </div>
            </div>
          </div>

          <!-- Campaign count + business line breakdown -->
          <div class="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[10px] uppercase tracking-wider text-zinc-400">
            <span>{{ campaignCount }} {{ t('hero.metric_campaigns') }}</span>
            <span class="text-zinc-300">/</span>
            <span>{{ breakdown }}</span>
          </div>

        </div>

        <!-- Right Column: sketch artwork -->
        <div class="flex justify-center lg:col-span-5 lg:justify-end" data-aos="fade-up" data-aos-delay="150">
          <div class="relative flex w-full max-w-[320px] items-center justify-center p-2 sm:max-w-[380px]">
            <img
              :src="sketchAvatar"
              alt="Reynalda Syalwa - Digital Marketing & Growth Specialist Artwork"
              class="h-auto w-full select-none object-contain transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
