<script setup>
import { useI18n } from 'vue-i18n'
import { Target, Palette, Video, Layout, Globe, FileText } from 'lucide-vue-next'

const { t } = useI18n()

const pillars = [
  {
    icon: Target,
    titleKey: 'pillars.p1_title',
    descKey: 'pillars.p1_desc',
    tags: ['Meta Ads Manager', 'ABO Testing', 'Audience Demographics', 'CPR Control']
  },
  {
    icon: Palette,
    titleKey: 'pillars.p2_title',
    descKey: 'pillars.p2_desc',
    tags: ['Canva Pro', 'Adobe Photoshop', 'Flyer Komersial', 'Instagram Feed']
  },
  {
    icon: Video,
    titleKey: 'pillars.p3_title',
    descKey: 'pillars.p3_desc',
    tags: ['CapCut PC', 'Short-form Video', 'Hook Rate Opt', 'Algorithm Trends']
  },
  {
    icon: Layout,
    titleKey: 'pillars.p4_title',
    descKey: 'pillars.p4_desc',
    tags: ['Figma', 'UI/UX Design', 'App Mockup', 'Interactive Prototype']
  },
  {
    icon: Globe,
    titleKey: 'pillars.p5_title',
    descKey: 'pillars.p5_desc',
    tags: ['WordPress', 'Landing Page', 'HTML/CSS Basics', 'Information Systems']
  },
  {
    icon: FileText,
    titleKey: 'pillars.p6_title',
    descKey: 'pillars.p6_desc',
    tags: ['Invoicing', 'Proposal Klien', 'Data Archiving', 'Sertifikasi ISO']
  }
]
</script>

<template>
  <section id="pillars" class="py-16 sm:py-20 px-6 sm:px-10 border-t border-zinc-100 bg-white">
    <div class="mx-auto max-w-5xl space-y-10" data-aos="fade-up">
      <!-- Section Header -->
      <div class="max-w-3xl space-y-2">
        <span class="text-[11px] font-semibold uppercase tracking-editorial text-zinc-400">
          {{ t('pillars.tag') }}
        </span>
        <h2 class="font-serif text-2xl sm:text-3xl text-zinc-900 leading-snug">
          {{ t('pillars.title') }}
        </h2>
        <p class="text-xs sm:text-sm text-zinc-500 font-normal leading-relaxed">
          {{ t('pillars.desc') }}
        </p>
      </div>

      <!-- 6 Pillars Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <div
          v-for="(p, idx) in pillars"
          :key="idx"
          class="flex flex-col justify-between rounded-2xl border border-zinc-200/70 bg-zinc-50/40 p-6 transition-all hover:border-zinc-400"
          data-aos="fade-up"
          :data-aos-delay="idx * 50"
        >
          <div>
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-zinc-200/80 text-zinc-800">
              <component :is="p.icon" class="h-5 w-5" />
            </div>
            <h3 class="mt-4 font-serif text-lg font-medium text-zinc-900">
              {{ t(p.titleKey) }}
            </h3>
            <p class="mt-2 text-xs sm:text-[13px] leading-relaxed text-zinc-500 font-normal">
              {{ t(p.descKey) }}
            </p>
          </div>

          <!-- Tags -->
          <div class="mt-5 flex flex-wrap gap-1.5 pt-4 border-t border-zinc-100">
            <span
              v-for="tag in p.tags"
              :key="tag"
              class="rounded-full border border-zinc-200/80 bg-white px-2.5 py-0.5 font-mono text-[10px] text-zinc-600"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
