<script setup>
import { useI18n } from 'vue-i18n'
import { Mail, MessageCircle, Linkedin, FileDown, ArrowUp } from 'lucide-vue-next'

const { t } = useI18n()

const WA = 'https://wa.me/62895365490053?text=Halo%20Reynalda%20(SyaSya)%2C%20saya%20tertarik%20mendiskusikan%20peluang%20kerja%20sama.'
const MAIL = 'mailto:vonnasyalwareynalda@gmail.com?subject=Kolaborasi%20Digital%20Marketing'
const LI = 'https://www.linkedin.com/in/reynalda-vonna-syalwa-77359b279/'
const CV = '/REYNALDA_VONNA_SYALWA_CV.pdf'
</script>

<template>
  <section id="contact" class="bg-cream px-5 pb-16 pt-20 sm:px-8 sm:pb-24">
    <div class="mx-auto max-w-shell">
      <div class="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div data-aos="fade-right">
          <h2 class="font-display text-display-sm font-extrabold leading-none text-ink">
            {{ t('contact.title_part1') }}<br />
            <span class="text-amber">{{ t('contact.title_part2') }}</span>
          </h2>
          <p class="mt-4 max-w-md text-[14.5px] leading-relaxed text-ink/60">{{ t('contact.lead') }}</p>

          <div class="mt-7 flex flex-wrap gap-2.5">
            <a
              :href="WA"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-pill bg-amber px-5 py-2.5 text-[12.5px] font-bold text-white shadow-soft transition-opacity hover:opacity-90"
            >
              <MessageCircle class="h-3.5 w-3.5" />
              {{ t('contact.cta_wa') }}
            </a>
            <a
              :href="MAIL"
              class="inline-flex items-center gap-2 rounded-pill border border-ink/20 px-5 py-2.5 text-[12.5px] font-bold text-ink transition-colors hover:bg-ink hover:text-white"
            >
              <Mail class="h-3.5 w-3.5" />
              {{ t('contact.cta_email') }}
            </a>
          </div>
        </div>

        <!-- Daftar tautan -->
        <div class="space-y-2" data-aos="fade-left" data-aos-delay="100">
          <a
            :href="WA"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center justify-between rounded-card border border-ink/8 bg-white px-5 py-4 shadow-soft transition-shadow hover:shadow-lift"
          >
            <div class="flex items-center gap-3">
              <MessageCircle class="h-4 w-4 text-ink/40" />
              <div>
                <p class="text-[10px] font-bold uppercase tracking-wide2 text-ink/35">{{ t('contact.whatsapp') }}</p>
                <p class="mt-0.5 text-[13px] font-semibold text-ink">+62 895 3654 90053</p>
              </div>
            </div>
            <span class="text-ink/25 transition-transform group-hover:translate-x-0.5">→</span>
          </a>

          <a
            :href="MAIL"
            class="group flex items-center justify-between rounded-card border border-ink/8 bg-white px-5 py-4 shadow-soft transition-shadow hover:shadow-lift"
          >
            <div class="flex items-center gap-3">
              <Mail class="h-4 w-4 text-ink/40" />
              <div>
                <p class="text-[10px] font-bold uppercase tracking-wide2 text-ink/35">{{ t('contact.email') }}</p>
                <p class="mt-0.5 break-all text-[13px] font-semibold text-ink">vonnasyalwareynalda@gmail.com</p>
              </div>
            </div>
            <span class="text-ink/25 transition-transform group-hover:translate-x-0.5">→</span>
          </a>

          <a
            :href="LI"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center justify-between rounded-card border border-ink/8 bg-white px-5 py-4 shadow-soft transition-shadow hover:shadow-lift"
          >
            <div class="flex items-center gap-3">
              <Linkedin class="h-4 w-4 text-ink/40" />
              <div>
                <p class="text-[10px] font-bold uppercase tracking-wide2 text-ink/35">{{ t('contact.linkedin') }}</p>
                <p class="mt-0.5 text-[13px] font-semibold text-ink">reynalda-vonna-syalwa</p>
              </div>
            </div>
            <span class="text-ink/25 transition-transform group-hover:translate-x-0.5">→</span>
          </a>

          <a
            :href="CV"
            download
            class="group flex items-center justify-between rounded-card bg-ink px-5 py-4 shadow-lift"
          >
            <div class="flex items-center gap-3">
              <FileDown class="h-4 w-4 text-amber" />
              <div>
                <p class="text-[10px] font-bold uppercase tracking-wide2 text-white/35">{{ t('contact.cv') }}</p>
                <p class="mt-0.5 text-[13px] font-semibold text-white">PDF · 1 halaman</p>
              </div>
            </div>
            <span class="text-white/35 transition-transform group-hover:translate-x-0.5">→</span>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="border-t border-ink/10 bg-cream px-5 py-8 sm:px-8">
    <div class="mx-auto flex max-w-shell flex-wrap items-center justify-between gap-4">
      <div>
        <p class="font-display text-[12.5px] font-extrabold uppercase tracking-wide2 text-ink">R.V. Syalwa</p>
        <p class="mt-1 text-[11.5px] text-ink/45">
          {{ t('footer.rights') }} · {{ t('footer.tagline') }}
        </p>
      </div>
      <a
        href="#top"
        class="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide2 text-ink/45 transition-colors hover:text-ink"
      >
        {{ t('footer.back_top') }}
        <ArrowUp class="h-3 w-3" />
      </a>
    </div>
  </footer>
</template>
