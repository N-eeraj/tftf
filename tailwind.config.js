/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#272727',
        light: '#CDB',
        accent: '#50C878',
      },
      fontFamily: {
        mono: '"Roboto Mono", monospace'
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      },
      animation: {
        'blink': 'blink 1200ms ease-in-out infinite',
      },
    },
  },
  plugins: [],
}