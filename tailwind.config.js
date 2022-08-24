/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      "2xl-1": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      "xl-1": { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      "lg-1": { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      "md-1": { max: "767px" },
      // => @media (max-width: 767px) { ... }

      "sm-1": { max: "639px" },
    },
    extend: {
      height: {
        "h-97": "30rem",
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
        opacity: "opacity",
      },
      transitionDuration: {
        0: "0ms",
        2000: "2000ms",
      },
      transitionTimingFunction: {
        "in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
      transitionDelay: {
        0: "0ms",
        2000: "2000ms",
      },

      // ...
    },
  },
  plugins: [],
};
