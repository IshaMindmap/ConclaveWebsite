/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // ========= COLORS =====
      colors: {
        primary: '#0875F4',
        primaryLight: '#F6FBFF',
        secondary: '#FC7F29',
        darkblue: '#14183E',
        green: '#23E98A',
        textOrange: '#FC7F29',
        textBlack: '#14183E',
        textBlue: '#0875F4',
        textGrey: '#434665',
        lightgray: '#F2F2F2',
      },

      // ====== FONT FAMILY =====
      fontFamily: {
        segoe: ['Segoe UI'],
        mulish: ['Mulish', 'sans-serif'],
      },
    },

    backgroundImage: {
      'conic-gradient':
        'conic-gradient(from 40deg, #26DDFF, transparent, transparent, #004DF4, transparent, transparent, #26DDFF)',
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.fill-available': {
          width: '-webkit-fill-available',
        },
        '.fill-available-firefox': {
          width: '100vw',
        },
        '.fill-available-h': {
          height: '-webkit-fill-available',
        },
        '.border-gradient': {
          border: '1px solid',
          borderImageSource:
            'linear-gradient(161.06deg, rgba(0, 77, 244, 0) 13.7%, rgba(0, 77, 244, 0.4) 27.55%, #004DF4 36.4%, #26DDFF 53.88%, rgba(38, 221, 255, 0) 89.18%)',
          borderImageSlice: 1,
        },
        'min-h-md': {
          height: 'calc( 96vh - 75px )',
        },
        '.gradient-button': {
          background: 'linear-gradient( to right, #4EB7FF , #4EF9B6)',
        },
        // Add the text gradient utility class here
        '.text-gradient': {
          background: 'linear-gradient(to right, #4EB7FF, #4EF9B6)',
          '-webkit-background-clip': 'text',
          color: 'transparent',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};
