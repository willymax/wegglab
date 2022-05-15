const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  // mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        color: 'var(--color)',
        background: 'var(--background)',
        surface: 'var(--surface)',
        'color-primary': 'var(--color-primary)',
        'color-secondary': 'var(--color-secondary)',
        'on-background': 'var(--on-background)',
        'on-surface': 'var(--on-surface)',
        'on-primary': 'var(--on-primary)',
        'on-secondary': 'var(--on-secondary)',

        primary: defaultTheme.colors.green,
        validfeedback: defaultTheme.colors.green,
        invalidfeedback: defaultTheme.colors.green,
      },
    },
  },
  plugins: [],
}
