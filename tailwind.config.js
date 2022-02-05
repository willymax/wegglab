const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: [
     './public/**/*.html',
     './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
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
