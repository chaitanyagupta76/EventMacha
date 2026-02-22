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
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(-8px)' },
          '50%': { transform: 'translateY(8px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%) rotate(-15deg)', opacity: '0' },
          '50%': { opacity: '0.6' },
          '100%': { transform: 'translateX(200%) rotate(-15deg)', opacity: '0' },
        },
        glow: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.2)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(251, 184, 19, 0.3)' },
          '50%': { boxShadow: '0 0 35px rgba(251, 184, 19, 0.6)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-up-delay': 'fadeInUp 0.8s ease-out 0.2s forwards',
        'fade-in-up-delay-2': 'fadeInUp 0.8s ease-out 0.4s forwards',
        'fade-in-up-delay-3': 'fadeInUp 0.8s ease-out 0.6s forwards',
        float: 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 5s ease-in-out infinite',
        shimmer: 'shimmer 4s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite',
        'glow-slow': 'glow 5s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
