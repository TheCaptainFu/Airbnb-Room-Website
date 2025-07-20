/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}", "./js/**/*.js", "./production/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'custom-grey': '#6b7280', // gray-500 equivalent
        'custom-gold': '#fbbf24', // yellow-400 equivalent
        'custom-dark-grey': '#242424', // dark grey
      },
      screens: {
        'xs': '480px',
        'sm': '640px',
        'tab': '768px',
        'lap': '1024px',
        'xl': '1280px',
        'desk': '1440px',
        '2xl': '1536px',
        'wide': '1920px',
      },
    },
  },
  plugins: [],
}

