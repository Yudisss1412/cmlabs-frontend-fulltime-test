<template>
  <nav class="sticky top-0 z-50 border-b border-sand-200 bg-white/80 shadow-sm backdrop-blur-md">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
      <router-link to="/" class="flex items-center gap-3">
        <span class="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-100 text-sm font-bold text-brand-700">
          RK
        </span>
        <div>
          <p class="text-lg font-bold text-slate-900">ResepKita</p>
          <p class="text-sm text-sand-600">Recipe explorer</p>
        </div>
      </router-link>

      <div class="flex items-center gap-3">
        <button
          type="button"
          ref="themeToggleRef"
          class="flex h-11 w-11 items-center justify-center rounded-full border border-sand-300 bg-white text-lg text-sand-700 transition hover:border-brand-300 hover:text-brand-700"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggleTheme"
        >
          {{ isDark ? '☀️' : '🌙' }}
        </button>

        <router-link
          v-if="backTo"
          :to="backTo"
          class="rounded-full border border-sand-300 px-4 py-2 text-sm font-semibold text-sand-700 transition hover:border-brand-300 hover:text-brand-700"
        >
          Back
        </router-link>
      </div>
    </div>
  </nav>

  <div
    v-if="transitionCircle.visible"
    :class="[
      'theme-burst-overlay',
      transitionCircle.theme === 'dark' ? 'theme-burst-overlay-dark' : 'theme-burst-overlay-light',
      transitionCircle.animating ? 'theme-burst-overlay-active' : ''
    ]"
    :style="{
      '--burst-x': `${transitionCircle.x}px`,
      '--burst-y': `${transitionCircle.y}px`
    }"
  ></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

defineProps({
  backTo: {
    type: [String, Object],
    default: null
  }
})

const isDark = ref(false)
const themeToggleRef = ref(null)
const transitionCircle = ref({
  visible: false,
  animating: false,
  x: 0,
  y: 0,
  theme: 'dark'
})
let transitionTimer = null

function applyTheme(value) {
  isDark.value = value
  document.documentElement.classList.toggle('dark', value)
  localStorage.setItem('theme', value ? 'dark' : 'light')
}

function clearTransitionTimer() {
  if (transitionTimer) {
    window.clearTimeout(transitionTimer)
    transitionTimer = null
  }
}

function toggleTheme() {
  const nextThemeIsDark = !isDark.value
  const buttonRect = themeToggleRef.value?.getBoundingClientRect()

  transitionCircle.value = {
    visible: true,
    animating: false,
    x: buttonRect ? buttonRect.left + buttonRect.width / 2 : window.innerWidth - 48,
    y: buttonRect ? buttonRect.top + buttonRect.height / 2 : 48,
    theme: nextThemeIsDark ? 'dark' : 'light'
  }

  requestAnimationFrame(() => {
    applyTheme(nextThemeIsDark)

    requestAnimationFrame(() => {
      transitionCircle.value = {
        ...transitionCircle.value,
        animating: true
      }
    })
  })

  clearTransitionTimer()
  transitionTimer = window.setTimeout(() => {
    transitionCircle.value = {
      ...transitionCircle.value,
      visible: false,
      animating: false
    }
  }, 850)
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')

  if (savedTheme) {
    applyTheme(savedTheme === 'dark')
    return
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  applyTheme(prefersDark)
})
</script>
