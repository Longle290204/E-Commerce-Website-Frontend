/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./src/**/*.{js,jsx,ts,tsx}'],
   theme: {
      extend: {
         fontSize: {
            responsive: 'clamp(1.7rem, 2vw, 1.75rem)',
         },
         fontFamily: {
            nunito: ['Nunito', 'sans-serif'],
            poppins: ['Poppins', 'sans-serif'],
            quicksand: ['Quicksand', 'sans-serif'],
         },
      },
   },
   plugins: [],
};
