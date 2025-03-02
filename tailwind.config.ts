
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2A5674", // Bleu pétrole plus foncé
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#5A8A8B", // Bleu-vert plus intense
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#8BB8B8", // Bleu pastel plus intense
          foreground: "#333333",
        },
        highlight: {
          DEFAULT: "#EAE5C7", // Crème plus prononcé
          foreground: "#333333",
        },
        section: {
          light: "#F0F7FA", // Fond clair pour les sections
          dark: "#E5EFF3", // Fond légèrement plus foncé pour alterner
          accent: "#DCEEF5", // Fond avec une touche d'accent
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        serif: ["Lora", "serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        "scale-in": {
          "0%": {
            transform: "scale(0.95)",
            opacity: "0",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        "pulse-gentle": {
          "0%, 100%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.03)",
          },
        },
        "button-press": {
          "0%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(0.95)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "pulse-gentle": "pulse-gentle 2.5s ease-in-out infinite",
        "button-press": "button-press 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
