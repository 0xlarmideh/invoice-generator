/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#101010",
        blue: "#3362CC",
        text: "#575757",
        text_light: "#F2F2F2",
        accent_light: "#B2B2B2",
        overlay: "rgba(0, 0, 0, 0.26)",
      },
      fontFamily: {
        'grotesk': ['Space Grotesk', 'sans-serif'],
        'monument': ['Monument Extended Bold']
      },
    },
  },
  plugins: [],
};
