/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'xs': '320px',
      'sm': '576px', // Custom small breakpoint
      'md': '768px',
      'lg': '992px', // Custom large breakpoint
      'xl': '1200px',
      '2xl': '1400px', // Custom extra-large breakpoint
    },
  },
  plugins: [],
}