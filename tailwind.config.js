module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "matoa-primary": "#F1DDC9",
        "matoa-text-primary": "#D84727",
        "matoa-text": "#333333",
      },
      spacing: {
        "image-login": "82vh",
      },
    },
  },
  plugins: [],
};
