<template>
  <span
    :class="[
      'inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold',
      variantClasses
    ]"
  >
    <slot />
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary'
  }
})

const variantClasses = computed(() => {
  if (props.variant === 'neutral') {
    return 'bg-sand-100 text-sand-700'
  }

  return 'bg-brand-100 text-brand-700'
})
</script>
