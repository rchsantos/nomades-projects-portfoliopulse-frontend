/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: '#1A1B23', // Couleur bleue par défaut
        secondary: '#00AF78', // Couleur orange par défaut
        success: '#10b981', // Couleur verte pour succès
        warning: '#fbbf24', // Couleur jaune pour avertissement
        danger: '#dc2626', // Couleur rouge pour danger
        info: '#3b82f6', // Couleur bleue claire pour information
      },
    },
  },
  plugins: [],
};
