/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto Slab', 'serif'],
      },
    },
  },
  plugins: [],
}
