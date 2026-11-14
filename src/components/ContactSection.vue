<script setup>
import { useI18n } from 'vue-i18n'
import { ArrowUpRight } from 'lucide-vue-next'

const { t, locale } = useI18n()
</script>

<template>
  <section id="contact" class="py-20 sm:py-24 px-6 sm:px-10 border-t border-zinc-100 bg-white">
    <div class="mx-auto max-w-5xl">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center" data-aos="fade-up">
        
        <!-- Left Column: Editorial Prompt & Direct Email -->
        <div class="md:col-span-8 space-y-6">
          <h2 class="font-serif text-2xl sm:text-3xl lg:text-[34px] text-zinc-900 leading-snug">
            {{ locale === 'id' ? 'Punya proyek yang ingin didiskusikan atau sekadar menyapa?' : 'Have a project in mind or just want to say hi?' }}
          </h2>

          <div>
            <a
              href="mailto:vonnasyalwareynalda@gmail.com?subject=Opportunity%20Inquiry%20-%20Digital%20Marketing"
              class="font-serif text-xl sm:text-2xl text-zinc-900 underline underline-offset-8 decoration-zinc-300 hover:decoration-black transition-colors"
            >
              vonnasyalwareynalda@gmail.com
            </a>
          </div>

          <!-- Underlined Social Links matching reference screenshot -->
          <div class="pt-4 flex flex-wrap items-center gap-6 sm:gap-8 text-[11px] font-semibold uppercase tracking-editorial text-zinc-700">
            <a
              href="https://wa.me/62895365490053?text=Halo%20Reynalda%20(SyaSya),%20saya%20tertarik%20mendiskusikan%20peluang%20kerjasama%20digital%20marketing."
              target="_blank"
              class="underline underline-offset-4 decoration-zinc-300 hover:decoration-black hover:text-black transition-colors"
            >
              WHATSAPP
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              class="underline underline-offset-4 decoration-zinc-300 hover:decoration-black hover:text-black transition-colors"
            >
              LINKEDIN
            </a>
            <a
              href="REYNALDA_VONNA_SYALWA_CV.pdf"
              download="REYNALDA_VONNA_SYALWA_CV.pdf"
              class="underline underline-offset-4 decoration-zinc-300 hover:decoration-black hover:text-black transition-colors"
            >
              DOWNLOAD CV (PDF)
            </a>
          </div>
        </div>

        <!-- Right Column: Hand-drawn Line-Art Mailbox SVG Illustration -->
        <div class="md:col-span-4 flex justify-start md:justify-end" data-aos="fade-up" data-aos-delay="100">
          <div class="relative w-44 sm:w-48 text-zinc-800">
            <svg
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="w-full h-auto"
            >
              <!-- Flying Letter / Envelope -->
              <g transform="translate(10, 50) rotate(-18)">
                <rect x="0" y="0" width="46" height="30" rx="3" stroke="currentColor" stroke-width="2" fill="#ffffff"/>
                <path d="M0 0 L23 18 L46 0" stroke="currentColor" stroke-width="1.8" fill="none"/>
                <!-- Stamp -->
                <rect x="32" y="4" width="9" height="10" stroke="currentColor" stroke-width="1.2" fill="none"/>
                <!-- Speed / Motion lines -->
                <line x1="-12" y1="12" x2="-2" y2="12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="-18" y1="20" x2="-4" y2="20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </g>

              <!-- Mailbox Body (American style curved on top) -->
              <path
                d="M100 85 C80 85 70 95 70 120 L70 135 H155 V120 C155 95 145 85 125 85 Z"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="#ffffff"
              />
              <!-- Mailbox Door / Opening Arch -->
              <path
                d="M70 120 C70 95 80 85 100 85 C120 85 130 95 130 120 L130 135 H70 Z"
                stroke="currentColor"
                stroke-width="2"
                fill="#fafafa"
              />
              <path d="M96 110 H104" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>

              <!-- Mailbox Flag (upright) -->
              <path d="M145 115 V80 L160 88 L145 96" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="currentColor"/>

              <!-- Wooden Post / Stand -->
              <rect x="105" y="135" width="14" height="60" stroke="currentColor" stroke-width="2.2" fill="#ffffff"/>
              <!-- Ground Line -->
              <path d="M85 195 H145" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M75 198 H115" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
