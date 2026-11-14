<script setup>
import { useI18n } from 'vue-i18n'
import { Target, Palette, Video, Layout, Globe, FileText } from 'lucide-vue-next'
import GlowCard from './ui/GlowCard.vue'

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
  <section id="pillars" class="relative py-20 border-t border-obsidian-600/70 bg-obsidian-950">
    <div class="mx-auto max-w-7xl px-6 sm:px-8">
      <!-- Section Header -->
      <div class="max-w-3xl">
        <span class="text-xs font-bold uppercase tracking-wider text-growth-400">
          {{ t('pillars.tag') }}
        </span>
        <h2 class="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          {{ t('pillars.title') }}
        </h2>
        <p class="mt-3 text-base text-zinc-400">
          {{ t('pillars.desc') }}
        </p>
      </div>

      <!-- 6 Pillars Grid -->
      <div class="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <GlowCard
          v-for="(p, idx) in pillars"
          :key="idx"
          className="flex flex-col justify-between"
        >
          <div>
            <div class="flex h-12 w-12 items-center justify-center rounded-xl border border-growth-500/30 bg-growth-500/10 text-growth-400">
              <component :is="p.icon" class="h-6 w-6" />
            </div>
            <h3 class="mt-5 text-lg font-bold text-white">
              {{ t(p.titleKey) }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-zinc-300">
              {{ t(p.descKey) }}
            </p>
          </div>

          <!-- Tags -->
          <div class="mt-6 flex flex-wrap gap-1.5 border-t border-obsidian-600/60 pt-4">
            <span
              v-for="tag in p.tags"
              :key="tag"
              class="rounded-md border border-obsidian-600 bg-obsidian-900 px-2 py-1 font-mono text-[11px] text-zinc-400"
            >
              {{ tag }}
            </span>
          </div>
        </GlowCard>
      </div>
    </div>
  </section>
</template>
