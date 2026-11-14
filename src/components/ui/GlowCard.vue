<script setup>
defineProps({
  className: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div :class="['relative rounded-2xl border border-obsidian-600/70 bg-obsidian-800/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-growth-500/40 hover:shadow-glow-emerald', className]">
    <slot />
  </div>
</template>
