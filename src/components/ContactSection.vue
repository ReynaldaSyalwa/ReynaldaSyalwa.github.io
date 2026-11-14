<script setup>
import { useI18n } from 'vue-i18n'
import { MessageSquare, Mail, Download, ArrowUpRight } from 'lucide-vue-next'

const { t } = useI18n()
</script>

<template>
  <section id="contact" class="relative py-24 border-t border-obsidian-600/70 bg-obsidian-950">
    <div class="mx-auto max-w-7xl px-6 sm:px-8">
      <div class="relative overflow-hidden rounded-3xl border border-obsidian-600/80 bg-gradient-to-b from-obsidian-800/90 to-obsidian-900/90 p-8 sm:p-14 text-center shadow-trifecta">
        <!-- Ambient Radial Glow -->
        <div class="pointer-events-none absolute -top-24 left-1/2 -z-10 h-64 w-96 -translate-x-1/2 rounded-full bg-growth-500/20 blur-3xl"></div>

        <span class="inline-block rounded-full border border-growth-500/40 bg-growth-500/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-growth-400">
          {{ t('contact.tag') }}
        </span>

        <h2 class="mx-auto mt-6 max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          {{ t('contact.title') }}
        </h2>

        <p class="mx-auto mt-4 max-w-xl text-base text-zinc-300">
          {{ t('contact.desc') }}
        </p>

        <!-- CTAs -->
        <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
          <!-- WhatsApp CTA -->
          <a
            href="https://wa.me/62895365490053?text=Halo%20Reynalda%20(SyaSya),%20saya%20tertarik%20mendiskusikan%20peluang%20kerjasama%20digital%20marketing."
            target="_blank"
            class="flex items-center gap-2 rounded-full bg-growth-500 px-7 py-3.5 text-sm font-bold text-obsidian-950 transition-all hover:bg-growth-400 hover:shadow-lg hover:shadow-growth-500/25"
          >
            <MessageSquare class="h-4 w-4" />
            <span>{{ t('contact.btn_wa') }}</span>
            <ArrowUpRight class="h-4 w-4" />
          </a>

          <!-- Email CTA -->
          <a
            href="mailto:vonnasyalwareynalda@gmail.com?subject=Opportunity%20Inquiry%20-%20Digital%20Marketing"
            class="flex items-center gap-2 rounded-full border border-obsidian-600 bg-obsidian-800 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:border-zinc-400 hover:bg-obsidian-700"
          >
            <Mail class="h-4 w-4" />
            <span>{{ t('contact.btn_email') }}</span>
          </a>

          <!-- CV CTA -->
          <a
            href="REYNALDA_VONNA_SYALWA_CV.pdf"
            download="REYNALDA_VONNA_SYALWA_CV.pdf"
            class="flex items-center gap-2 rounded-full border border-obsidian-600 bg-transparent px-6 py-3.5 text-sm font-semibold text-zinc-300 transition-all hover:border-zinc-400 hover:text-white"
          >
            <Download class="h-4 w-4" />
            <span>{{ t('contact.btn_cv') }}</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
