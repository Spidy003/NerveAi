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
        background: "#E6ECF5",
        "neu-bg": "#E6ECF5",
        "neu-dark": "#C5D0E0",
        "neu-light": "#FFFFFF",
        "neu-accent": "#2563EB",
        "neu-blue": "#2563EB",
        "neu-blue-dark": "#1D4ED8",
        "neu-text": "#1E293B",
        "neu-text-muted": "#64748B",
        "nerve-bg": "#E6ECF5",
        "nerve-surface": "#E6ECF5",
        "nerve-border": "#C5D0E0",
        cyan: {
          DEFAULT: "#2563EB",
          glow: "#3B82F6",
          dark: "#1D4ED8",
        },
        violet: {
          DEFAULT: "#4F46E5",
          glow: "#6366F1",
        },
        alert: {
          DEFAULT: "#EF4444",
          glow: "#F87171",
        },
        primary: {
          DEFAULT: "#2563EB",
          hover: "#1D4ED8"
        },
        card: {
          DEFAULT: "#E6ECF5",
          border: "#C5D0E0"
        },
      },
      fontFamily: {
        cyber: ["var(--font-space-grotesk)", "sans-serif"],
        display: ["var(--font-inter)", "sans-serif"],
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      boxShadow: {
        "neu-flat": "8px 8px 18px #C5D0E0, -8px -8px 18px #FFFFFF",
        "neu-flat-lg": "14px 14px 28px #BAC6D8, -14px -14px 28px #FFFFFF",
        "neu-flat-sm": "4px 4px 10px #C8D4E4, -4px -4px 10px #FFFFFF",
        "neu-inset": "inset 3px 3px 6px #C5D0E0, inset -3px -3px 6px #FFFFFF",
        "neu-inset-deep": "inset 5px 5px 10px #B8C4D6, inset -5px -5px 10px #FFFFFF",
        "neu-btn": "5px 5px 12px #C5D0E0, -5px -5px 12px #FFFFFF",
        "neu-primary": "0 8px 20px rgba(37, 99, 235, 0.38), inset 0 1px 1px rgba(255, 255, 255, 0.3)",
        "glow-cyan": "0 0 25px -3px rgba(37, 99, 235, 0.35)",
        "glow-cyan-sm": "0 0 12px -2px rgba(37, 99, 235, 0.4)",
        "glow-cyan-lg": "0 0 45px 8px rgba(37, 99, 235, 0.25)",
        "glow-violet": "0 0 25px -3px rgba(79, 70, 229, 0.4)",
        "glow-alert": "0 0 20px -3px rgba(239, 68, 68, 0.4)",
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
        "4xl": "32px",
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
