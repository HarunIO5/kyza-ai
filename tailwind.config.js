import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      "animation": {
        "border-width": "border-width 3s infinite alternate",
        "text-gradient": "text-gradient 2.0s linear infinite"
      },
      "keyframes": {
        "border-width": {
          "from": {
            "width": "10px",
            "opacity": "0"
          },
          "to": {
            "width": "100px",
            "opacity": "1"
          }
        },
        "text-gradient": {
          "to": {
            "backgroundPosition": "200% center"
          }
        }
      },
    },
  },
  
  darkMode: "class",
  plugins: [require("tailwindcss-animate"), nextui(), require('@tailwindcss/typography')],
}
