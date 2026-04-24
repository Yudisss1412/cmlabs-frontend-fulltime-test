<template>
  <div class="min-h-screen bg-app text-slate-900">
    <AppNavbar />

    <PageHero
      eyebrow="Ingredients"
      title="Temukan bahan masakan favorit untuk mulai eksplor resep."
      description="Lagi bingung mau masak apa? Ketik bahan utama yang kamu punya, lalu temukan inspirasi resep lezat dalam hitungan detik."
      :image-src="heroImage"
      image-alt="Aneka hidangan makanan"
    >
      <template #search>
        <BaseSearchInput
          v-model="searchQuery"
          label="Search ingredients"
          placeholder="Cari bahan masakan..."
        />
      </template>
    </PageHero>

    <main class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <section class="mb-8">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">
            Ingredient list
          </p>
          <h2 class="mt-2 text-2xl font-bold text-slate-950">
            {{ visibleIngredients.length }} dari {{ filteredIngredients.length }} bahan siap dieksplor
          </h2>
        </div>
      </section>

      <SkeletonGrid v-if="loading" :count="8" variant="ingredient" />

      <EmptyState
        v-else-if="filteredIngredients.length === 0"
        title="Ingredients tidak ditemukan"
        :description="
          hasError
            ? 'Gagal mengambil data ingredients. Coba refresh halaman atau periksa koneksi internet.'
            : 'Coba kata kunci lain agar daftar bahan yang relevan muncul.'
        "
      />

      <TransitionGroup
        v-else
        tag="section"
        class="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-7"
        name="list-fade"
      >
        <IngredientCard
          v-for="ingredient in visibleIngredients"
          :key="ingredient.strIngredient"
          :name="ingredient.strIngredient"
          :to="{
            name: 'IngredientDetail',
            params: { ingredientName: ingredient.strIngredient }
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
import { computed, onMounted, ref } from 'vue'
import BaseSearchInput from '../components/atoms/BaseSearchInput.vue'
import IngredientCard from '../components/molecules/IngredientCard.vue'
import AppFooter from '../components/organisms/AppFooter.vue'
import AppNavbar from '../components/organisms/AppNavbar.vue'
import EmptyState from '../components/organisms/EmptyState.vue'
import PageHero from '../components/organisms/PageHero.vue'
import SkeletonGrid from '../components/organisms/SkeletonGrid.vue'
import api from '../services/api'

const heroImage = 'https://www.themealdb.com/images/media/meals/1548772327.jpg'

const ingredients = ref([])
const loading = ref(true)
const searchQuery = ref('')
const visibleCount = ref(16)
const hasError = ref(false)

const filteredIngredients = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  if (!query) {
    return ingredients.value
  }

  return ingredients.value.filter((ingredient) =>
    ingredient.strIngredient.toLowerCase().includes(query)
  )
})

const isSearching = computed(() => searchQuery.value.trim().length > 0)

const visibleIngredients = computed(() => {
  if (isSearching.value) {
    return filteredIngredients.value
  }

  return filteredIngredients.value.slice(0, visibleCount.value)
})

const showLoadMore = computed(() => {
  if (isSearching.value) {
    return false
  }

  return visibleCount.value < filteredIngredients.value.length
})

function loadMore() {
  visibleCount.value += 16
}

onMounted(async () => {
  try {
    const response = await api.getIngredients()
    ingredients.value = response.data.meals || []
  } catch (error) {
    hasError.value = true
  } finally {
    loading.value = false
  }
})
</script>
