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
