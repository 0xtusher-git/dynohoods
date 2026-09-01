import type { Config } from "tailwindcss";
import { themeColors, fontFamilies } from "./lib/theme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ...themeColors,
      },
      fontFamily: {
        ...fontFamilies,
      },
      boxShadow: {
        card: "inset 0 1px 0 0 rgba(255,255,255,0.06), 0 1px 2px rgba(0,0,0,0.4)",
        glow: "0 0 24px rgba(64, 224, 192, 0.18)",
      },
      keyframes: {
        "fog-drift": {
          "0%": { transform: "translateX(-16%)" },
          "100%": { transform: "translateX(16%)" },
        },
      },
      animation: {
        "fog-drift": "fog-drift 40s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};
export default config;
