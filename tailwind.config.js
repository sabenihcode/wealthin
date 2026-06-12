/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#3B82F6',  // Lebih cerah
        'neon-purple': '#A855F7',
        'neon-green': '#22C55E',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}