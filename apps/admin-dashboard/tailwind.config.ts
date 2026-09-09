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
        neu: {
          bg: "#E6ECF5",
          surface: "#E6ECF5",
          dark: "#C5D0E0",
          light: "#FFFFFF",
          slate: "#718096",
          heading: "#1E293B",
          body: "#475569",
          muted: "#94A3B8",
        },
        primary: {
          DEFAULT: "#2563EB",
          hover: "#1D4ED8",
          light: "#3B82F6",
          dark: "#1E40AF",
          glow: "rgba(37, 99, 235, 0.35)",
        },
        background: "#E6ECF5",
        sidebar: "#E6ECF5",
        card: "#E6ECF5",
      },
      boxShadow: {
        "neu-raised": "8px 8px 18px #C5D0E0, -8px -8px 18px #FFFFFF",
        "neu-raised-sm": "4px 4px 10px #C8D4E4, -4px -4px 10px #FFFFFF",
        "neu-raised-lg": "14px 14px 28px #BAC6D8, -14px -14px 28px #FFFFFF",
        "neu-inset": "inset 3px 3px 6px #C5D0E0, inset -3px -3px 6px #FFFFFF",
        "neu-inset-deep": "inset 4px 4px 8px #B8C4D6, inset -4px -4px 8px #FFFFFF",
        "neu-btn": "5px 5px 12px #C5D0E0, -5px -5px 12px #FFFFFF",
        "neu-btn-sm": "3px 3px 8px #C8D4E4, -3px -3px 8px #FFFFFF",
        "neu-btn-active": "inset 3px 3px 6px #C5D0E0, inset -3px -3px 6px #FFFFFF",
        "neu-primary": "0 8px 20px rgba(37, 99, 235, 0.35)",
        "neu-icon": "4px 4px 10px #C5D0E0, -4px -4px 10px #FFFFFF",
      },
      borderRadius: {
        "2.5xl": "1.25rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
export default config;

