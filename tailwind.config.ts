import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config = {
  darkMode: ['class'],
  content: ['./src/renderer/src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'rgba(var(--border))',
        input: 'hsla(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsla(var(--primary))',
          foreground: 'hsla(var(--primary-foreground))'
        },
        destructive: 'rgba(var(--destructive))',
        success: 'rgba(var(--success))',
        popover: 'hsl(var(--popover))',
        secondary: {
          DEFAULT: 'hsla(var(--secondary))',
          foreground: 'hsla(var(--secondary-foreground))'
        },
        // muted: {
        //   DEFAULT: 'hsl(var(--muted))',
        //   foreground: 'hsl(var(--muted-foreground))'
        // },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },

        // card: {
        //   DEFAULT: 'hsl(var(--card))',
        //   foreground: 'hsl(var(--card-foreground))'
        // },
        // topbar_controls_button_hovered: 'rgba(var(--topbar-controls-button-hovered))',
        // topbar_controls_button_close_hovered: 'rgba(var(--topbar-controls-button-close-hovered))',
        // topbar_controls_color: 'rgba(var(--topbar-color))',

        // opacity_card_bg: 'hsla(var(--opacity-card-bg))'
      },
      width: {
        sidebar_full_width: 'var(--sidebar-full-width)',
        sidebar_collpsed_width: 'var(--sidebar-collapsed-width)'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [
    require('tailwindcss-animate'),
    plugin(function ({ addUtilities, addComponents }) {
      addUtilities({
        '.area-drag': {
          '-webkit-app-region': 'drag'
        },
        '.area-no-drag': {
          '-webkit-app-region': 'no-drag'
        },
        '.user-select-none': {
          '-webkit-user-select': 'none',
          'user-select': 'none'
        }
      })
      addComponents({
        '.scrollbar': {
          '&::-webkit-scrollbar': {
            width: '8px'
          },
          '&::-webkit-scrollbar-track': {
            background: '#e0e0e0'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '10px',
            border: '2px solid #e0e0e0',
            opacity: '0',
            transition: 'opacity 0.3s ease'
          },
          '&.scrollbar-visible::-webkit-scrollbar-thumb': {
            opacity: '1'
          }
        }
      })
    })
  ]
} satisfies Config

export default config
