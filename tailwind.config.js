/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      screens: {
        xs: "200px",
        ss: "400px",
        sm: "600px",
        ssm: "650px",
        md: "768px",
        lg: "900px",
        xl: "1024px",

        cass: "400px",
        casm: "430px",
      },
      colors: {
        primarycolor: "#36207d",
        secondarycolor: "#d52880",
        tertiarycolor: "#c08617",
        lightpurplecolor: "#ce9eff",
        whitecolor: "#ffffff",
        blackcolor: "#ffffff",
        transparent: "transparent",
      },
      fontSize: {
        bigHeadTitle: "3.466955579631636vh",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
