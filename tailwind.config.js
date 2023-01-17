/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4B56D2'
      },
      fontFamily: {
        body: ["'Lato'", 'sans-serif'],
        logo: ["'Comfortaa'", 'cursive']
      }
    }
  },
  plugins: []
};
