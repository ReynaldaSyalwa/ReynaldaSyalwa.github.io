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
        zendesk: {
          lime: '#d1f470',
          forest: '#203524',
          grove: '#2d4c33',
          ink: '#11110d',
          warm: '#f5f5f2',
          white: '#ffffff',
          midnight: '#000000',
          stone: '#90918c',
          divider: 'rgba(17, 17, 13, 0.11)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        zendesk: '0.054em',
      },
      borderRadius: {
        cards: '0px',
        buttons: '16px',
        event: '40px',
        inputs: '12px',
        tags: '4px',
      },
      boxShadow: {
        none: 'none',
      }
    },
  },
  plugins: [],
}
