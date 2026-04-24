<template>
  <nav aria-label="Breadcrumb">
    <ol class="flex flex-wrap items-center gap-1 text-sm text-sand-500">
      <li
        v-for="(item, index) in items"
        :key="`${item.label}-${index}`"
        class="flex items-center"
      >
        <router-link
          v-if="item.to && index !== items.length - 1"
          :to="item.to"
          class="transition hover:text-brand-500 hover:underline"
        >
          {{ item.label }}
        </router-link>
        <span v-else class="font-medium text-slate-900">
          {{ item.label }}
        </span>
        <span
          v-if="index !== items.length - 1"
          class="mx-2 text-sand-300"
          aria-hidden="true"
        >
          /
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
</script>
