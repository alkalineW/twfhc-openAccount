/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.{html,js}'],
  theme: {
    screens: {
      '2xs': '360px',
      xs: '576px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
    maxWidth: {
      us: 'unset',
    },
    extend: {
      animation: {
        twoStepSwitch: 'twoStep 1.5s steps(1) infinite',
        scaling: 'scaleDown 2s infinite',
        scalingDelay: 'scaleDown 2s 1s infinite',
      },
      fontFamily: {
        funInn: ['funInn'],
      },
      colors: {
        cb: '#333333',
        brn: '#98665c',
        dbrn: '#7c4b43',
        salmon: '#ee7963',
        sunlight: '#ffb24d',
        oat: '#fff9f0',
        customGrey: '#727272',
        sand: '#fcd597',
      },
      keyframes: {
        twoStep: {
          '0%,100%': { transform: 'translateX(0%)' },
          '50%': { transform: 'translateX(-50%)' },
        },
        scaleDown: {
          '0%,100%': { transform: 'scale(0.9)' },
          '50%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
