/** @type {import('tailw./themefig} */
const colors = require('./src/colors.json')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: colors,
      gridTemplateColumns: {
        // Complex site-specific column configuration
        'customCol': '95px repeat(7, 1fr)',
      },
      gridTemplateRows: {
        // Simple 24 row grid
        '24': 'repeat(24, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
}
