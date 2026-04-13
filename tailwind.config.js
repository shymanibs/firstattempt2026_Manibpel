/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "addu-navy": "#040354",
        "addu-blue": "#135BEC",
        "addu-rose": "#E11D48",
        "addu-gray": "#F3F4F6",
      },
    },
  },
  plugins: [],
}