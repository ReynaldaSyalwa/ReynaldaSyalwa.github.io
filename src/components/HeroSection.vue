<script setup>
import { useI18n } from 'vue-i18n'
import { ShieldCheck, Award, BarChart3, Layers, CheckCircle2 } from 'lucide-vue-next'

const { t, locale } = useI18n()
</script>

<template>
  <section class="py-12 sm:py-20 px-6 sm:px-10 bg-white">
    <div class="mx-auto max-w-5xl">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <!-- Left Column: Editorial Statement & Brands -->
        <div class="lg:col-span-8 space-y-8" data-aos="fade-up">
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
        </div>

        <!-- Right Column: Hand-drawn Line-Art SVG Illustration -->
        <div class="lg:col-span-4 flex justify-center lg:justify-end" data-aos="fade-up" data-aos-delay="150">
          <div class="relative w-64 sm:w-72">
            <!-- Charming line-art sketch of a marketer working at desk with laptop & ideas -->
            <svg
              viewBox="0 0 280 240"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="w-full h-auto text-zinc-800"
            >
              <!-- Music / Idea notes -->
              <path d="M70 45 Q75 35 85 40 Q95 45 88 55" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <circle cx="73" cy="46" r="3" fill="currentColor"/>
              <path d="M85 30 L90 20 L102 24 L97 34" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>

              <!-- Thought Bubble (Ideas & Growth Chart) -->
              <path
                d="M190 40 C175 40 165 52 175 65 C165 75 175 90 190 85 C200 95 220 95 230 85 C245 85 250 70 240 60 C248 45 235 35 218 38 C210 32 198 33 190 40 Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="#ffffff"
              />
              <!-- Growth Chart Arrow inside thought bubble -->
              <path d="M185 70 L198 58 L208 64 L222 50" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M216 50 H222 V56" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <!-- Small circles leading to thought bubble -->
              <circle cx="165" cy="85" r="3" stroke="currentColor" stroke-width="1.8" fill="none"/>
              <circle cx="156" cy="95" r="2" stroke="currentColor" stroke-width="1.8" fill="none"/>

              <!-- Desk -->
              <path d="M30 180 H250" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M50 180 L46 230" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
              <path d="M220 180 L224 230" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>

              <!-- Laptop -->
              <path d="M75 180 L88 140 H138 L148 180 Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M88 140 H138 V175 H88 Z" stroke="currentColor" stroke-width="1.8" fill="#fafafa"/>
              <!-- Screen lines -->
              <line x1="96" y1="150" x2="130" y2="150" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              <line x1="96" y1="158" x2="122" y2="158" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              <line x1="96" y1="166" x2="126" y2="166" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>

              <!-- Coffee Cup on Desk -->
              <path d="M60 180 V165 H48 V180 Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
              <path d="M48 168 C44 168 44 176 48 176" stroke="currentColor" stroke-width="1.5"/>
              <path d="M52 160 Q54 154 52 150" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>

              <!-- Chair back and legs -->
              <path d="M195 140 C195 110 205 95 210 135 L215 190" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
              <path d="M185 190 H225" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
              <path d="M190 190 L182 230" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M220 190 L226 230" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>

              <!-- Person working at laptop -->
              <!-- Torso / Shirt -->
              <path
                d="M148 145 C150 130 162 120 178 122 C188 123 192 135 190 155 L186 185 C170 186 158 184 150 180 Z"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="#ffffff"
              />
              <!-- Collar & details -->
              <path d="M162 122 L164 135 L172 123" stroke="currentColor" stroke-width="1.5"/>
              <!-- Arm leaning forward toward keyboard -->
              <path d="M172 135 Q155 150 130 168 L115 174" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
              <!-- Second arm -->
              <path d="M165 140 Q145 160 120 172" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>

              <!-- Head & Hair -->
              <circle cx="166" cy="105" r="14" stroke="currentColor" stroke-width="2" fill="#ffffff"/>
              <!-- Stylized wavy hair (buns/curls like illustration) -->
              <path
                d="M152 104 C150 90 160 84 172 88 C180 84 186 92 182 104 C180 108 174 112 166 112 C158 112 154 108 152 104 Z"
                fill="currentColor"
              />
              <!-- Nose & Eye -->
              <path d="M158 106 Q156 109 154 109" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              <circle cx="160" cy="103" r="1.5" fill="currentColor"/>

              <!-- Legs seated -->
              <path d="M180 185 L182 205 L165 210 L160 230" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
