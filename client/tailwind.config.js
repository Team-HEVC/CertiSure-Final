/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  theme: {
    extend: {
      screens: {
        "3xl": "1650px", // Custom breakpoint for 1650px and above
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};
