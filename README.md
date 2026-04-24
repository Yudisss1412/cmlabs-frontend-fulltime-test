# ResepKita

Frontend assessment project built with Vue 3, Vite, Vue Router, Tailwind CSS, and TheMealDB API.

## Live Demo

- Vercel: `https://cmlabs-frontend-fulltime-test-xi.vercel.app/`
- GitHub Repository: `https://github.com/Yudisss1412/cmlabs-frontend-fulltime-test`

## Features

- Ingredients page with frontend search by ingredient name
- Ingredient detail page with meals filtered by the selected ingredient
- Meal detail page with image, title, recipe ingredients, cooking tutorial, and embedded YouTube video
- Responsive layout optimized for desktop, tablet, and mobile
- Reusable atomic-style components for scalable and maintainable UI
- Load More and Search flow to reduce long scrolling on large lists
- Dark mode toggle with animated theme transition

## Tech Stack

- Vue 3
- Vite
- Vue Router
- Tailwind CSS
- Axios

## API Endpoints Used

- List Ingredients: `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
- Filter by Ingredient: `https://www.themealdb.com/api/json/v1/1/filter.php?i={ingredient}`
- Meal Detail: `https://www.themealdb.com/api/json/v1/1/lookup.php?i={mealId}`

## Run Locally

1. Clone this repository.
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

5. Preview the production build:

```bash
npm run preview
```

## Project Structure

```text
src/
  components/
    atoms/
    molecules/
    organisms/
  router/
  services/
  views/
```

## UX Notes

- Jakob's Law: The layout follows familiar recipe website patterns to reduce the learning curve.
- Fitts's Law: Search inputs are large and easy to reach, and the full meal card is clickable.
- Hick's Law: Search, spacing, and progressive disclosure with Load More help reduce visual overload.
- Law of Proximity: Meal detail content is grouped clearly into image, summary, ingredients, instructions, and video sections.
- Aesthetic-Usability Effect: Consistent colors, rounded shapes, spacing, and typography improve perceived usability.
