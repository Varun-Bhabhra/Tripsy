module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'hero-lg': "url('/tailwind/img/stacked-waves-haikie.png')",
      },
    },
    container: {
      center: true,
      padding: '7rem'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
