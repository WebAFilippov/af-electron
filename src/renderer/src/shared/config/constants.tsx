import { HandMetal } from 'lucide-react'
import { Settings } from 'lucide-react'

export const SIDEBAR_KEYBOARD_SHORTCUT = ['B', 'b', 'И', 'и']

export const NavItems = [
  {
    id: 'ambilight',
    path: '/',
    title: 'Ambilight Setup',
    icon: <HandMetal size={28} strokeWidth={1.5}/>,
    description: "Амбилент подсветка"
  },
  {
    id: 'settings',
    path: '/settings',
    title: 'Settings',
    icon: <Settings size={28} strokeWidth={1.5}/>,
    description: "Настройки"
  }
]
