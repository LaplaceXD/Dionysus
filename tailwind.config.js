import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    colors: {
      trasparent: colors.transparent,
      white: colors.white,
      neutral: colors.slate,
      primary: colors.purple,
      secondary: colors.blue,
      accent: colors.fuchsia,
    },
  },
  plugins: [],
};
