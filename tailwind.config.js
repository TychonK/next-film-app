/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        xxl: "14rem",
      },
      zIndex: {
        2: "2",
        5: "5",
      },
      maxWidth: {
        "2xs": "300px",
        "3xs": "280px",
        "4xs": "260px",
        "5xs": "120px",
      },
      minWidth: {
        "4xs": "260px",
      },
      spacing: {
        "card/sm": "160px",
        card: "260px",
        slider: "500px",
      },
      minHeight: {
        default: "500px",
      },
      transitionDuration: {
        1500: "1500ms",
        2000: "2000ms",
      },
    },
  },
  plugins: [],
};
