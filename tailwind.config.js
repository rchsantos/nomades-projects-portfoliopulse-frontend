/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    container: {
      center: true,
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    colors: {
      transparent: 'transparent',
      black: colors.black,
      white: colors.white,
      current: 'currentColor',
      gray: {
        100: '#f7fafc',
        200: '#edf2f7',
        300: '#e2e8f0',
        400: '#cbd5e0',
        500: '#a0aec0',
        600: '#718096',
        700: '#4a5568',
        800: '#2d3748',
        900: '#1a202c',
      },
      'neutral-strongest': '#1A202C',
      'global-color-primary': '#00FFC4',
      'global-color-secondary': '#00AF78',
      'global-color-accent': '#00AF78',
      'dark-gunmetal': '#23242F',
      'midnight-navy': '#2B2D42',
      'cloudy-sky': '#8D99AE',
      'ice-white': '#EDF2F4',
      'vibrant-red': '#EF233C',
      'ruby-red': '#D90429',
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
