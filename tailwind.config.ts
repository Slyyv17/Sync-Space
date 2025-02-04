import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        foreground: "#000000",
        // bgClr: "#EBE6DD",
        mainClr: "#FFFFFF",
        secClr: "#131414",
        btnClr: "#587638",
        indicateClr: "#E8F09B",
        shadow: "#EEEEEE",
        greyClr: "#333333",
      },
      fontFamily: {
        pryClr: ["Satoshi", "sans-serif"],
      }
    },
  },
  plugins: [],
} satisfies Config;
