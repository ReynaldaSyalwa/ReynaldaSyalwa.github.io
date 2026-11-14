/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./template.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        editorial: {
          canvas: '#ffffff',
          ink: '#18181b',
          muted: '#71717a',
          divider: 'rgba(0, 0, 0, 0.08)',
          pill: '#000000',
          subtle: '#f4f4f5',
        },
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        editorial: '0.08em',
        tracked: '0.15em',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      }
    },
  },
  plugins: [],
}
