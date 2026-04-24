import axios from 'axios'

const api = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1'
})

export default {
  getIngredients() {
    return api.get('/list.php?i=list')
  },
  getMealsByIngredient(ingredient) {
    return api.get(`/filter.php?i=${encodeURIComponent(ingredient)}`)
  },
  getMealDetail(id) {
    return api.get(`/lookup.php?i=${encodeURIComponent(id)}`)
  }
}
