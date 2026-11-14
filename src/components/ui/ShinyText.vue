<script setup>
defineProps({
  text: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <span :class="['animate-shimmer font-semibold inline-block', className]">
    {{ text }}
  </span>
</template>
