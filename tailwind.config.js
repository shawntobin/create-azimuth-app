/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-green": "#AAE68C",
        "dark-green": "#141A13",
        "light-gray": "#C3C5C1",
      },
    },
  },
  plugins: [],
};
