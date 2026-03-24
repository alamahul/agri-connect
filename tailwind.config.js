/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // Override the entire borderRadius scale so every rounded-* uses 6 px (or 2× = 12 px for "2xl", etc.)
    borderRadius: {
      none: '0px',
      sm: '4px',
      DEFAULT: '6px',   // rounded
      md: '6px',   // rounded-md
      lg: '6px',   // rounded-lg
      xl: '6px',   // rounded-xl  ← was 12 px
      '2xl': '8px',   // rounded-2xl ← was 16 px
      '3xl': '10px',  // rounded-3xl ← was 24 px
      full: '9999px',// keep pill shapes (badges, avatars)
    },
    extend: {
      fontFamily: {
        // Make Manrope the global sans-serif (used by Tailwind's font-sans = default)
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        grace: ["'Covered By Your Grace'", "cursive"],
      },
      colors: {
        // AgriConnect primary green palette — matches the landing page
        agri: {
          50: '#f0faf0',
          100: '#d8f0d8',
          200: '#b2e0b3',
          300: '#7cc97e',
          400: '#4cad50',
          500: '#2e9134',
          600: '#237528',  // primary
          700: '#1b5e20',  // dark
          800: '#145017',
          900: '#0d3a10',
        },
      },
    },
  },
  plugins: [],
}
