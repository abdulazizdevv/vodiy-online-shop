/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
    screens: {
      lt: "400px",
      sm: "600px",
      md: "728px",
      lg: "984px",
      xl: "1240px",
      "2xl": "1440px",
    },
    variants: {
      extend: {},
    },
    extend: {
      colors: {
        mainColor: "#1DB954",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    container: {
      screens: {
        lt: "400px",
        sm: "600px",
        md: "728px",
        lg: "984px",
        xl: "1240px",
        "2xl": "1440px",
      },
    },
  },
  plugins: [],
};
