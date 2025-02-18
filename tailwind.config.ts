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
        background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
      },
      borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
      keyframes: {    
        meteor: {
          "0%": {
            transform: "rotate(var(--angle)) translateX(0)",
            opacity: "1",
          },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(var(--angle)) translateX(-500px)",
            opacity: "0",
          },
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
        rainbow: {
          "0%": { "background-position": "0%" },
          "100%": { "background-position": "200%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "meteor": "meteor 5s linear infinite",
        rainbow: "rainbow var(--speed, 2s) infinite linear",
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
            borderRadius: "none",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "transparent",
            borderRadius: "none",
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
