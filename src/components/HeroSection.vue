<script setup>
import { useI18n } from 'vue-i18n'
import AnimatedCounter from './ui/AnimatedCounter.vue'
import sketchAvatar from '@/assets/sketch-avatar.png'

const { t, locale } = useI18n()
</script>

<template>
  <section class="py-12 sm:py-20 px-6 sm:px-10 bg-white">
    <div class="mx-auto max-w-5xl">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <!-- Left Column: Editorial Statement & Brands -->
        <div class="lg:col-span-7 space-y-8" data-aos="fade-up">
          <h1 class="font-serif text-3xl sm:text-4xl lg:text-[40px] text-zinc-900 leading-[1.28] font-normal tracking-tight">
            {{ locale === 'id'
              ? "Berbasis di Surabaya, Indonesia, saya seorang Digital Marketing & Growth Specialist yang mengombinasikan Meta Ads, Strategi Kreatif, dan Sistem Informasi; berfokus pada pertumbuhan omzet dan closing transaksi bernilai tinggi."
              : "Based in Surabaya, Indonesia, I'm a Digital Marketing & Growth Specialist working with Meta Ads, Creative Strategy, and Information Systems; centered on scaling revenue and closing high-value deals."
            }}
          </h1>

          <!-- Clients / Brands Trust Strip -->
          <div class="pt-4 border-t border-zinc-100">
            <span class="text-[10px] sm:text-[11px] font-semibold uppercase tracking-editorial text-zinc-400">
              {{ locale === 'id' ? "KLIEN & EKOSISTEM YANG PERNAH SAYA TANGANI" : "CLIENTS & ECOSYSTEM I'VE WORKED WITH" }}
            </span>
            <div class="mt-4 flex flex-wrap items-center gap-6 sm:gap-8 opacity-75">
              <span class="font-mono text-xs sm:text-sm font-semibold tracking-wide text-zinc-700">META ADS BLUEPRINT</span>
              <span class="font-mono text-xs sm:text-sm font-semibold tracking-wide text-zinc-700">PT NETMARKS INDONESIA</span>
              <span class="font-mono text-xs sm:text-sm font-semibold tracking-wide text-zinc-700">SERTIFIKASI ISO 9001</span>
              <span class="font-mono text-xs sm:text-sm font-semibold tracking-wide text-zinc-700">GOOGLE ANALYTICS GA4</span>
              <span class="font-mono text-xs sm:text-sm font-semibold tracking-wide text-zinc-700">LOOKER STUDIO</span>
            </div>
          </div>

          <!-- Key Metrics Strip with Scrolling Odometer Numbers -->
          <div class="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-zinc-100">
            <div>
              <span class="text-[10px] font-semibold uppercase tracking-editorial text-zinc-400">
                {{ locale === 'id' ? 'Omzet Closing' : 'Closed Revenue' }}
              </span>
              <div class="mt-0.5 text-lg sm:text-xl font-bold text-zinc-900">
                <AnimatedCounter prefix="Rp " value="62.2" suffix="M+" :duration="1400" />
              </div>
            </div>
            <div>
              <span class="text-[10px] font-semibold uppercase tracking-editorial text-zinc-400">
                {{ locale === 'id' ? 'Blended ROAS' : 'Blended ROAS' }}
              </span>
              <div class="mt-0.5 text-lg sm:text-xl font-bold text-zinc-900">
                <AnimatedCounter value="27.2" suffix="x" :duration="1500" />
              </div>
            </div>
            <div>
              <span class="text-[10px] font-semibold uppercase tracking-editorial text-zinc-400">
                {{ locale === 'id' ? 'Total Kampanye' : 'Total Campaigns' }}
              </span>
              <div class="mt-0.5 text-lg sm:text-xl font-bold text-zinc-900">
                <AnimatedCounter value="27" suffix=" Ads" :duration="1200" />
              </div>
            </div>
            <div>
              <span class="text-[10px] font-semibold uppercase tracking-editorial text-zinc-400">
                {{ locale === 'id' ? 'CPR Terendah' : 'Lowest CPR' }}
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
