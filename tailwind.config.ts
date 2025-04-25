import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class", "dark"],
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
    // Assurez-vous que les couleurs de base sont directement dans le thème et non dans extend
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000',
      white: '#fff',
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0D8496", // Couleur turquoise de votre logo
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#065964", // Version plus foncée pour les accents
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#30B4C8", // Version plus claire pour les accents
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
        sans: ["Aptos", "Arial", "sans-serif"],
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
      inset: {
        '0': '0',
        '1/2': '50%',
        'full': '100%',
        'auto': 'auto',
        '-full': '-100%',
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
