/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        everforest: {
          dark: {
            bg: '#2b3339',
            surface: '#323d43',
            surfaceHover: '#3a464c',
            text: '#d3c6aa',
            muted: '#9da9a0',
            border: '#475258',
            green: '#a7c080',
            aqua: '#7fbbb3',
            yellow: '#dbbc7f',
            red: '#e67e80',
            purple: '#d699b6',
          },
          light: {
            bg: '#fdf6e3',
            surface: '#f3efd4',
            surfaceHover: '#e8e2be',
            text: '#5c6a72',
            muted: '#829181',
            border: '#dfd7af',
            green: '#93b259',
            aqua: '#3a9487',
            yellow: '#dfa000',
            red: '#f85552',
            purple: '#df69ba',
          }
        }
      }
    },
  },
  plugins: [],
}
