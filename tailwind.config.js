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
        "light-gray-2": "#C7C7C7",
        "medium-gray": "#7A7A7A",
        "medium-gray-2": "#A7A8A7",
        "dark-gray": "#838383",

        "primary-color": "#FFFFFF", //"#F5F5F5",
        "secondary-color": "#878787",
        "base-color": "#000000", //"#141A14",

        "bright-green": "#AAE68C",
        "bright-yellow": "#E7D42E",
        "bright-red": "#E72E2E",
      },
    },
  },
  plugins: [],
};
