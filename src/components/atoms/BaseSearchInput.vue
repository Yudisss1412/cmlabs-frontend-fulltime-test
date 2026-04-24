<template>
  <label class="relative block">
    <span class="sr-only">{{ label }}</span>
    <input
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      class="w-full rounded-full border border-sand-300 bg-white px-5 py-4 pr-32 text-base text-slate-800 shadow-sm transition focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100 md:px-6 md:py-5 md:pr-36 md:text-lg"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <span
      class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm md:right-4"
      aria-hidden="true"
    >
      🔍 Cari
    </span>
  </label>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: 'Search'
  },
  placeholder: {
    type: String,
    default: 'Search'
  },
  type: {
    type: String,
    default: 'text'
  }
})

defineEmits(['update:modelValue'])
</script>
