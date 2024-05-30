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
