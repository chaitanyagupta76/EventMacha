/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'brand-navy': '#4A5D82',
        'brand-blue': '#7FA6D1',
        'brand-grey': '#96A9BC',
        'brand-rose': '#C4847C',
        'brand-pink': '#FADADD',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Lato"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
