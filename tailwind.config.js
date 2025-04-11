/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extends: {}
  },

  // plugins: [require('daisyui'), require('@tailwindcss/typography')],

  // daisyui: {
  //   themes: [
  //     {
  //       retro: {
  //         "primary": "#FFD58E",  // Peach
  //         "secondary": "#7EB7B3", // Teal
  //         "accent": "#E8A2AF",    // Pink
  //         "neutral": "#2A2520",   // Dark Brown
  //         "base-100": "#F9E2BB",  // Cream
  //         "info": "#A0C4E2",      // Light Blue
  //         "success": "#B5EAD7",   // Mint
  //         "warning": "#FFDAC1",   // Light Orange
  //         "error": "#FF9AA2",     // Coral
  //       },
  //     },
  //   ],
  // }


};
