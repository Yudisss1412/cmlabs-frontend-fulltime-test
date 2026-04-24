<template>
  <div class="rounded-3xl border border-dashed border-sand-300 bg-white/80 px-6 py-14 text-center shadow-sm">
    <h2 class="text-xl font-semibold text-slate-900">{{ title }}</h2>
    <p class="mt-2 text-sand-700">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})
</script>
