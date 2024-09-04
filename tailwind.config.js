module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFC107', // Yellow theme
        secondary: '#FFF8E1', // Light yellow background
        accent: '#FFEB3B', // Brighter yellow for highlights
        textColor: '#212121', // Dark text color for contrast
      },
    },
  },
  plugins: [],
}
