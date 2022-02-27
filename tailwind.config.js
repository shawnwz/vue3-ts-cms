const defaultTheme = require('tailwindcss/defaultTheme')

// eslint-disable-next-line no-undef
whitelist = ['gray', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'purple', 'pink'].reduce(
  (result, color) =>
    result.push(`text-${color}-600`, `bg-${color}-600`, `bg-${color}-500`) && result,
  []
)

module.exports = {
  mode: 'jit',
  purge: {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    options: {
      // eslint-disable-next-line no-undef
      whitelist
    }
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio')
  ]
}
