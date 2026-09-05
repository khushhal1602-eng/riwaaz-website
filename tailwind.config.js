/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: '#5A0B0B',
        burgundy: '#3A0507',
        ivory: '#F6F0E5',
        gold: '#C9A24A',
        'gold-antique': '#C9A24A',
        ink: '#171312',
        border: '#E5DDCF',
        'muted-foreground': '#736B66',
        secondary: '#EDE5D8',
        card: '#FAF6EF',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '.2em',
        eyebrow: '.28em',
      },
      aspectRatio: {
        '3/4': '3 / 4',
        '4/5': '4 / 5',
      },
    },
  },
  plugins: [],
}
