const defaultTheme = require('tailwindcss/defaultTheme');
// import defaultTheme from 'tailwindcss/defaultTheme';

module.exports = {
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
  content: [
    './index.html',
    './src/**/*.vue',
    './src/**/*.js',
    './src/**/*.ts',
    // etc.
  ],
  theme: {
    cursor: {
      pointer: 'pointer',
      none: 'none',
      move: 'move',
    },
    extend: {
      fontFamily: {
        sans: ['Manrope', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        mischka: '#DCDFE6',
        'gunsmoke-plus': '#7E838F',
        'vivid-red': '#F4121E',
        'steel-gray': '#1C1C28',
        gray: '#8D8D8D',
        malachite: '#0FB648',
        'dove-gray': '#616161',
        salem: '#0F993E',
        iron: '#E2E2E5',
        monza: '#C80815',
        'torch-red': '#F4121E',
        tundora: '#484848',
        'bright-sun': '#FCC843',
        indigo: '#4A7BC2',
        mystic: '#DEE3ED',
        'silver-chalice': '#9F9F9F',
        'red-milano': '#BB070C',
        whisper: '#E7E7F2',
        saffron: '#F5BC27',
        silver: '#BDBDBD',
        // 'alizarin-crimson': '#E32636',
        'mint-green': '#A9FFBC',
        lochmara: '#0075CF',
        'lily-white': '#EAF9FF',
        'alizarin-crimson': '#E91D23',
        'Medium-Green': '#32B34A',
        'Dark-Jungle-Green': '#1F1F1F',
        SpicyPink: '#796D6D',
        greywildsand: '#F6F6F6',
        Ebb: '#EFE8E8',
        black: '#000',
        green: '#008000',
        blue: '#0000ff',
        VerdunGreen: '#4A6800',
        Mercury: '#E4E4E4',
        Endeavour: '#0061A4',
      },
      zIndex: {
        '-10': '-10',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'translateY(-25%)' },
          '50%': { transform: 'translateY(-20%)' },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      rotate: {
        135: '135deg',
        270: '270deg',
      },
    },
  },
};
