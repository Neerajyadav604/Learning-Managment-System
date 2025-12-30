/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // ✅ include jsx/tsx if using React
  ],
  theme: {
    extend: {
      colors: {
        'bright-blue': "#1E92FF",
        'pastel-green': "#B9D7BF",
      },
      spacing: {
        '144-8': '144.8px', // Custom width
        '44-98': '44.98px', // Custom height
      },
      fontFamily: {
        myfont: ['Montserrat', 'Fraunces', 'sans-serif'],
      },
    },
  },
  plugins: [],
};