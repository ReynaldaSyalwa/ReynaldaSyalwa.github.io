<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { X, ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  initialCategory: {
    type: String,
    default: 'ads'
  }
})

const emit = defineEmits(['close'])
const { t } = useI18n()

const proofImages = [
  {
    id: 1,
    title: 'Meta Ads Manager: Januari – April 2025',
    category: 'ads',
    src: 'screenshots/meta-ads/01_meta_ads_jan_apr_2025.webp',
    desc: 'Laporan Meta Ads awal tahun 2025, termasuk kampanye Ads NSM Januari 2025 (CPR Rp 6.894) dan Konten Ads Promo Lebaran.'
  },
  {
    id: 2,
    title: 'Meta Ads Manager: Mei – September 2025',
    category: 'ads',
    src: 'screenshots/meta-ads/02_meta_ads_mei_sep_2025.webp',
    desc: 'Performa kampanye pertengahan 2025. Ads NSM Mei 2025 mencetak 53 percakapan pesan dengan CPR sangat murah Rp 7.236.'
  },
  {
    id: 3,
    title: 'Meta Ads Manager: Oktober 2025 – Januari 2026',
    category: 'ads',
    src: 'screenshots/meta-ads/03_meta_ads_okt2025_jan2026.webp',
    desc: 'Ads November - mbg 2025 mencetak rekor 75 hasil pesan (CPR Rp 5.435) yang berbuah 3 transaksi DEAL senilai Rp 25.3 Juta.'
  },
  {
    id: 4,
    title: 'Meta Ads Manager: Februari – April 2026',
    category: 'ads',
    src: 'screenshots/meta-ads/04_meta_ads_feb_apr_2026.webp',
    desc: 'Evaluasi kampanye kuartal pertama 2026 dengan total jangkauan puluhan ribu akun unik di sektor sertifikasi ISO.'
  },
  {
    id: 5,
    title: 'Meta Ads Manager: April – Juli 2026',
    category: 'ads',
    src: 'screenshots/meta-ads/05_meta_ads_apr_jul_2026.webp',
    desc: 'Ads NSM Mei 2026 MBG mencatatkan CPR terendah sepanjang masa: Rp 3.612 per percakapan pesan dimulai.'
  },
  {
    id: 6,
    title: 'Meta Ads Manager: Agustus – November 2026',
    category: 'ads',
    src: 'screenshots/meta-ads/06_meta_ads_agu_nov_2026.webp',
    desc: 'Ads NSM Agustus 2026 berhasil menghasilkan 36 percakapan pesan berkualitas dengan CPR Rp 9.930.'
  },
  {
    id: 7,
    title: 'CRM Spreadsheet: Prospek & Closing Januari 2025',
    category: 'sheet',
    src: 'screenshots/leads-deals/leads_deals_jan2025.webp',
    desc: 'Catatan prospek masuk dan closing resmi klien Agus Susanto senilai Rp 5.550.000 dengan biaya iklan Rp 654.790 (ROAS 8.5x).'
  },
  {
    id: 8,
    title: 'CRM Spreadsheet: Prospek & Closing Sep – Des 2025',
    category: 'sheet',
    src: 'screenshots/leads-deals/leads_deals_sep_des2025.webp',
    desc: 'Daftar 33 prospek masuk dan 4 transaksi DEAL di November & Desember 2025 dengan total omzet Rp 56.738.000 (ROAS 34.8x).'
  }
]

const currentIndex = ref(0)

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    if (props.initialCategory === 'sheet') {
      currentIndex.value = 6
    } else {
      currentIndex.value = 0
    }
  }
})

const currentImage = computed(() => {
  return proofImages[currentIndex.value]
})

function nextImage() {
  currentIndex.value = (currentIndex.value + 1) % proofImages.length
}

function prevImage() {
  currentIndex.value = (currentIndex.value - 1 + proofImages.length) % proofImages.length
}

function selectImage(idx) {
  currentIndex.value = idx
}
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
    @click.self="emit('close')"
  >
    <!-- Modal Container: 16px radius, Warm White #f5f5f2 background, zero shadow -->
    <div class="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-zendesk-divider bg-zendesk-warm">
      <!-- Modal Header -->
      <div class="flex items-center justify-between border-b border-zendesk-divider bg-zendesk-white px-6 py-4">
        <div>
          <span class="inline-block rounded-tags bg-zendesk-warm px-2 py-0.5 text-xs font-semibold uppercase tracking-zendesk text-zendesk-forest">
            {{ currentImage.category === 'ads' ? t('modal.category_ads') : t('modal.category_sheet') }}
          </span>
          <h3 class="mt-1 text-base font-semibold tracking-zendesk text-zendesk-ink">
            {{ currentImage.title }}
          </h3>
        </div>

        <!-- Zendesk Circular Icon Button: radius 100%, 1px border #11110d -->
        <button
          @click="emit('close')"
          class="flex h-9 w-9 items-center justify-center rounded-full border border-zendesk-ink bg-transparent text-zendesk-ink transition-colors hover:bg-stone-200"
          aria-label="Close modal"
        >
          <X class="h-4 w-4" />
        </button>
      </div>

      <!-- Main Image Viewport with Circular Arrow Nav (Zendesk signature circular buttons) -->
      <div class="relative flex flex-1 items-center justify-center overflow-hidden bg-zendesk-white p-6">
        <img
          :src="currentImage.src"
          :alt="currentImage.title"
          class="max-h-[60vh] max-w-full rounded-lg border border-zendesk-divider object-contain"
        />

        <!-- Left Circular Arrow -->
        <button
          @click="prevImage"
          class="absolute left-6 flex h-10 w-10 items-center justify-center rounded-full border border-zendesk-ink bg-zendesk-white/90 text-zendesk-ink transition-colors hover:bg-zendesk-lime"
          aria-label="Previous image"
        >
          <ChevronLeft class="h-5 w-5" />
        </button>

        <!-- Right Circular Arrow -->
        <button
          @click="nextImage"
          class="absolute right-6 flex h-10 w-10 items-center justify-center rounded-full border border-zendesk-ink bg-zendesk-white/90 text-zendesk-ink transition-colors hover:bg-zendesk-lime"
          aria-label="Next image"
        >
          <ChevronRight class="h-5 w-5" />
        </button>
      </div>

      <!-- Description & Thumbnail Bar -->
      <div class="border-t border-zendesk-divider bg-zendesk-warm px-6 py-4">
        <p class="text-xs font-normal leading-relaxed text-zendesk-ink/80 tracking-zendesk">
          {{ currentImage.desc }}
        </p>

        <!-- Thumbnails -->
        <div class="mt-3 flex gap-2 overflow-x-auto pb-1">
          <button
            v-for="(img, idx) in proofImages"
            :key="img.id"
            @click="selectImage(idx)"
            :class="[
              'h-14 w-20 flex-shrink-0 overflow-hidden rounded-md border transition-all',
              currentIndex === idx
                ? 'border-zendesk-forest ring-2 ring-zendesk-lime'
                : 'border-zendesk-divider opacity-60 hover:opacity-100'
            ]"
          >
            <img :src="img.src" :alt="img.title" class="h-full w-full object-cover" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
