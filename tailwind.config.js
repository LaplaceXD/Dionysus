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
      error: colors.red,
    },
    extend: {
      keyframes: {
        tada: {
          "0%, 100%": { transform: "scale3d(1, 1, 1)" },
          "10%, 20%": {
            transform: "scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg)",
          },
          "30%, 50%, 70%, 90%": {
            transform: "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)",
          },
          "40%, 60%, 80%": {
            transform: "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)",
          },
        },
        shimmer: {
          "0%": { backgroundPosition: "-468px 0" },
          "100%": { backgroundPosition: "468px 0" },
        },
      },
      animation: {
        tada: "tada 1.5s ease-in-out infinite",
        shimmer: "shimmer 1.5s forwards linear infinite",
      },
    },
  },
  plugins: [],
};
