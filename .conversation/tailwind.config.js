/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F7F3EB',
        'warm-white': '#FCFAF6',
        espresso: '#211D19',
        brown: '#5A4030',
        burnt: '#B86B3E',
        beige: '#E7D9C7',
        'text-gray': '#625D56',
      },
    },
  },
  plugins: [],
}