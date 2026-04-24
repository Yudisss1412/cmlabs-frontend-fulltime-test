<template>
  <div :class="gridClass">
    <div
      v-for="item in count"
      :key="item"
      class="overflow-hidden rounded-3xl border border-sand-200 bg-white shadow-sm"
    >
      <div v-if="variant === 'meal'" class="aspect-[4/3] animate-pulse bg-sand-100"></div>
      <div class="p-5">
        <div
          v-if="variant === 'ingredient'"
          class="mx-auto mb-4 h-24 w-24 animate-pulse rounded-full bg-cream-200"
        ></div>
        <div class="h-4 animate-pulse rounded-full bg-sand-100"></div>
        <div class="mt-3 h-4 w-2/3 animate-pulse rounded-full bg-sand-100"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  count: {
    type: Number,
    default: 8
  },
  variant: {
    type: String,
    default: 'ingredient'
  }
})

const gridClass = computed(() => {
  if (props.variant === 'meal') {
    return 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }

  return 'grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-7'
})
</script>
