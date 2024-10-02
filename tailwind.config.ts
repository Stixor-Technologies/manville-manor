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

      colors: {
        primary: "#1A1A1A",
        secondary: "#E8CFB5",
        accent: "#74604B",
        white: "#ffffff",
        gray: "#929292",
        "dark-gray": "#282828",
        sand: "#877663",
      },

      fontFamily: {
        cormorant: ["var(--font-cormorant)"],
      },

      fontSize: {
        hero: ["4rem", "4.8rem"],
        title: ["3rem", "3.6rem"],
        subtitle: ["2.25rem", "0px"],
        "body-lg": ["1.375rem", "2.0625rem"],
        body: ["1rem", "0rem"],
      },
    },
  },
  plugins: [
    function ({ addComponents }: any) {
      addComponents({
        ".container": {
          width: "100%",
          paddingLeft: "1rem",
          paddingRight: "1rem",
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
            paddingLeft: "5.9375rem",
            paddingRight: "5.9375rem",
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
