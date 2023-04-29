/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#fbcfe8',
        button: '#7e22ce',
        login: '#fdecf6',
      },
    },
  },
  plugins: [],
};
