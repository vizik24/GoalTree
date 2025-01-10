/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light", // Default theme
      "dark",  // Optional themes
      "cupcake",
      "bumblebee",
      "sunset",
      "night",
      "forest"
      // Add more DaisyUI themes as needed
    ],
    darkTheme: "night", // Specify default dark mode theme
  },
}