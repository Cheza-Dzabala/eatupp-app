module.exports = {
  mode: 'jit',
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Poppins'", "Helvetica", "Arial", "sans-serif"],
      },
      colors: {
        "primary": "#F17228",
        "secondary": "#FFB30E",
        "accent": "#FFB008",
        "grayblack": "#424242",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
