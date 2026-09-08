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
        background: "#07090C",
        "nerve-bg": "#0B0F14",
        "nerve-surface": "#121820",
        "nerve-border": "#1E2633",
        cyan: {
          DEFAULT: "#2DE1C2",
          glow: "#00D9B5",
          dark: "#0a5246",
        },
        violet: {
          DEFAULT: "#6C5CE7",
          glow: "#7B61FF",
        },
        alert: {
          DEFAULT: "#FF5D5D",
          glow: "#FF3366",
        },
        primary: {
          DEFAULT: "#2DE1C2",
          hover: "#00D9B5"
        },
        card: {
          DEFAULT: "#0F141C",
          border: "#1E2633"
        },
      },
      fontFamily: {
        cyber: ["var(--font-orbitron)", "sans-serif"],
        display: ["var(--font-orbitron)", "var(--font-space-grotesk)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      boxShadow: {
        "glow-cyan": "0 0 35px -5px rgba(45, 225, 194, 0.35)",
        "glow-cyan-sm": "0 0 15px -3px rgba(45, 225, 194, 0.4)",
        "glow-cyan-lg": "0 0 60px 10px rgba(45, 225, 194, 0.25)",
        "glow-violet": "0 0 35px -5px rgba(108, 92, 231, 0.4)",
        "glow-alert": "0 0 30px -5px rgba(255, 93, 93, 0.4)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 20s linear infinite",
        "drift": "drift 30s linear infinite",
      },
      keyframes: {
        drift: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        }
      }
    },
  },
  plugins: [],
};
export default config;
