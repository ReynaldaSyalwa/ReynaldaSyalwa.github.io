/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#060608',
          900: '#09090b',
          800: '#121215',
          700: '#18181b',
          600: '#27272a',
          500: '#3f3f46',
        },
        growth: {
          50: '#ecfdf5',
          100: '#d1fae5',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'trifecta': '0 20px 40px -12px rgba(0, 0, 0, 0.7)',
        'glow-emerald': '0 0 24px -4px rgba(16, 185, 129, 0.25)',
      }
    },
  },
  plugins: [],
}
