/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        infiniteXScr: "infiniteXScr 40s linear infinite",
        infiniteXScrAlter: "infiniteXScrAlter 40s linear infinite",
      },
      keyframes: {
        infiniteXScr: {
          from: {
            transform: "translateX(0%)",
          },
          to: {
            transform: "translateX(-100%)",
          },
        },
        infiniteXScrAlter: {
          from: {
            transform: "translateX(-100%)",
          },
          to: {
            transform: "translateX(0%)",
          },
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
