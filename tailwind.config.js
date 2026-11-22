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
        cream: '#F7F5F0',
        paper: '#FFFFFF',
        ink: '#111111',
        'ink-soft': '#2B2B2B',
        muted: '#6B6B6B',
        amber: {
          DEFAULT: '#F5A24B',
          deep: '#EE8A2B',
          soft: '#FCE9D2',
        },
        sage: '#7E8F6B',
        lime: '#7BD44A',
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
        display: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'display-sm': ['clamp(2.2rem, 5.5vw, 3.2rem)', { lineHeight: '1.04', letterSpacing: '-0.03em' }],
        'display': ['clamp(2.8rem, 7.5vw, 4.8rem)', { lineHeight: '0.99', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(3.4rem, 9.5vw, 6.4rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
      },
      letterSpacing: {
        editorial: '0.08em',
        tracked: '0.15em',
        tightest: '-0.045em',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        card: '20px',
      },
      boxShadow: {
        soft: '0 2px 8px rgba(17,17,17,0.04), 0 12px 40px -18px rgba(17,17,17,0.16)',
        lift: '0 1px 2px rgba(17,17,17,0.04), 0 24px 60px -24px rgba(17,17,17,0.22)',
        chip: '0 2px 10px rgba(17,17,17,0.10)',
      },
      maxWidth: {
        shell: '1180px',
      },
    },
  },
  plugins: [],
}
