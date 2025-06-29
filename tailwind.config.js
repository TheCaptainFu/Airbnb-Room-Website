/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./html/**/*.{html,js}", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        'custom-grey': '#6b7280', // gray-500 equivalent
        'custom-gold': '#fbbf24', // yellow-400 equivalent
        'custom-dark-grey': '#242424', // dark grey
      },
    },
  },
  plugins: [],
}

