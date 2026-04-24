<template>
  <router-link
    :to="to"
    class="group block h-full rounded-3xl border border-sand-200 bg-white p-4 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-brand-200 hover:shadow-xl sm:p-5"
  >
    <div class="flex h-full flex-col items-center text-center">
      <div class="mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-cream-200 sm:h-32 sm:w-32">
        <img
          :src="imageUrl"
          :alt="name"
          loading="lazy"
          decoding="async"
          class="h-20 w-20 object-contain transition duration-300 group-hover:scale-105 sm:h-24 sm:w-24"
          @error="handleImageError"
        />
      </div>
      <h3 class="text-base font-semibold text-slate-900 transition group-hover:text-brand-700">
        {{ name }}
      </h3>
    </div>
  </router-link>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  to: {
    type: [String, Object],
    required: true
  }
})

const imageUrl = `https://www.themealdb.com/images/ingredients/${props.name}-Small.png`

function handleImageError(event) {
  event.target.src = 'https://www.themealdb.com/images/ingredients/-Small.png'
}
</script>
