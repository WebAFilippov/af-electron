import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config = {
  darkMode: ["class"],
  content: ["./src/renderer/src/**/*.{ts,tsx}"],
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
      backdropBlur: {
        sm: "2px",
        DEFAULT: "4px",
        md: "6px",
        lg: "8px",
        xl: "12px",
        "2xl": "16px",
      },
      fontFamily: {
        jetbrains: ["JetBrains Mono"],
        pacifico: ["Pacifico", "cursive"],
      },
      colors: {
        "color-1": "hsl(var(--color-1))",
        "color-2": "hsl(var(--color-2))",
        "color-3": "hsl(var(--color-3))",
        "color-4": "hsl(var(--color-4))",
        "color-5": "hsl(var(--color-5))",
        border: "rgba(var(--border))",
        input: "hsla(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        destructive: "hsl(var(--destructive))",
        success: "rgba(var(--success))",
        popover: "hsl(var(--popover))",
        secondary: {
          DEFAULT: "hsla(var(--secondary))",
          foreground: "hsla(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      width: {
        sidebar_full_width: "var(--sidebar-full-width)",
        sidebar_collpsed_width: "var(--sidebar-collapsed-width)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "aurora-border": {
          "0%, 100%": { borderRadius: "37% 29% 27% 27% / 28% 25% 41% 37%" },
          "25%": { borderRadius: "47% 29% 39% 49% / 61% 19% 66% 26%" },
          "50%": { borderRadius: "57% 23% 47% 72% / 63% 17% 66% 33%" },
          "75%": { borderRadius: "28% 49% 29% 100% / 93% 20% 64% 25%" },
        },
        "aurora-1": {
          "0%, 100%": { top: "0", right: "0" },
          "50%": { top: "50%", right: "25%" },
          "75%": { top: "25%", right: "50%" },
        },
        "aurora-2": {
          "0%, 100%": { top: "0", left: "0" },
          "60%": { top: "75%", left: "25%" },
          "85%": { top: "50%", left: "50%" },
        },
        "aurora-3": {
          "0%, 100%": { bottom: "0", left: "0" },
          "40%": { bottom: "50%", left: "25%" },
          "65%": { bottom: "25%", left: "50%" },
        },
        "aurora-4": {
          "0%, 100%": { bottom: "0", right: "0" },
          "50%": { bottom: "25%", right: "40%" },
          "90%": { bottom: "50%", right: "25%" },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee 10s linear infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addUtilities, addComponents }) {
      addUtilities({
        ".area-drag": {
          "-webkit-app-region": "drag",
        },
        ".area-no-drag": {
          "-webkit-app-region": "no-drag",
        },
        ".user-select-none": {
          "-webkit-user-select": "none",
          "user-select": "none",
        },
      });
      addComponents({
        ".custom-scrollbar": {
          "scrollbar-gutter": "stable",

          "&::-webkit-scrollbar": {
            width: "0.3rem",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "transparent",
            borderRadius: "10px",
            cursor: "grab",
          },
          "&::-webkit-scrollbar-thumb:active": {
            cursor: "grabbing",
          },
          "&:hover::-webkit-scrollbar-thumb": {
            backgroundColor: "hsl(var(--primary))",
          },
        },
        ".custom-scrollbar-2": {
          "scrollbar-gutter": "stable",

          "&::-webkit-scrollbar": {
            width: ".6rem",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "transparent",
            borderRadius: "10px",
            cursor: "grab",
          },
          "&::-webkit-scrollbar-thumb:active": {
            cursor: "grabbing",
          },
          "&:hover::-webkit-scrollbar-thumb": {
            backgroundColor: "hsl(var(--primary))",
          },
        },
        ".debug-widgets": {
  border: '0.1rem solid #DAF8DF'
},
      });
    }),
  ],
} satisfies Config;

export default config;
