<template>
  <div class="min-h-screen bg-app text-slate-900">
    <AppNavbar :back-to="backLink" />

    <div v-if="loading" class="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div class="rounded-3xl border border-sand-200 bg-white px-6 py-14 text-center shadow-sm">
        <p class="text-lg font-semibold text-slate-900">Loading meal detail...</p>
      </div>
    </div>

    <main v-else-if="meal" class="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <AppBreadcrumbs
        :items="breadcrumbItems"
      />

      <section class="overflow-hidden rounded-[2.25rem] border border-sand-200 bg-white shadow-xl shadow-brand-100/30">
        <img
          :src="meal.strMealThumb"
          :alt="meal.strMeal"
          class="mt-6 h-80 w-full object-cover sm:h-96 lg:h-[32rem]"
        />
      </section>

      <section class="mt-8 rounded-[2rem] border border-sand-200 bg-white p-7 shadow-sm sm:p-8">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
          Meal detail
        </p>
        <h1 class="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          {{ meal.strMeal }}
        </h1>
        <p class="mt-4 max-w-2xl text-base leading-7 text-sand-700">
          {{ summary }}
        </p>
        <div class="mt-6 flex flex-wrap gap-3">
          <BaseBadge v-if="meal.strCategory">{{ meal.strCategory }}</BaseBadge>
          <BaseBadge v-if="meal.strArea" variant="neutral">{{ meal.strArea }}</BaseBadge>
        </div>
      </section>

      <section class="mt-10 grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
        <div class="rounded-[2rem] border border-sand-200 bg-white p-7 shadow-sm sm:p-8">
          <h2 class="text-2xl font-bold text-slate-950">Ingredients & Measures</h2>
          <div class="mt-6 overflow-hidden rounded-[1.5rem] border border-sand-200">
            <div
              v-for="ingredient in ingredients"
              :key="ingredient"
              class="flex items-start gap-3 border-b border-sand-200 bg-cream-100 px-4 py-4 text-sm font-medium text-slate-800 last:border-b-0"
            >
              <span class="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-500"></span>
              <span class="leading-6">{{ ingredient }}</span>
            </div>
          </div>
        </div>

        <div class="rounded-[2rem] border border-sand-200 bg-white p-7 shadow-sm sm:p-8">
          <h2 class="text-2xl font-bold text-slate-950">Instructions</h2>
          <div class="mt-6 space-y-6">
            <div
              v-for="(step, index) in instructionSteps"
              :key="`${index}-${step.slice(0, 20)}`"
              class="flex gap-4"
            >
              <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                {{ index + 1 }}
              </span>
              <p class="pt-1 text-base leading-8 text-sand-700">
                {{ step }}
              </p>
            </div>
          </div>

          <div v-if="proTips.length" class="mt-10 rounded-[1.5rem] border border-sand-200 bg-cream-100 p-5">
            <h3 class="text-lg font-bold text-slate-950">Pro Tips</h3>
            <ul class="mt-4 space-y-3 text-base leading-7 text-sand-700">
              <li
                v-for="(tip, index) in proTips"
                :key="`${index}-${tip.slice(0, 20)}`"
                class="flex gap-3"
              >
                <span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-500"></span>
                <span>{{ tip }}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section class="mt-10 rounded-[2rem] border border-sand-200 bg-white p-7 shadow-sm sm:p-8">
        <h2 class="text-2xl font-bold text-slate-950">YouTube tutorial</h2>
        <div
          v-if="youtubeEmbed"
          class="mt-6 overflow-hidden rounded-[1.75rem] border border-sand-200 shadow-lg shadow-brand-100/30"
        >
          <div class="aspect-video">
            <iframe
              :src="youtubeEmbed"
              class="h-full w-full"
              title="YouTube meal tutorial"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        <div
          v-else
          class="mt-6 rounded-[1.75rem] border border-dashed border-sand-300 bg-cream-100 px-6 py-10 text-center text-sand-700"
        >
          Video tutorial is not available for this meal.
        </div>
      </section>
    </main>

    <main v-else class="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <EmptyState
        :title="hasError ? 'Gagal memuat meal detail' : 'Meal detail tidak tersedia'"
        :description="
          hasError
            ? 'Terjadi kendala saat mengambil detail meal. Coba refresh halaman atau pilih meal lain.'
            : 'Data meal tidak ditemukan dari API. Silakan kembali ke halaman sebelumnya dan pilih meal lain.'
        "
      />
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BaseBadge from '../components/atoms/BaseBadge.vue'
import AppBreadcrumbs from '../components/organisms/AppBreadcrumbs.vue'
import AppFooter from '../components/organisms/AppFooter.vue'
import AppNavbar from '../components/organisms/AppNavbar.vue'
import EmptyState from '../components/organisms/EmptyState.vue'
import api from '../services/api'

const route = useRoute()
const meal = ref(null)
const loading = ref(true)
const hasError = ref(false)

const ingredientName = computed(() => route.query.ingredient || '')

const backLink = computed(() => {
  if (ingredientName.value) {
    return {
      name: 'IngredientDetail',
      params: { ingredientName: ingredientName.value }
    }
  }

  return '/'
})

const breadcrumbItems = computed(() => {
  const items = [{ label: 'Home', to: '/' }]

  if (ingredientName.value) {
    items.push({
      label: 'Ingredients',
      to: '/'
    })
    items.push({
      label: ingredientName.value,
      to: {
        name: 'IngredientDetail',
        params: { ingredientName: ingredientName.value }
      }
    })
  }

  items.push({
    label: meal.value?.strMeal || 'Meal Detail'
  })

  return items
})

const ingredients = computed(() => {
  if (!meal.value) {
    return []
  }

  const items = []

  for (let index = 1; index <= 20; index += 1) {
    const ingredient = meal.value[`strIngredient${index}`]
    const measure = meal.value[`strMeasure${index}`]

    if (ingredient && ingredient.trim()) {
      items.push(`${measure ? measure.trim() : ''} ${ingredient.trim()}`.trim())
    }
  }

  return items
})

const parsedInstructions = computed(() => {
  if (!meal.value?.strInstructions) {
    return { steps: [], tips: [] }
  }

  const rawSteps = meal.value.strInstructions
    .split(/\r?\n+/)
    .map((step) => step.trim().replace(/^step\s*\d+[:.\-\s]*/i, '').trim())
    .filter(Boolean)

  const normalizedSteps =
    rawSteps.length > 1
      ? rawSteps
      : meal.value.strInstructions
          .split(/(?<=[.!?])\s+/)
          .map((step) => step.trim().replace(/^step\s*\d+[:.\-\s]*/i, '').trim())
          .filter(Boolean)

  const proTipsIndex = normalizedSteps.findIndex((step) => /^pro\s*tips?:?$/i.test(step))

  if (proTipsIndex === -1) {
    return {
      steps: normalizedSteps,
      tips: []
    }
  }

  return {
    steps: normalizedSteps.slice(0, proTipsIndex),
    tips: normalizedSteps.slice(proTipsIndex + 1)
  }
})

const instructionSteps = computed(() => parsedInstructions.value.steps)

const proTips = computed(() => parsedInstructions.value.tips)

const youtubeEmbed = computed(() => {
  if (!meal.value?.strYoutube) {
    return ''
  }

  const videoId = meal.value.strYoutube.split('v=')[1]?.split('&')[0]
  return videoId ? `https://www.youtube.com/embed/${videoId}` : ''
})

const summary = computed(() => {
  if (!meal.value) {
    return ''
  }

  return `Pelajari resep ${meal.value.strMeal} lengkap dengan bahan, langkah memasak, dan referensi video agar alurnya mudah diikuti.`
})

async function fetchMealDetail() {
  loading.value = true
  hasError.value = false

  try {
    const response = await api.getMealDetail(route.params.id)
    meal.value = response.data.meals?.[0] || null
  } catch (error) {
    hasError.value = true
    meal.value = null
  } finally {
    loading.value = false
  }
}

watch(
  () => route.params.id,
  () => {
    fetchMealDetail()
  },
  { immediate: true }
)
</script>
