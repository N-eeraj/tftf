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
    },
  },
  plugins: [],
}