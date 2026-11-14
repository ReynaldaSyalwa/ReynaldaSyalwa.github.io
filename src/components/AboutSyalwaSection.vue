<script setup>
import { useI18n } from 'vue-i18n'
import { GraduationCap, Award, MapPin, CheckCircle2 } from 'lucide-vue-next'
import portraitPhoto from '@/assets/reynalda-syalwa-portrait.jpg'

const { t, locale } = useI18n()
</script>

<template>
  <section id="about" class="py-16 sm:py-20 px-6 sm:px-10 border-t border-zinc-100 bg-white">
    <div class="mx-auto max-w-5xl" data-aos="fade-up">
      
      <!-- Section Tag -->
      <div class="space-y-2 mb-10">
        <span class="text-[11px] font-semibold uppercase tracking-editorial text-zinc-400">
          {{ locale === 'id' ? 'TENTANG REYNALDA SYALWA' : 'ABOUT REYNALDA SYALWA' }}
        </span>
        <h2 class="font-serif text-2xl sm:text-3xl text-zinc-900 leading-snug">
          {{ locale === 'id' 
            ? 'Kombinasi Logika Sistem Informasi & Intuisi Pertumbuhan Komersial'
            : 'Bridging Information Systems Logic & Commercial Growth Strategy'
          }}
        </h2>
      </div>

      <!-- 2-Column Profile Grid: Photo Left + Narrative Bio Right -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        
        <!-- Left: Portrait Photo (from Media 4) -->
        <div class="md:col-span-5 flex flex-col items-center sm:items-start" data-aos="fade-up">
          <div class="relative w-full max-w-[340px] aspect-square rounded-2xl overflow-hidden border border-zinc-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] bg-zinc-50">
            <img
              :src="portraitPhoto"
              alt="Reynalda Vonna Syalwa (SyaSya)"
              class="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>

          <div class="mt-3.5 space-y-1">
            <h3 class="font-serif text-lg font-bold text-zinc-900">
              Reynalda Vonna Syalwa (SyaSya)
            </h3>
            <p class="font-mono text-xs text-zinc-500 flex items-center gap-1.5">
              <MapPin class="h-3 w-3 text-zinc-400" />
              <span>Surabaya, Jawa Timur, Indonesia</span>
            </p>
          </div>
        </div>

        <!-- Right: Bio Narrative & Credential Highlights -->
        <div class="md:col-span-7 space-y-5 text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal" data-aos="fade-up" data-aos-delay="100">
          <p>
            {{ locale === 'id'
              ? 'Lulusan Sarjana Sistem Informasi dari Universitas Dinamika (Stikom Surabaya) dengan predikat sangat memuaskan (IPK 3,78). Saya menggabungkan analisis sistem, ketelitian audit data, serta intuisi kreatif dalam merancang ekosistem pertumbuhan digital.'
              : 'Graduate of Information Systems from Universitas Dinamika (Stikom Surabaya) with high honors (GPA 3.78). I bridge technical systems analysis, data audit precision, and creative intuition to build high-converting growth ecosystems.'
            }}
          </p>

          <p>
            {{ locale === 'id'
              ? 'Dalam 2 tahun terakhir (2025–2026), saya telah memimpin dan mengoptimasi 27 kampanye Meta Ads untuk sektor sertifikasi institusional ISO. Dari pengujian audiens ABO berbiaya hemat (CPR Rp 3.612) hingga menangani pipeline konsultasi WhatsApp yang berhasil menutup 5 transaksi bernilai Rp 62.2 Juta+ (ROAS 27.2x).'
              : 'Over the past 2 years (2025–2026), I have managed and optimized 27 Meta Ads campaigns for institutional ISO certification sectors. From testing high-efficiency audiences (CPR Rp 3,612) to managing consultation WhatsApp pipelines that closed 5 verified contracts worth Rp 62.2M+ (ROAS 27.2x).'
            }}
          </p>

          <div class="border-l-2 border-zinc-900 pl-4 py-1 text-zinc-900 font-serif italic text-sm sm:text-base">
            {{ locale === 'id'
              ? '“Bagi saya, data tanpa closing hanyalah angka, dan iklan tanpa profitabilitas hanyalah pemborosan. Setiap strategi harus terukur dan menghasilkan omzet nyata.”'
              : '“Data without closing is just numbers, and advertising without profitability is waste. Every campaign must be measurable and generate real business revenue.”'
            }}
          </div>

          <!-- Credential Badges -->
          <div class="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-[11px] text-zinc-800">
            <div class="flex items-center gap-2 rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-2.5">
              <GraduationCap class="h-4 w-4 text-zinc-900 shrink-0" />
              <span>S1 Sistem Informasi (IPK 3.78)</span>
            </div>
            <div class="flex items-center gap-2 rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-2.5">
              <Award class="h-4 w-4 text-zinc-900 shrink-0" />
              <span>Closing Rp 62.2M+ (ROAS 27.2x)</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>
