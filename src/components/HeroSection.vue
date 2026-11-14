<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  ArrowRight,
  Download,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  Sparkles,
  Layers,
  Award
} from 'lucide-vue-next'

const { t, locale } = useI18n()
const leadEmail = ref('')
const leadSubmitted = ref(false)

function handleLeadSubmit(e) {
  e.preventDefault()
  if (!leadEmail.value) return
  leadSubmitted.value = true
  setTimeout(() => {
    leadSubmitted.value = false
    leadEmail.value = ''
  }, 4000)
}
</script>

<template>
  <section class="relative bg-zendesk-white pt-12 pb-20 md:pt-20 md:pb-28">
    <div class="mx-auto max-w-7xl px-6 sm:px-8">
      
      <!-- Top Tag / Badge (Zendesk Style: 4px radius, subtle organic tint) -->
      <div class="flex justify-center">
        <div class="inline-flex items-center gap-2 rounded-tags border border-zendesk-divider bg-black/[0.04] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-zendesk text-zendesk-ink">
          <span class="h-2 w-2 rounded-full bg-zendesk-forest"></span>
          <span>{{ t('hero.badge') }}</span>
        </div>
      </div>

      <!-- Main Headline: Zendesk signature Whisper-Weight (Weight 300) display at large scale -->
      <div class="mt-8 text-center">
        <h1 class="mx-auto max-w-5xl text-4xl font-light tracking-zendesk text-zendesk-ink sm:text-6xl sm:leading-[1.04] lg:text-[72px]">
          {{ t('hero.title_prefix') }}
          <span class="font-normal underline decoration-zendesk-lime decoration-4 underline-offset-8">
            {{ t('hero.title_highlight') }}
          </span>
          {{ t('hero.title_suffix') }}
        </h1>
        <p class="mx-auto mt-6 max-w-3xl text-base font-normal leading-relaxed text-zendesk-ink/80 sm:text-lg tracking-zendesk">
          {{ t('hero.desc') }}
        </p>
      </div>

      <!-- Lead Capture Row + CTAs (Zendesk standard: 12px input + 16px Lime button) -->
      <div class="mt-10 mx-auto max-w-2xl">
        <form @submit="handleLeadSubmit" class="flex flex-col sm:flex-row items-center gap-3">
          <div class="relative w-full">
            <input
              v-model="leadEmail"
              type="email"
              required
              :placeholder="locale === 'id' ? 'Masukkan email perusahaan Anda...' : 'Enter your work email for proposal...'"
              class="w-full rounded-inputs border border-zendesk-ink bg-black/[0.05] px-4 py-3.5 text-sm font-normal text-zendesk-ink placeholder:text-zendesk-ink/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zendesk-forest transition-all"
            />
          </div>
          <button
            type="submit"
            class="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-buttons bg-zendesk-lime px-6 py-3.5 text-sm font-semibold text-zendesk-ink transition-opacity hover:opacity-90 cursor-pointer"
          >
            <span>{{ locale === 'id' ? 'Konsultasi Gratis' : 'Start Discussion' }}</span>
            <ArrowRight class="h-4 w-4" />
          </button>
        </form>

        <p v-if="leadSubmitted" class="mt-2 text-center text-xs font-medium text-zendesk-forest">
          ✓ {{ locale === 'id' ? 'Terima kasih! Email Anda telah dicatat. Kami akan segera menghubungi Anda.' : 'Thank you! Your email is recorded. We will contact you shortly.' }}
        </p>

        <!-- Secondary Ghost CTAs -->
        <div class="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold tracking-zendesk">
          <a
            href="#chart"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 text-zendesk-ink border-b border-black/15 hover:border-black transition-colors"
          >
            <BarChart3 class="h-3.5 w-3.5 text-zendesk-forest" />
            <span>{{ t('hero.cta_chart') }}</span>
          </a>
          <span class="text-zinc-300">•</span>
          <a
            href="#deals"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 text-zendesk-ink border-b border-black/15 hover:border-black transition-colors"
          >
            <CheckCircle2 class="h-3.5 w-3.5 text-zendesk-forest" />
            <span>{{ t('hero.cta_deals') }}</span>
          </a>
          <span class="text-zinc-300">•</span>
          <a
            href="REYNALDA_VONNA_SYALWA_CV.pdf"
            download="REYNALDA_VONNA_SYALWA_CV.pdf"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 text-zendesk-ink border-b border-black/15 hover:border-black transition-colors"
          >
            <Download class="h-3.5 w-3.5 text-zendesk-forest" />
            <span>{{ t('hero.cta_cv') }}</span>
          </a>
        </div>
      </div>

      <!-- Hero Visual: Product UI Screenshot Embed with 16px radius, zero shadow -->
      <div class="mt-14 relative mx-auto max-w-5xl">
        <div class="rounded-2xl border border-zendesk-divider bg-zendesk-white overflow-hidden">
          <!-- Top Window Bar -->
          <div class="flex items-center justify-between border-b border-zendesk-divider bg-zendesk-warm px-5 py-3">
            <div class="flex items-center gap-2">
              <span class="h-2.5 w-2.5 rounded-full bg-[#e0564c]"></span>
              <span class="h-2.5 w-2.5 rounded-full bg-[#e8a838]"></span>
              <span class="h-2.5 w-2.5 rounded-full bg-[#5cb85c]"></span>
              <span class="ml-2 font-mono text-xs text-zendesk-stone">meta-ads-manager // reynalda-portfolio-dashboard</span>
            </div>
            <div class="flex items-center gap-2 text-xs font-semibold text-zendesk-forest">
              <span class="inline-block h-2 w-2 rounded-full bg-zendesk-lime animate-pulse"></span>
              <span>LIVE CAMPAIGN DATA</span>
            </div>
          </div>

          <!-- Product UI Body Content -->
          <div class="p-6 sm:p-8 bg-zendesk-white">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <!-- KPI Left -->
              <div class="border-b md:border-b-0 md:border-r border-zendesk-divider pb-4 md:pb-0 md:pr-6">
                <span class="text-xs font-semibold uppercase tracking-zendesk text-zendesk-stone">Attributed Sales Revenue</span>
                <div class="mt-1 font-mono text-3xl sm:text-4xl font-bold text-zendesk-ink">
                  Rp 62.2M+
                </div>
                <div class="mt-2 inline-flex items-center gap-1.5 rounded-tags bg-zendesk-warm px-2 py-1 text-xs font-medium text-zendesk-forest">
                  <TrendingUp class="h-3.5 w-3.5 text-zendesk-forest" />
                  <span>Verified ISO Certification Closing</span>
                </div>
              </div>

              <!-- KPI Center -->
              <div class="border-b md:border-b-0 md:border-r border-zendesk-divider pb-4 md:pb-0 md:pr-6">
                <span class="text-xs font-semibold uppercase tracking-zendesk text-zendesk-stone">Blended Closing ROAS</span>
                <div class="mt-1 font-mono text-3xl sm:text-4xl font-bold text-zendesk-forest">
                  27.2x
                </div>
                <div class="mt-2 text-xs text-zendesk-ink/70">
                  Total Ad Spend: Rp 2.28M → Output: Rp 62.29M
                </div>
              </div>

              <!-- KPI Right -->
              <div>
                <span class="text-xs font-semibold uppercase tracking-zendesk text-zendesk-stone">Best Cost Per Result (CPR)</span>
                <div class="mt-1 font-mono text-3xl sm:text-4xl font-bold text-zendesk-ink">
                  Rp 3.612
                </div>
                <div class="mt-2 text-xs text-zendesk-ink/70">
                  Kampanye Ads NSM Mei 2026 MBG (Messaging Started)
                </div>
              </div>
            </div>

            <!-- Campaign Mini Table Snapshot -->
            <div class="mt-6 border-t border-zendesk-divider pt-6">
              <div class="overflow-x-auto">
                <table class="w-full text-left font-sans text-xs">
                  <thead>
                    <tr class="border-b border-zendesk-divider text-zendesk-stone font-semibold tracking-zendesk uppercase">
                      <th class="py-2 pr-4">Kampanye Meta Ads</th>
                      <th class="py-2 px-4">Objektif</th>
                      <th class="py-2 px-4">Biaya (Ad Spend)</th>
                      <th class="py-2 px-4">Hasil Closing</th>
                      <th class="py-2 pl-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-zendesk-divider text-zendesk-ink">
                    <tr>
                      <td class="py-2.5 pr-4 font-medium">Ads NSM Desember 2025</td>
                      <td class="py-2.5 px-4 text-zendesk-stone">Pesan WhatsApp</td>
                      <td class="py-2.5 px-4 font-mono">Rp 328.468</td>
                      <td class="py-2.5 px-4 font-mono font-semibold text-zendesk-forest">Rp 31.430.000 (ROAS 95.7x)</td>
                      <td class="py-2.5 pl-4 text-right">
                        <span class="rounded-tags bg-zendesk-forest px-2 py-0.5 text-[10px] font-bold text-zendesk-lime">DEAL</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="py-2.5 pr-4 font-medium">Ads November - mbg 2025</td>
                      <td class="py-2.5 px-4 text-zendesk-stone">Pesan WhatsApp (75 Msg)</td>
                      <td class="py-2.5 px-4 font-mono">Rp 407.602</td>
                      <td class="py-2.5 px-4 font-mono font-semibold text-zendesk-forest">Rp 25.308.000 (3 Klien)</td>
                      <td class="py-2.5 pl-4 text-right">
                        <span class="rounded-tags bg-zendesk-forest px-2 py-0.5 text-[10px] font-bold text-zendesk-lime">DEAL</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Monochrome Logo Trust Strip (Zendesk Style: Monochrome #11110d, 60% opacity) -->
      <div class="mt-16 text-center">
        <span class="text-xs font-semibold uppercase tracking-zendesk text-zendesk-stone">
          {{ t('hero.trust') }}
        </span>
        <div class="mt-6 flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-70">
          <div class="flex items-center gap-2 font-mono text-sm font-semibold tracking-zendesk text-zendesk-ink">
            <ShieldCheck class="h-4 w-4 text-zendesk-forest" />
            <span>META ADS CERTIFIED</span>
          </div>
          <div class="flex items-center gap-2 font-mono text-sm font-semibold tracking-zendesk text-zendesk-ink">
            <Award class="h-4 w-4 text-zendesk-forest" />
            <span>ISO 9001/14001 EXPERTISE</span>
          </div>
          <div class="flex items-center gap-2 font-mono text-sm font-semibold tracking-zendesk text-zendesk-ink">
            <BarChart3 class="h-4 w-4 text-zendesk-forest" />
            <span>GOOGLE ANALYTICS GA4</span>
          </div>
          <div class="flex items-center gap-2 font-mono text-sm font-semibold tracking-zendesk text-zendesk-ink">
            <Layers class="h-4 w-4 text-zendesk-forest" />
            <span>LOOKER STUDIO BI</span>
          </div>
        </div>
      </div>

      <!-- 4 Key Impact Metric Cards: Zendesk Flat Cards (0px border-radius, #f5f5f2 surface, ZERO SHADOW) -->
      <div class="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <!-- Metric 1 -->
        <div class="rounded-cards border border-zendesk-divider bg-zendesk-warm p-6 transition-colors hover:border-zendesk-stone">
          <div class="flex items-center justify-between text-xs font-semibold uppercase tracking-zendesk text-zendesk-stone">
            <span>{{ t('stats.revenue_label') }}</span>
            <Sparkles class="h-4 w-4 text-zendesk-forest" />
          </div>
          <div class="mt-3 font-mono text-3xl font-bold text-zendesk-ink">
            {{ t('stats.revenue_val') }}
          </div>
          <p class="mt-1 text-xs text-zendesk-ink/70">
            {{ t('stats.revenue_sub') }}
          </p>
        </div>

        <!-- Metric 2 (Featured with Forest Canopy & Lime badge) -->
        <div class="rounded-cards border border-zendesk-forest bg-zendesk-warm p-6 transition-colors">
          <div class="flex items-center justify-between text-xs font-semibold uppercase tracking-zendesk text-zendesk-forest">
            <span>{{ t('stats.roas_label') }}</span>
            <span class="rounded-tags bg-zendesk-forest px-1.5 py-0.5 text-[10px] font-bold text-zendesk-lime">PROVEN</span>
          </div>
          <div class="mt-3 font-mono text-3xl font-bold text-zendesk-forest">
            {{ t('stats.roas_val') }}
          </div>
          <p class="mt-1 text-xs text-zendesk-ink/70">
            {{ t('stats.roas_sub') }}
          </p>
        </div>

        <!-- Metric 3 -->
        <div class="rounded-cards border border-zendesk-divider bg-zendesk-warm p-6 transition-colors hover:border-zendesk-stone">
          <div class="flex items-center justify-between text-xs font-semibold uppercase tracking-zendesk text-zendesk-stone">
            <span>{{ t('stats.campaigns_label') }}</span>
            <span class="font-mono text-[11px] text-zendesk-forest">2025–2026</span>
          </div>
          <div class="mt-3 font-mono text-3xl font-bold text-zendesk-ink">
            {{ t('stats.campaigns_val') }}
          </div>
          <p class="mt-1 text-xs text-zendesk-ink/70">
            {{ t('stats.campaigns_sub') }}
          </p>
        </div>

        <!-- Metric 4 -->
        <div class="rounded-cards border border-zendesk-divider bg-zendesk-warm p-6 transition-colors hover:border-zendesk-stone">
          <div class="flex items-center justify-between text-xs font-semibold uppercase tracking-zendesk text-zendesk-stone">
            <span>{{ t('stats.cpr_label') }}</span>
            <span class="rounded-tags bg-zendesk-warm border border-zendesk-stone px-1.5 py-0.5 text-[10px] font-bold text-zendesk-forest">BEST CPR</span>
          </div>
          <div class="mt-3 font-mono text-3xl font-bold text-zendesk-forest">
            {{ t('stats.cpr_val') }}
          </div>
          <p class="mt-1 text-xs text-zendesk-ink/70">
            {{ t('stats.cpr_sub') }}
          </p>
        </div>
      </div>

    </div>
  </section>
</template>
