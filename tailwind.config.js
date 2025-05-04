/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        bengali: ['"Noto Sans Bengali"', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#e6f7ff',
          100: '#bae7ff',
          200: '#91d5ff',
          300: '#69c0ff',
          400: '#40a9ff',
          500: '#1890ff',
          600: '#096dd9',
          700: '#0050b3',
          800: '#003a8c',
          900: '#002766',
        },
        secondary: {
          50: '#e6fcf5',
          100: '#c3fae8',
          200: '#96f2d7',
          300: '#63e6be',
          400: '#38d9a9',
          500: '#20c997',
          600: '#12b886',
          700: '#0ca678',
          800: '#099268',
          900: '#087f5b',
        },
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
};