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
  <section id="pillars" class="relative py-20 border-t border-zendesk-divider bg-zendesk-white">
    <div class="mx-auto max-w-7xl px-6 sm:px-8">
      <!-- Section Header -->
      <div class="max-w-3xl">
        <span class="inline-block rounded-tags bg-zendesk-warm px-3 py-1 text-xs font-semibold uppercase tracking-zendesk text-zendesk-forest border border-zendesk-divider">
          {{ t('pillars.tag') }}
        </span>
        <h2 class="mt-3 text-3xl font-semibold tracking-zendesk text-zendesk-ink sm:text-4xl">
          {{ t('pillars.title') }}
        </h2>
        <p class="mt-3 text-base font-normal leading-relaxed text-zendesk-ink/80 tracking-zendesk">
          {{ t('pillars.desc') }}
        </p>
      </div>

      <!-- 6 Pillars Grid: Zendesk Flat Cards (0px radius, #f5f5f2 background, zero shadow) -->
      <div class="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(p, idx) in pillars"
          :key="idx"
          class="flex flex-col justify-between rounded-cards border border-zendesk-divider bg-zendesk-warm p-7 transition-colors hover:border-zendesk-stone"
        >
          <div>
            <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-zendesk-white border border-zendesk-divider text-zendesk-forest">
              <component :is="p.icon" class="h-6 w-6" />
            </div>
            <h3 class="mt-5 text-lg font-semibold tracking-zendesk text-zendesk-ink">
              {{ t(p.titleKey) }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-zendesk-ink/80 tracking-zendesk">
              {{ t(p.descKey) }}
            </p>
          </div>

          <!-- Tags (Zendesk 4px tags) -->
          <div class="mt-6 flex flex-wrap gap-1.5 border-t border-zendesk-divider pt-4">
            <span
              v-for="tag in p.tags"
              :key="tag"
              class="rounded-tags border border-zendesk-divider bg-zendesk-white px-2.5 py-1 font-mono text-[11px] font-medium text-zendesk-ink/80"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
