/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        brand: {
          darkest: '#02040b', // side panel bg color
          foreground: '#fafafa', // text etc..
          bg: '#04070f', // main app, header bg color
          card: '#0b0f18', // card bg color
          secondary: '#161b24', // input, ... color
          border: '#242933', // border color
          primary: '#6569ff', // button color
          muted: '#8f8f8f', // icon colors
        }
      }
    },
  },
  plugins: [],
}

