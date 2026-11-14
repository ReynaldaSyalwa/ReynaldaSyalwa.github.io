<script setup>
import { useI18n } from 'vue-i18n'
import { ExternalLink, ArrowUpRight } from 'lucide-vue-next'

const emit = defineEmits(['open-modal'])
const { t, locale } = useI18n()

const projects = [
  {
    id: 'p1',
    type: 'featured',
    category: 'ads',
    yearLocation: '2025–2026 • SURABAYA • PERFORMANCE MARKETING',
    titleId: 'Scaling institutional ISO certification client closing with 95.7x ROAS',
    descId: 'Converting Rp 328k Meta Ads spend into Rp 31.4M verified commercial contract revenue.',
    img: 'screenshots/meta-ads/03_meta_ads_okt2025_jan2026.webp',
    modalType: 'ads'
  },
  {
    id: 'p2',
    type: 'featured',
    category: 'sheet',
    yearLocation: '2025 • INDONESIA • SALES CLOSING & CRM',
    titleId: 'Converting paid inquiries into Rp 62.2M+ high-ticket B2B deals',
    descId: 'Structuring full-funnel WhatsApp consultation pipelines for institutional clients and foundations.',
    img: 'screenshots/leads-deals/leads_deals_sep_des2025.webp',
    modalType: 'sheet'
  },
  {
    id: 'p3',
    type: 'grid',
    category: 'ads',
    yearLocation: '2026 • EFFICIENCY • META ADS MANAGER',
    titleId: 'Achieving record-low Rp 3.612 Cost-Per-Result across 27 campaigns',
    descId: 'Optimizing audience ABO testing to maximize high-intent consultation messages.',
    img: 'screenshots/meta-ads/05_meta_ads_apr_jul_2026.webp',
    modalType: 'ads'
  },
  {
    id: 'p4',
    type: 'grid',
    category: 'ads',
    yearLocation: '2025–2026 • CREATIVE & CONTENT • GROWTH',
    titleId: 'High-conversion commercial flyers & short-form video creatives',
    descId: 'Iterative creative testing across Canva, Photoshop, and short-form video hooks.',
    img: 'screenshots/meta-ads/01_meta_ads_jan_apr_2025.webp',
    modalType: 'ads'
  }
]
</script>

<template>
  <section id="ads" class="py-12 sm:py-16 px-6 sm:px-10 bg-white">
    <div class="mx-auto max-w-5xl space-y-16 sm:space-y-20">
      
      <!-- Project 1 (Full-width Featured Card matching reference screenshot) -->
      <article
        class="group cursor-pointer space-y-4"
        data-aos="fade-up"
        @click="emit('open-modal', projects[0].modalType)"
      >
        <div class="relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-zinc-50 aspect-[16/9] sm:aspect-[21/10]">
          <img
            :src="projects[0].img"
            :alt="projects[0].titleId"
            class="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
          />
          <div class="absolute bottom-3 right-3 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[11px] font-medium text-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow-sm">
            <span>{{ locale === 'id' ? 'Buka Bukti' : 'View Proof' }}</span>
            <ArrowUpRight class="h-3 w-3" />
          </div>
        </div>

        <div class="space-y-1 pt-1">
          <p class="text-[11px] font-medium uppercase tracking-editorial text-zinc-500">
            {{ projects[0].yearLocation }}
          </p>
          <h2 class="font-serif text-xl sm:text-2xl text-zinc-900 group-hover:text-black transition-colors leading-snug">
            {{ projects[0].titleId }}
          </h2>
          <p class="text-xs sm:text-sm text-zinc-500 font-normal">
            {{ projects[0].descId }}
          </p>
        </div>
      </article>

      <!-- Project 2 (Full-width Featured Card matching reference screenshot) -->
      <article
        class="group cursor-pointer space-y-4"
        data-aos="fade-up"
        @click="emit('open-modal', projects[1].modalType)"
      >
        <div class="relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-zinc-50 aspect-[16/9] sm:aspect-[21/10]">
          <img
            :src="projects[1].img"
            :alt="projects[1].titleId"
            class="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
          />
          <div class="absolute bottom-3 right-3 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[11px] font-medium text-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow-sm">
            <span>{{ locale === 'id' ? 'Buka Bukti' : 'View Proof' }}</span>
            <ArrowUpRight class="h-3 w-3" />
          </div>
        </div>

        <div class="space-y-1 pt-1">
          <p class="text-[11px] font-medium uppercase tracking-editorial text-zinc-500">
            {{ projects[1].yearLocation }}
          </p>
          <h2 class="font-serif text-xl sm:text-2xl text-zinc-900 group-hover:text-black transition-colors leading-snug">
            {{ projects[1].titleId }}
          </h2>
          <p class="text-xs sm:text-sm text-zinc-500 font-normal">
            {{ projects[1].descId }}
          </p>
        </div>
      </article>

      <!-- 2-Column Grid (Projects 3 & 4 Side by Side matching reference screenshot) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
        <!-- Project 3 -->
        <article
          class="group cursor-pointer space-y-3"
          data-aos="fade-up"
          @click="emit('open-modal', projects[2].modalType)"
        >
          <div class="relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-zinc-50 aspect-[16/10]">
            <img
              :src="projects[2].img"
              :alt="projects[2].titleId"
              class="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
            />
          </div>
          <div class="space-y-1 pt-1">
            <p class="text-[10px] sm:text-[11px] font-medium uppercase tracking-editorial text-zinc-500">
              {{ projects[2].yearLocation }}
            </p>
            <h3 class="font-serif text-lg sm:text-xl text-zinc-900 group-hover:text-black transition-colors leading-snug">
              {{ projects[2].titleId }}
            </h3>
            <p class="text-xs text-zinc-500">
              {{ projects[2].descId }}
            </p>
          </div>
        </article>

        <!-- Project 4 -->
        <article
          class="group cursor-pointer space-y-3"
          data-aos="fade-up"
          data-aos-delay="100"
          @click="emit('open-modal', projects[3].modalType)"
        >
          <div class="relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-zinc-50 aspect-[16/10]">
            <img
              :src="projects[3].img"
              :alt="projects[3].titleId"
              class="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
            />
          </div>
          <div class="space-y-1 pt-1">
            <p class="text-[10px] sm:text-[11px] font-medium uppercase tracking-editorial text-zinc-500">
              {{ projects[3].yearLocation }}
            </p>
            <h3 class="font-serif text-lg sm:text-xl text-zinc-900 group-hover:text-black transition-colors leading-snug">
              {{ projects[3].titleId }}
            </h3>
            <p class="text-xs text-zinc-500">
              {{ projects[3].descId }}
            </p>
          </div>
        </article>
      </div>

    </div>
  </section>
</template>
