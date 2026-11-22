<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { X, Play, ArrowUpRight } from 'lucide-vue-next'
import { FLYERS, VIDEOS } from '../composables/usePortfolio'

const { t, locale } = useI18n()

const tab = ref('flyer')       // 'flyer' | 'video'
const brand = ref('all')       // 'all' | 'iso' | 'iwash'
const lightbox = ref(null)     // { type, item }

const brandFilters = [
  { id: 'all', key: 'work.filter_all' },
  { id: 'iso', key: 'work.filter_iso' },
  { id: 'iwash', key: 'work.filter_iwash' },
]

const shownFlyers = computed(() =>
  brand.value === 'all' ? FLYERS : FLYERS.filter(f => f.brand === brand.value)
)

const shownVideos = computed(() =>
  brand.value === 'all' ? VIDEOS : VIDEOS.filter(v => v.brand === brand.value)
)

function openFlyer(f) {
  lightbox.value = { type: 'flyer', item: f }
}
function openVideo(v) {
  lightbox.value = { type: 'video', item: v }
}
function close() {
  lightbox.value = null
}
</script>

<template>
  <section id="work" class="bg-cream px-5 py-14 sm:px-8 sm:py-20">
    <div class="mx-auto max-w-shell">
      <div class="flex flex-wrap items-end justify-between gap-5">
        <div class="max-w-2xl">
          <p class="text-[10.5px] font-bold uppercase tracking-wide2 text-amber">
            {{ t('work.index') }} — {{ t('work.title_part1') }} {{ t('work.title_part2') }}
          </p>
          <h2 class="mt-2 font-display text-display-sm font-extrabold text-ink">
            {{ t('work.title_part1') }} {{ t('work.title_part2') }}
          </h2>
          <p class="mt-3 text-[14px] leading-relaxed text-ink/55">{{ t('work.lead') }}</p>
        </div>

        <!-- Tab flyer / video -->
        <div class="inline-flex rounded-pill border border-ink/15 bg-white p-1">
          <button
            type="button"
            class="rounded-pill px-4 py-1.5 text-[12px] font-semibold transition-colors"
            :class="tab === 'flyer' ? 'bg-ink text-white' : 'text-ink/60 hover:text-ink'"
            @click="tab = 'flyer'"
          >{{ t('work.tab_flyer') }}</button>
          <button
            type="button"
            class="rounded-pill px-4 py-1.5 text-[12px] font-semibold transition-colors"
            :class="tab === 'video' ? 'bg-ink text-white' : 'text-ink/60 hover:text-ink'"
            @click="tab = 'video'"
          >{{ t('work.tab_video') }}</button>
        </div>
      </div>

      <!-- Filter brand + hitungan -->
      <div class="mt-7 flex flex-wrap items-center gap-2">
        <button
          v-for="f in brandFilters"
          :key="f.id"
          type="button"
          class="rounded-pill border px-3.5 py-1.5 text-[11.5px] font-semibold transition-colors"
          :class="brand === f.id
            ? 'border-ink bg-ink text-white'
            : 'border-ink/15 bg-transparent text-ink/60 hover:border-ink/35 hover:text-ink'"
          @click="brand = f.id"
        >{{ t(f.key) }}</button>

        <span class="ml-auto text-[11.5px] text-ink/40">
          {{ tab === 'flyer' ? shownFlyers.length : shownVideos.length }}
          {{ tab === 'flyer' ? t('work.count_flyer') : t('work.count_video') }}
        </span>
      </div>

      <!-- Grid flyer -->
      <div v-if="tab === 'flyer'" class="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        <button
          v-for="f in shownFlyers"
          :key="f.file"
          type="button"
          class="group relative aspect-[4/5] overflow-hidden rounded-card bg-ink/5 text-left shadow-soft transition-shadow hover:shadow-lift"
          @click="openFlyer(f)"
        >
          <img
            :src="`/media/flyers/${f.file}.webp`"
            :alt="locale === 'id' ? f.title_id : f.title_en"
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <!-- Overlay -->
          <div class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/85 via-ink/10 to-transparent p-3.5 opacity-0 transition-opacity group-hover:opacity-100">
            <p class="text-[12px] font-semibold leading-snug text-white">
              {{ locale === 'id' ? f.title_id : f.title_en }}
            </p>
            <p class="mt-1 text-[10.5px] text-white/65">{{ locale === 'id' ? f.tag_id : f.tag_en }}</p>
          </div>
          <!-- Badge brand -->
          <span
            class="absolute left-2.5 top-2.5 rounded-pill px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wide2 backdrop-blur"
            :class="f.brand === 'iso' ? 'bg-ink/85 text-white' : 'bg-white/90 text-ink'"
          >{{ f.brand === 'iso' ? 'ISO' : 'IWASH' }}</span>
        </button>
      </div>

      <!-- Grid video -->
      <div v-else class="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        <button
          v-for="v in shownVideos"
          :key="v.file"
          type="button"
          class="group relative overflow-hidden rounded-card bg-ink/5 text-left shadow-soft transition-shadow hover:shadow-lift"
          :class="v.ratio === '16:9' ? 'col-span-2 aspect-video' : 'aspect-[9/16]'"
          @click="openVideo(v)"
        >
          <img
            :src="`/media/posters/${v.poster}.webp`"
            :alt="locale === 'id' ? v.title_id : v.title_en"
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <!-- Play button -->
          <span class="absolute inset-0 flex items-center justify-center">
            <span class="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-chip transition-transform group-hover:scale-110">
              <Play class="ml-0.5 h-4 w-4 text-ink" fill="currentColor" />
            </span>
          </span>
          <!-- Duration + judul -->
          <span class="absolute right-2.5 top-2.5 rounded bg-ink/80 px-1.5 py-0.5 font-mono text-[9.5px] text-white">
            {{ v.duration }}
          </span>
          <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-3">
            <p class="text-[11.5px] font-semibold leading-snug text-white">
              {{ locale === 'id' ? v.title_id : v.title_en }}
            </p>
          </div>
        </button>
      </div>

      <p class="mt-6 flex items-center gap-1.5 text-[11.5px] text-ink/40">
        {{ t('work.role') }}: <span class="font-semibold text-ink/60">{{ t('work.role_value') }}</span>
      </p>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <div
        v-if="lightbox"
        class="fixed inset-0 z-50 flex items-center justify-center bg-ink/92 p-4 backdrop-blur-sm"
        @click.self="close"
      >
        <button
          type="button"
          class="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          :aria-label="t('common.close')"
          @click="close"
        >
          <X class="h-5 w-5" />
        </button>

        <!-- Flyer besar -->
        <img
          v-if="lightbox.type === 'flyer'"
          :src="`/media/flyers/${lightbox.item.file}.webp`"
          :alt="locale === 'id' ? lightbox.item.title_id : lightbox.item.title_en"
          class="max-h-[88vh] max-w-full rounded-card object-contain shadow-lift"
        />

        <!-- Video player -->
        <div v-else class="w-full max-w-md">
          <video
            :src="`/media/video/${lightbox.item.file}.mp4`"
            :poster="`/media/posters/${lightbox.item.poster}.webp`"
            class="w-full rounded-card shadow-lift"
            controls
            autoplay
            playsinline
          />
          <p class="mt-3 text-center text-[12.5px] font-medium text-white/70">
            {{ locale === 'id' ? lightbox.item.title_id : lightbox.item.title_en }}
          </p>
        </div>
      </div>
    </Teleport>
  </section>
</template>
