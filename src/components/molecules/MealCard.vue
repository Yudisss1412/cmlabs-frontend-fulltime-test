<template>
  <router-link
    :to="to"
    class="group block h-full overflow-hidden rounded-3xl border border-sand-200 bg-white shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-brand-200 hover:shadow-xl"
  >
    <div class="aspect-[4/3] overflow-hidden bg-sand-100">
      <img
        :src="image"
        :alt="title"
        class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
    </div>
    <div class="p-5">
      <h3 class="line-clamp-2 text-lg font-semibold text-slate-900 transition group-hover:text-brand-700">
        {{ title }}
      </h3>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  to: {
    type: [String, Object],
    required: true
  }
})
</script>
