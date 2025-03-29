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
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        brand: {
          DEFAULT: "hsl(var(--brand))",
          foreground: "hsl(var(--brand-foreground))",
          hover: "hsl(var(--brand-hover))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
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
        rainbow: {
          "0%": {
            "background-position": "0%",
          },
          "100%": {
            "background-position": "200%",
          },
        },
        pulse: {
          "0%, 100%": {
            boxShadow: "0 0 0 0 var(--pulse-color)",
          },
          "50%": {
            boxShadow: "0 0 0 4px var(--pulse-color)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        rainbow: "rainbow var(--speed, 2s) infinite linear",
        pulse: "pulse var(--duration) ease-out infinite",
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

        ".custom-scrollbar": {
          "scrollbar-gutter": "both-edges",
          "scrollbar-width": "auto",
          "scrollbar-color": "#e5e5e5 transparent",

          "&::-webkit-scrollbar": {
            width: "1rem",
            borderRadius: "0.5rem",
          },

          "&::-webkit-scrollbar-track": {
            background: "transparent",
            borderRadius: "0.5rem",
          },

          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#e5e5e5",
            borderRadius: "0.5rem",
            cursor: "grab",
            transition: "background-color 0.2s ease",

            "&:active": {
              cursor: "grabbing",
              backgroundColor: "#525252",
            },
          },

          "&:hover::-webkit-scrollbar-thumb": {
            backgroundColor: "#a3a3a3",
          },

          // Темная тема
          '&[data-theme="dark"]': {
            "scrollbar-color": "#404040 transparent",

            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#404040",

              "&:active": {
                backgroundColor: "#d4d4d4",
              },
            },

            "&:hover::-webkit-scrollbar-thumb": {
              backgroundColor: "#737373",
            },
          },
        },
      });
      addComponents({});
    }),
  ],
} satisfies Config;

export default config;
