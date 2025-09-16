/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: "300px",
      md: "400px",
      lg: "880px",
      tablet: "1024px",
    },
    extend: {
      fontFamily: {
        // =========================== font Lufga ===========================
        LufgaBold: "LufgaBold",
        LufgaMedium: "LufgaMedium",
        LufgaRegular: "LufgaRegular",
        LufgaSemiBold: "LufgaSemiBold",
      },
      colors: {
        primaryBtn: "#183E9F",
        secondaryBtn: "#4A9BDA",
        regularText: "#111111",
        bgBaseColor: "#F2F5FF",
        borderColor: "#11111129",
      },
    },
  },
  plugins: [],
};
