/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './index.html',
    './src/**/*.{html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        beige: '#F6EACB',
        peach: '#F1D3CE',
        blue: '#D1E9F6',
      },
    },
  },
  plugins: [],
}
