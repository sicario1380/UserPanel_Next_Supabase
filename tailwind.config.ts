import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        background: "#9ae6fb",
        navbarBackground: "#2caac0",
      },
    },
  },
  plugins: [],
};

export default config;
