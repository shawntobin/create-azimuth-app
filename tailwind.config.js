/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-green": "#AAE68C",
        "dark-green": "#141A13",
        "medium-green": "#4E554B",
        "medium-green-2": "#4D733A",

        "light-gray": "#C3C5C1",
        "medium-gray": "#7A7A7A",
      },
    },
  },
  plugins: [],
};
