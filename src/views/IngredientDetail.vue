<template>
  <div class="min-h-screen bg-app text-slate-900">
    <AppNavbar back-to="/" />

    <PageHero
      eyebrow="Ingredient detail"
      :title="ingredientName"
      description="Pilih menu yang paling bikin lapar, lalu buka detail resepnya untuk lihat bahan, langkah memasak, dan video tutorial."
      :image-src="ingredientImage"
      :image-alt="ingredientName"
    >
      <template #search>
        <BaseSearchInput
          v-model="searchQuery"
          label="Search meals"
          placeholder="Cari menu masakan..."
        />
      </template>
    </PageHero>

    <main class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <AppBreadcrumbs
        :items="[
          { label: 'Home', to: '/' },
          { label: 'Ingredients', to: '/' },
          { label: ingredientName }
        ]"
      />

      <section class="mb-8 mt-4 flex items-end justify-between gap-4">
        <div>
          <h2 class="text-2xl font-bold text-slate-950">
            {{ visibleMeals.length }} dari {{ filteredMeals.length }} menu dengan bahan {{ ingredientName }}
          </h2>
        </div>
      </section>

      <SkeletonGrid v-if="loading" :count="8" variant="meal" />

      <EmptyState
        v-else-if="filteredMeals.length === 0"
        title="Meals tidak ditemukan"
        :description="
          hasError
            ? 'Gagal mengambil data meals. Coba refresh halaman atau kembali ke halaman sebelumnya.'
            : 'Coba kata kunci lain atau pilih ingredient berbeda dari halaman sebelumnya.'
        "
      />

      <TransitionGroup
        v-else
        tag="section"
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        name="list-fade"
      >
        <MealCard
          v-for="meal in visibleMeals"
          :key="meal.idMeal"
          :title="meal.strMeal"
          :image="meal.strMealThumb"
          :to="{
            name: 'MealDetail',
            params: { id: meal.idMeal },
            query: { ingredient: ingredientName }
          }"
        />
      </TransitionGroup>

      <div v-if="showLoadMore" class="mt-10 flex justify-center">
        <button
          type="button"
          class="rounded-full border border-sand-300 bg-white px-6 py-3 text-sm font-semibold text-sand-700 shadow-sm transition hover:border-brand-300 hover:text-brand-700"
          @click="loadMore"
        >
          Load More
        </button>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BaseSearchInput from '../components/atoms/BaseSearchInput.vue'
import MealCard from '../components/molecules/MealCard.vue'
import AppFooter from '../components/organisms/AppFooter.vue'
import AppBreadcrumbs from '../components/organisms/AppBreadcrumbs.vue'
import AppNavbar from '../components/organisms/AppNavbar.vue'
import EmptyState from '../components/organisms/EmptyState.vue'
import PageHero from '../components/organisms/PageHero.vue'
import SkeletonGrid from '../components/organisms/SkeletonGrid.vue'
import api from '../services/api'

const route = useRoute()
const meals = ref([])
const loading = ref(true)
const searchQuery = ref('')
const visibleCount = ref(16)
const ingredientName = computed(() => route.params.ingredientName || '')
const ingredientImage = computed(
  () => `https://www.themealdb.com/images/ingredients/${ingredientName.value}.png`
)
const hasError = ref(false)

const filteredMeals = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  if (!query) {
    return meals.value
  }

  return meals.value.filter((meal) => meal.strMeal.toLowerCase().includes(query))
})

const isSearching = computed(() => searchQuery.value.trim().length > 0)

const visibleMeals = computed(() => {
  if (isSearching.value) {
    return filteredMeals.value
  }

  return filteredMeals.value.slice(0, visibleCount.value)
})

const showLoadMore = computed(() => {
  if (isSearching.value) {
    return false
  }

  return visibleCount.value < filteredMeals.value.length
})

function loadMore() {
  visibleCount.value += 16
}

async function fetchMeals() {
  loading.value = true
  hasError.value = false

  try {
    const response = await api.getMealsByIngredient(ingredientName.value)
    meals.value = response.data.meals || []
  } catch (error) {
    hasError.value = true
    meals.value = []
  } finally {
    loading.value = false
  }
}

watch(
  () => route.params.ingredientName,
  () => {
    searchQuery.value = ''
    visibleCount.value = 16
    fetchMeals()
  },
  { immediate: true }
)
</script>
