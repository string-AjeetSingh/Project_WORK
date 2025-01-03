/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
    "./public/index.html",

  ],
  safelist: [
    'bg-red-800',
    "text-slate-300",
    "bg-teal-800",
    "text-teal-200",
    "bg-pink-800",
    "text-pink-300",
    "bg-orange-700",
    "text-red-100"

  ],
  theme: {
    extend: {},

  },
  plugins: [],
}

