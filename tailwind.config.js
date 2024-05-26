/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    screens: {
      "s": "319px",
      "m": "375px",
      "l": "425px",
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      'xxl': '1440px',
      '2xl': '1920px',
    },
  },
};
export const plugins = [];