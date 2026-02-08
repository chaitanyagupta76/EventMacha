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
        // Indian-Inspired Brand Colors
        'brand-saffron': '#FF6B35',      // Vibrant saffron - primary actions
        'brand-maroon': '#8B1538',       // Deep maroon - headings, emphasis
        'brand-gold': '#F4A460',         // Warm gold - accents, highlights
        'brand-emerald': '#2D6A4F',      // Rich emerald - success, nature
        'brand-royal': '#1E3A8A',        // Royal blue - trust, stability
        'brand-turmeric': '#FDB813',     // Bright turmeric - energy, joy
        'brand-peacock': '#0EA5E9',      // Peacock blue - elegance
        'brand-lotus': '#F9A8D4',        // Lotus pink - purity, celebration
        'brand-cream': '#FEF3C7',        // Sandalwood cream - backgrounds
        
        // Keep grey for borders
        'brand-grey': '#96A9BC',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Lato"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
