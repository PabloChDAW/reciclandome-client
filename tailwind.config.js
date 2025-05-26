/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // ✅ modo oscuro controlado por clase
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out both',
        'scale-pop': 'scalePop 0.4s ease-out both',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        scalePop: {
          '0%': { transform: 'scale(0.6)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      },
    }
  },
  plugins: [],
}

