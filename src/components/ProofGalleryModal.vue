<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-vue-next'

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
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
    @click.self="emit('close')"
  >
    <div class="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-obsidian-600 bg-obsidian-900 shadow-2xl">
      <!-- Modal Header -->
      <div class="flex items-center justify-between border-b border-obsidian-600 px-6 py-4">
        <div>
          <span class="text-xs font-semibold text-growth-400">
            {{ currentImage.category === 'ads' ? t('modal.category_ads') : t('modal.category_sheet') }}
          </span>
          <h3 class="text-base font-bold text-white">
            {{ currentImage.title }}
          </h3>
        </div>

        <button
          @click="emit('close')"
          class="flex h-9 w-9 items-center justify-center rounded-full border border-obsidian-600 bg-obsidian-800 text-zinc-300 transition-colors hover:bg-obsidian-700 hover:text-white"
        >
          <X class="h-5 w-5" />
        </button>
      </div>

      <!-- Main Image Viewport with Nav Arrows -->
      <div class="relative flex flex-1 items-center justify-center overflow-hidden bg-obsidian-950 p-4">
        <img
          :src="currentImage.src"
          :alt="currentImage.title"
          class="max-h-[60vh] max-w-full rounded-lg border border-obsidian-700 object-contain shadow-lg"
        />

        <!-- Left Arrow -->
        <button
          @click="prevImage"
          class="absolute left-6 flex h-10 w-10 items-center justify-center rounded-full border border-obsidian-600 bg-obsidian-800/80 text-white backdrop-blur-sm transition-all hover:bg-white hover:text-black"
        >
          <ChevronLeft class="h-5 w-5" />
        </button>

        <!-- Right Arrow -->
        <button
          @click="nextImage"
          class="absolute right-6 flex h-10 w-10 items-center justify-center rounded-full border border-obsidian-600 bg-obsidian-800/80 text-white backdrop-blur-sm transition-all hover:bg-white hover:text-black"
        >
          <ChevronRight class="h-5 w-5" />
        </button>
      </div>

      <!-- Description & Thumbnail Bar -->
      <div class="border-t border-obsidian-600 bg-obsidian-800/80 px-6 py-4">
        <p class="text-xs text-zinc-300">
          {{ currentImage.desc }}
        </p>

        <!-- Thumbnails -->
        <div class="mt-3 flex gap-2 overflow-x-auto pb-1">
          <button
            v-for="(img, idx) in proofImages"
            :key="img.id"
            @click="selectImage(idx)"
            :class="['h-14 w-20 flex-shrink-0 overflow-hidden rounded-md border transition-all', currentIndex === idx ? 'border-growth-400 ring-2 ring-growth-400/40' : 'border-obsidian-600 opacity-60 hover:opacity-100']"
          >
            <img :src="img.src" :alt="img.title" class="h-full w-full object-cover" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
