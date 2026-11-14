<script setup>
import { useI18n } from 'vue-i18n'
import { MessageSquare, Mail, Download, ArrowUpRight } from 'lucide-vue-next'

const { t } = useI18n()
</script>

<template>
  <section id="contact" class="relative py-24 border-t border-zendesk-divider bg-zendesk-white">
    <div class="mx-auto max-w-7xl px-6 sm:px-8">
      <!-- Zendesk Relate Event Promo Card: Forest Canopy #203524, 40px radius, ZERO SHADOW -->
      <div class="relative overflow-hidden rounded-event bg-zendesk-forest px-8 py-14 sm:px-14 sm:py-16 text-center text-white">
        <!-- Badge -->
        <span class="inline-block rounded-tags bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-zendesk text-zendesk-lime border border-white/15">
          {{ t('contact.tag') }}
        </span>

        <!-- Headline -->
        <h2 class="mx-auto mt-6 max-w-3xl text-3xl font-semibold tracking-zendesk text-white sm:text-5xl leading-tight">
          {{ t('contact.title') }}
        </h2>

        <!-- Description -->
        <p class="mx-auto mt-4 max-w-2xl text-base font-normal leading-relaxed text-white/90 tracking-zendesk">
          {{ t('contact.desc') }}
        </p>

        <!-- Two Stacked / Paired CTAs: 16px radius, Lime Primary + White Ghost -->
        <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
          <!-- Primary CTA (Electric Lime #d1f470) -->
          <a
            href="https://wa.me/62895365490053?text=Halo%20Reynalda%20(SyaSya),%20saya%20tertarik%20mendiskusikan%20peluang%20kerjasama%20digital%20marketing."
            target="_blank"
            class="inline-flex items-center gap-2 rounded-buttons bg-zendesk-lime px-7 py-3.5 text-sm font-semibold tracking-zendesk text-zendesk-ink transition-opacity hover:opacity-90"
          >
            <MessageSquare class="h-4 w-4" />
            <span>{{ t('contact.btn_wa') }}</span>
            <ArrowUpRight class="h-4 w-4" />
          </a>

          <!-- Ghost Secondary CTA (Transparent + 1px white border) -->
          <a
            href="mailto:vonnasyalwareynalda@gmail.com?subject=Opportunity%20Inquiry%20-%20Digital%20Marketing"
            class="inline-flex items-center gap-2 rounded-buttons border border-white bg-transparent px-7 py-3.5 text-sm font-semibold tracking-zendesk text-white transition-colors hover:bg-white/10"
          >
            <Mail class="h-4 w-4" />
            <span>{{ t('contact.btn_email') }}</span>
          </a>

          <!-- Ghost Download CV -->
          <a
            href="REYNALDA_VONNA_SYALWA_CV.pdf"
            download="REYNALDA_VONNA_SYALWA_CV.pdf"
            class="inline-flex items-center gap-2 rounded-buttons border border-white/40 bg-transparent px-6 py-3.5 text-sm font-semibold tracking-zendesk text-white/90 transition-colors hover:border-white hover:text-white"
          >
            <Download class="h-4 w-4" />
            <span>{{ t('contact.btn_cv') }}</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
