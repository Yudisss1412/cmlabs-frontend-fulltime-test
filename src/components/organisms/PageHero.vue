<template>
  <section class="relative overflow-hidden bg-white">
    <div class="absolute inset-x-0 top-0 h-full bg-hero-pattern opacity-80"></div>
    <div class="relative mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-16">
      <div>
        <p class="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
          {{ eyebrow }}
        </p>
        <h1 class="max-w-2xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          {{ title }}
        </h1>
        <p class="mt-4 max-w-2xl text-base leading-7 text-sand-700 sm:text-lg">
          {{ description }}
        </p>
        <div v-if="$slots.search" class="mt-8 max-w-2xl">
          <slot name="search" />
        </div>
      </div>

      <div v-if="imageSrc" class="hero-image-reveal mx-auto w-full max-w-md">
        <div class="overflow-hidden rounded-[2rem] border border-sand-200 bg-cream-100 p-4 shadow-xl shadow-brand-100/40">
          <img :src="imageSrc" :alt="imageAlt" class="h-full w-full rounded-[1.5rem] object-cover" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  eyebrow: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageSrc: {
    type: String,
    default: ''
  },
  imageAlt: {
    type: String,
    default: ''
  }
})
</script>
