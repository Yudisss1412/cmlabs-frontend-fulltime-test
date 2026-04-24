import { createRouter, createWebHistory } from 'vue-router'
import Ingredients from '../views/Ingredients.vue'
import IngredientDetail from '../views/IngredientDetail.vue'
import MealDetail from '../views/MealDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Ingredients',
    component: Ingredients
  },
  {
    path: '/ingredient/:ingredientName',
    name: 'IngredientDetail',
    component: IngredientDetail
  },
  {
    path: '/meal/:id',
    name: 'MealDetail',
    component: MealDetail
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return {
      top: 0
    }
  }
})

export default router
