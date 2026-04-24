/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          100: '#ffe6d9',
          200: '#ffd0b8',
          300: '#ffb388',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c'
        },
        sand: {
          100: '#f8efe5',
          200: '#eadcca',
          300: '#dcc8af',
          500: '#a48a73',
          600: '#7c6654',
          700: '#5d4a3d'
        },
        cream: {
          100: '#fff8ef',
          200: '#fff1df'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif']
      }
    }
  }
}
