/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-green": {
          500: "#00F1BF",
          700: "#01C29A"
        },
        "black": {
          700: "#1B1F24",
          800: ""
        }
      },
    },
  },
  plugins: [],
}
