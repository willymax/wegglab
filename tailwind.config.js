const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: defaultTheme.colors.green,
        validfeedback: defaultTheme.colors.green,
        invalidfeedback: defaultTheme.colors.green,
      },
    },
  },
  plugins: [],
}
