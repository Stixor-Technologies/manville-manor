import type { Config } from "tailwindcss";

const config: Config = {
  corePlugins: {
    container: false,
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-sand": "linear-gradient(90deg, #E5C39F66 0% ,#7F6C58 100%)",
      },

      screens: {
        xs: "430px",
        "min-aspect": { raw: "(min-aspect-ratio: 1/1)" },
      },

      colors: {
        primary: "#1A1A1A",
        secondary: "#E8CFB5",
        accent: "#74604B",
        white: "#ffffff",
        gray: "#929292",
        "dark-gray": "#282828",
        milk: "#F8F8F8",
        sand: "#877663",
      },

      fontFamily: {
        cormorant: ["var(--font-cormorant)"],
      },

      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(30)" },
          "50%": { transform: "translateY(-50px)" },
        },
      },
      animation: {
        float: "float 2.5s ease-in-out infinite",
      },

      // fontSize: {
      //   lg: ["4rem", "4.8rem"],
      //   title: ["3rem", "3.6rem"],
      //   subtitle: ["2.25rem", "0px"],
      //   "body-lg": ["1.375rem", "2.0625rem"],
      //   body: ["1rem", "0rem"],
      // },
    },
  },
  plugins: [
    function ({ addComponents }: any) {
      addComponents({
        ".container": {
          width: "100%",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          marginLeft: "auto",
          marginRight: "auto",
          "@screen sm": {
            maxWidth: "100%",
            paddingLeft: "2rem",
            paddingRight: "2rem",
          },
          "@screen md": {
            maxWidth: "100%",
          },
          "@screen lg": {
            maxWidth: "100%",
            paddingLeft: "2.625rem",
            paddingRight: "2.625rem",
          },
          "@screen xl": {
            maxWidth: "100%",
            paddingLeft: "2.5625rem",
            paddingRight: "2.5625rem",
          },
          "@screen 2xl": {
            maxWidth: "1536px",
          },
        },
      });
    },
  ],
};
export default config;
