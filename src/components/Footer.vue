<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <footer class="border-t border-zinc-100 bg-white py-10 px-6 sm:px-10">
    <div class="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
      <p class="font-mono text-[11px] uppercase tracking-editorial text-zinc-500">
        {{ t('footer.copyright') }}
      </p>
      
      <div class="flex items-center gap-2">
        <span class="inline-flex items-center gap-1.5 rounded-full border border-zinc-200/80 bg-zinc-50 px-3.5 py-1 font-mono text-[11px] text-zinc-700 shadow-xs">
          <span>{{ t('footer.tagline') }}</span>
        </span>
      </div>
    </div>
  </footer>
</template>
