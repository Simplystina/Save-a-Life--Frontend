/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        euclid: ["EuclidCircularBRegular", "sans-serif"],
        euclidMedium: ["EuclidCircularBMedium", "sans-serif"],
        euclidSemiBold: ["EuclidCircularBSemiBold", "sans-serif"],
        euclidBold: ["EuclidCircularBBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
 