<script setup>
import { useI18n } from 'vue-i18n'
import AnimatedCounter from './ui/AnimatedCounter.vue'
import sketchAvatar from '@/assets/sketch-avatar.png'

const { t, locale } = useI18n()

const skills = [
  'Meta Ads Blueprint',
  'Sales Closing (ROAS 27.2x)',
  'Creative Ads Strategy',
  'Google Analytics GA4',
  'Looker Studio',
  'Sistem Informasi (IPK 3.78)'
]
</script>

<template>
  <section class="py-10 sm:py-16 px-6 sm:px-10 bg-white">
    <div class="mx-auto max-w-5xl">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <!-- Left Column: Concise Headline, Black Skill Pills, Description & Bottom Stats -->
        <div class="lg:col-span-7 space-y-6" data-aos="fade-up">
          
          <!-- Headline (Concise, mixed bold weights, dark amber accent - media1 request) -->
          <h1 class="font-serif text-3xl sm:text-4xl lg:text-[42px] text-zinc-900 leading-[1.24] font-normal tracking-tight">
            <template v-if="locale === 'id'">
              {{ t('hero.title_part1') }}
              <span class="font-bold text-amber-700 underline decoration-amber-300/60 decoration-2 underline-offset-4">
                {{ t('hero.title_highlight') }}
              </span>
              {{ t('hero.title_part2') }}
              <span class="font-bold text-zinc-950">
                {{ t('hero.title_part3') }}
              </span>
            </template>
            <template v-else>
              {{ t('hero.title_part1') }}
              <span class="font-bold text-amber-700 underline decoration-amber-300/60 decoration-2 underline-offset-4">
                {{ t('hero.title_highlight') }}
              </span>
              {{ t('hero.title_part2') }}
              <span class="font-bold text-zinc-950">
                {{ t('hero.title_part3') }}
              </span>
            </template>
          </h1>

          <!-- Skill Pills (Black Background with White Text - Pill kebalikan) -->
          <div class="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1">
            <span
              v-for="(skill, idx) in skills"
              :key="idx"
              class="inline-flex items-center rounded-full bg-black px-3 py-1 font-mono text-[10px] sm:text-[11px] font-medium text-white shadow-xs hover:bg-zinc-800 transition-colors"
            >
              {{ skill }}
            </span>
          </div>

          <!-- Description (Narrative length from former media1 replacing media2) -->
          <div class="pt-2 border-t border-zinc-100">
            <p class="text-xs sm:text-[13px] text-zinc-600 font-normal leading-relaxed">
              {{ t('hero.desc') }}
            </p>
          </div>

          <!-- Key Metrics Strip with Scrolling Odometer Numbers (media2 bottom - preserved & localized) -->
          <div class="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-zinc-100">
            <div>
              <span class="text-[10px] font-semibold uppercase tracking-editorial text-zinc-400">
                {{ t('hero.metric_revenue') }}
              </span>
              <div class="mt-0.5 text-lg sm:text-xl font-bold text-zinc-900">
                <AnimatedCounter prefix="Rp " value="62.2" suffix="M+" :duration="1400" />
              </div>
            </div>
            <div>
              <span class="text-[10px] font-semibold uppercase tracking-editorial text-zinc-400">
                {{ t('hero.metric_roas') }}
              </span>
              <div class="mt-0.5 text-lg sm:text-xl font-bold text-zinc-900">
                <AnimatedCounter value="27.2" suffix="x" :duration="1500" />
              </div>
            </div>
            <div>
              <span class="text-[10px] font-semibold uppercase tracking-editorial text-zinc-400">
                {{ t('hero.metric_campaigns') }}
              </span>
              <div class="mt-0.5 text-lg sm:text-xl font-bold text-zinc-900">
                <AnimatedCounter value="27" suffix=" Ads" :duration="1200" />
              </div>
            </div>
            <div>
              <span class="text-[10px] font-semibold uppercase tracking-editorial text-zinc-400">
                {{ t('hero.metric_cpr') }}
              </span>
              <div class="mt-0.5 text-lg sm:text-xl font-bold text-zinc-900">
                <AnimatedCounter prefix="Rp " value="3.612" :duration="1600" />
              </div>
            </div>
          </div>

        </div>

        <!-- Right Column: Media 2 Hand-drawn Sketch Artwork -->
        <div class="lg:col-span-5 flex justify-center lg:justify-end" data-aos="fade-up" data-aos-delay="150">
          <div class="relative w-full max-w-[320px] sm:max-w-[380px] flex items-center justify-center p-2">
            <img
              :src="sketchAvatar"
              alt="Reynalda Syalwa - Digital Marketing & Growth Specialist Artwork"
              class="w-full h-auto object-contain select-none transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
