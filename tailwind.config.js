/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./src/**/*.{js,jsx,ts,tsx}'],
   theme: {
      extend: {
         container: {
            center: true,
            padding: '2rem',
            screens: {
               sm: '640px',
               md: '768px',
               lg: '1024px',
               xl: '1340px', // Thay đổi giá trị xl theo yêu cầu
            },
         },
         
         fontSize: {
            responsive: 'clamp(1.7rem, 2vw, 1.75rem)',
         },

         // fontFamily: {
         //    nunito: ['Nunito', 'sans-serif'],
         //    poppins: ['Poppins', 'sans-serif'],
         //    quicksand: ['Quicksand', 'sans-serif'],
         // },
         // fontSize: {
         //    base: '10px', // Định nghĩa 1rem = 10px
         // },
      },
   },
   plugins: [],
};
