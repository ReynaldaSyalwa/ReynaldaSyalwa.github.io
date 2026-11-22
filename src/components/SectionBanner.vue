<script setup>
/**
 * Banner section bernomor — meniru referensi: angka outline besar di kiri,
 * judul tiga-kata di kanan dengan kontras bold / thin / italic.
 * `no` = "00" … "03", `part1` bold, `part2` thin, `part3` italic bold.
 */
defineProps({
  no: { type: String, required: true },
  part1: { type: String, default: '' },
  part2: { type: String, default: '' },
  part3: { type: String, default: '' },
})
</script>

<template>
  <div class="bg-[#2B2B2B] px-6 py-6 sm:px-10 sm:py-7">
    <div class="mx-auto flex max-w-shell items-center gap-6 sm:gap-10">
      <!-- Angka outline -->
      <span
        class="select-none font-display text-[3.4rem] font-bold leading-none tracking-tightest sm:text-[4.6rem]"
        style="color: transparent; -webkit-text-stroke: 1.6px #ffffff;"
      >{{ no }}</span>

      <!-- Judul -->
      <h2 class="font-display text-xl leading-[0.95] text-white sm:text-4xl">
        <span class="font-extrabold">{{ part1 }}</span>
        <span v-if="part2" class="font-light">&nbsp;{{ part2 }}</span>
        <br v-if="part3" class="hidden sm:block" />
        <span v-if="part3" class="font-extrabold italic">&nbsp;{{ part3 }}</span>
      </h2>
    </div>
  </div>
</template>
