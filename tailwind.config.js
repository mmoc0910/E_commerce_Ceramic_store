/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Epilogue", "sans-serif;"],
        secondary: ["Roboto Serif", "serif"],
      },
      colors: {
        intuitive: "#2D2D2A",
        simple: "#99AAA1",
        clear: "#C0C9C4",
        light: "#F1F1F1",
        aesthetic: "#FEFEFE",
        error: "#d52f42",
        text1: "#171725",
        text2: "#4B5264",
        text3: "#808191",
        text4: "#B2B3BD",
      },
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        lg: "2rem",
        xl: "2rem",
        "2xl": "10rem",
      },
    },
  },
  plugins: [],
};
