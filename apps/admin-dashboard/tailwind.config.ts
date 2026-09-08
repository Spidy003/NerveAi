import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00C896",
        background: "#0D1117",
        sidebar: "#161B22",
        card: "#1C2128",
      },
    },
  },
  plugins: [],
};
export default config;
