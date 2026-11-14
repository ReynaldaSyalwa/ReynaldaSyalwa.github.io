<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { CheckCircle2, Search, ShieldCheck } from 'lucide-vue-next'
import AnimatedCounter from './ui/AnimatedCounter.vue'

const { t, locale } = useI18n()
const searchQuery = ref('')

const deals = [
  {
    no: 1,
    month: 'Januari 2025',
    client: 'Agus Susanto',
    service: 'Sertifikasi ISO & Konsultasi Manajemen',
    ad_spend: 654790,
    deal_value: 5550000,
    status: 'DEAL',
    roas: '8.5x'
  },
  {
    no: 2,
    month: 'November 2025',
    client: 'Pak Ady (Yayasan KPM Hadist)',
    service: 'Layanan Sertifikasi ISO Manajemen Mutu',
    ad_spend: 407602,
    deal_value: 9990000,
    status: 'DEAL',
    roas: '24.5x'
  },
  {
    no: 3,
    month: 'November 2025',
    client: 'Hermawan',
    service: 'Paket Sertifikasi Manajemen Bisnis',
    ad_spend: 407602,
    deal_value: 8658000,
    status: 'DEAL',
    roas: '21.2x'
  },
  {
    no: 4,
    month: 'November 2025',
    client: 'Pak Yuda (Yayasan Nurul Anwar)',
    service: 'Sertifikasi ISO & Verifikasi Legalitas Dokumen',
    ad_spend: 407602,
    deal_value: 6660000,
    status: 'DEAL',
    roas: '16.3x'
  },
  {
    no: 5,
    month: 'Desember 2025',
    client: '(Pak Khoirul) Yayasan Al-barokah',
    service: 'Paket Sertifikasi Institusional Skala Besar',
    ad_spend: 328468,
    deal_value: 31430000,
    status: 'DEAL',
    roas: '95.7x'
  }
]

function formatIDR(val) {
  return 'Rp ' + Number(val).toLocaleString('id-ID')
}

const filteredDeals = computed(() => {
  if (!searchQuery.value.trim()) return deals
  const q = searchQuery.value.toLowerCase()
  return deals.filter(d => 
    d.client.toLowerCase().includes(q) ||
    d.service.toLowerCase().includes(q) ||
    d.month.toLowerCase().includes(q)
  )
})

const totalRevenue = computed(() => {
  return filteredDeals.value.reduce((acc, curr) => acc + curr.deal_value, 0)
})
</script>

<template>
  <section id="deals" class="py-16 sm:py-20 px-6 sm:px-10 border-t border-zinc-100 bg-white">
    <div class="mx-auto max-w-5xl space-y-8" data-aos="fade-up">
      <!-- Section Header -->
      <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div class="space-y-2">
          <span class="text-[11px] font-semibold uppercase tracking-editorial text-zinc-400">
            {{ t('deals_section.tag') }}
          </span>
          <h2 class="font-serif text-2xl sm:text-3xl text-zinc-900 leading-snug">
            {{ t('deals_section.title') }}
          </h2>
          <p class="text-xs sm:text-sm text-zinc-500 font-normal leading-relaxed max-w-2xl">
            {{ t('deals_section.desc') }}
          </p>
        </div>

        <div class="self-start md:self-auto inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-mono text-zinc-700">
          <ShieldCheck class="h-3.5 w-3.5 text-zinc-900" />
          <span>{{ locale === 'id' ? 'Audit Log CRM Terverifikasi' : 'Verified CRM Audit Records' }}</span>
        </div>
      </div>

      <!-- Search Filter Bar -->
      <div class="flex items-center justify-between gap-4">
        <div class="relative w-full max-w-xs">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="t('deals_section.search_placeholder')"
            class="w-full rounded-full border border-zinc-200 py-1.5 pl-8 pr-3 text-xs text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500"
          />
        </div>
        <div class="text-xs text-zinc-400 font-mono">
          Showing <span class="font-bold text-zinc-800">{{ filteredDeals.length }}</span> of {{ deals.length }} Deals
        </div>
      </div>

      <!-- Borderless Editorial Table -->
      <div class="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs sm:text-sm text-zinc-800">
            <thead class="border-b border-zinc-100 bg-zinc-50/70 text-[11px] font-semibold uppercase tracking-editorial text-zinc-400">
              <tr>
                <th scope="col" class="py-3.5 pl-6 pr-3">No</th>
                <th scope="col" class="px-3 py-3.5">Bulan</th>
                <th scope="col" class="px-3 py-3.5">Klien</th>
                <th scope="col" class="px-3 py-3.5">Layanan</th>
                <th scope="col" class="px-3 py-3.5 text-right">Ad Spend</th>
                <th scope="col" class="px-3 py-3.5 text-right">Nilai Deal</th>
                <th scope="col" class="py-3.5 pl-3 pr-6 text-center">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-zinc-100 font-sans">
              <tr
                v-for="d in filteredDeals"
                :key="d.no"
                class="transition-colors hover:bg-zinc-50/50"
              >
                <td class="py-3.5 pl-6 pr-3 font-mono text-xs text-zinc-400">{{ d.no }}</td>
                <td class="whitespace-nowrap px-3 py-3.5 font-mono text-xs text-zinc-600">{{ d.month }}</td>
                <td class="px-3 py-3.5 font-medium text-zinc-900">{{ d.client }}</td>
                <td class="px-3 py-3.5 text-xs text-zinc-500">{{ d.service }}</td>
                <td class="whitespace-nowrap px-3 py-3.5 text-right font-mono text-xs text-zinc-500">
                  {{ formatIDR(d.ad_spend) }}
                </td>
                <td class="whitespace-nowrap px-3 py-3.5 text-right font-mono font-bold text-zinc-900">
                  {{ formatIDR(d.deal_value) }}
                  <span class="ml-1 text-[10px] font-normal text-zinc-400">({{ d.roas }})</span>
                </td>
                <td class="py-3.5 pl-3 pr-6 text-center">
                  <span class="inline-flex items-center rounded-full bg-black px-2.5 py-0.5 text-[10px] font-semibold text-white">
                    {{ d.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Summary Bar Footer with Animated Counter -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-zinc-100 bg-zinc-50/60 px-6 py-3.5 text-xs">
          <div class="text-zinc-500">
            Total {{ filteredDeals.length }} transaksi deal terverifikasi
          </div>
          <div class="flex items-center gap-2">
            <span class="text-zinc-400 uppercase tracking-editorial text-[10px]">TOTAL OMZET:</span>
            <span class="font-mono text-base font-bold text-zinc-900">
              <AnimatedCounter prefix="Rp " value="62.288.000" :duration="1400" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
