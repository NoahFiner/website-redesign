/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: "#c9d4c6",
      secondary: "#2B3B37",
    },
    extend: {
      fontFamily: {
        basteleur: ["basteleur", "sans-serif"],
        plex: ["IBM Plex Mono", "mono"],
      },
      dropShadow: {
        intro: "0 8px 8px rgb(0 0 0 / 0.8)",
        introbody: "0 0 2px rgb(0 0 0 / 0.8)",
      },
      animation: {
        wiggle: "wiggle 2s ease-in-out infinite",
        spinfast: "spinfast 12s cubic-bezier(.01,1.01,.61,1.01)",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(12px)" },
        },
        spinfast: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(1800deg)" },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "animate-delay": (value) => ({
            animationDelay: value,
          }),
        },
        { values: theme("transitionDelay") }
      );
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "animate-duration": (value) => ({
            animationDuration: value,
          }),
        },
        { values: theme("transitionDuration") }
      );
    }),
  ],
};
