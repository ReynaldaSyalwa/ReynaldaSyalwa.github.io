<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  value: {
    type: [Number, String],
    required: true
  },
  prefix: {
    type: String,
    default: ''
  },
  suffix: {
    type: String,
    default: ''
  },
  duration: {
    type: Number,
    default: 1300
  },
  delay: {
    type: Number,
    default: 150
  },
  once: {
    type: Boolean,
    default: true
  }
})

const rootRef = ref(null)
const isInView = ref(false)
let observer = null

const formattedChars = computed(() => {
  return String(props.value).split('')
})

function isDigit(char) {
  return /^[0-9]$/.test(char)
}

onMounted(() => {
  if (!rootRef.value) return

  if (typeof IntersectionObserver !== 'undefined') {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isInView.value = true
            if (props.once && observer) {
              observer.unobserve(entry.target)
            }
          } else if (!props.once) {
            isInView.value = false
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -40px 0px'
      }
    )
    observer.observe(rootRef.value)
  } else {
    // Fallback if IntersectionObserver not available
    isInView.value = true
  }
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <span ref="rootRef" class="inline-flex items-baseline font-mono tracking-tight select-none">
    <!-- Prefix (e.g. 'Rp ', '+') -->
    <span v-if="prefix" class="mr-0.5 text-[0.85em] font-medium opacity-85">
      {{ prefix }}
    </span>

    <!-- Rolling Digit Columns -->
    <span class="inline-flex items-baseline overflow-hidden h-[1.18em] leading-none">
      <template v-for="(char, idx) in formattedChars" :key="idx">
        <!-- Number column -->
        <span
          v-if="isDigit(char)"
          class="relative inline-block w-[0.62em] overflow-hidden text-center"
          style="height: 1.18em;"
        >
          <span
            class="flex flex-col transition-transform will-change-transform"
            :style="{
              transform: `translateY(-${(isInView ? (10 + parseInt(char, 10)) : 0) * 5}%)`,
              transitionDuration: `${duration + idx * 70}ms`,
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: `${delay + idx * 45}ms`
            }"
          >
            <!-- 20 items: cycle 1 (0..9) + cycle 2 (0..9) = each item is 5% height (100% / 20) -->
            <span v-for="n in 10" :key="'a-' + n" class="h-[1.18em] flex items-center justify-center">
              {{ n - 1 }}
            </span>
            <span v-for="n in 10" :key="'b-' + n" class="h-[1.18em] flex items-center justify-center">
              {{ n - 1 }}
            </span>
          </span>
        </span>

        <!-- Non-digit characters: '.', ',', '%', etc. -->
        <span v-else class="inline-block px-[0.05em] leading-none">
          {{ char }}
        </span>
      </template>
    </span>

    <!-- Suffix (e.g. 'M+', 'x', '+') -->
    <span v-if="suffix" class="ml-0.5 text-[0.85em] font-medium opacity-85">
      {{ suffix }}
    </span>
  </span>
</template>
