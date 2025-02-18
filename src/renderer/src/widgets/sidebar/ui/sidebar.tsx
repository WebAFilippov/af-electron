import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'
import { FC } from 'react'

import { useDebugLayer } from '@entities/debug-mode/ui/use-debug-layer'

import { Settings, Thermometer } from '@shared/assets/svg-icons'
import { routes } from '@shared/config/routing'
import { cn } from '@shared/lib'

import { $sidebar } from '../model/sidebar'

const navItems = [
  { title: 'Weather', icon: <Thermometer />, link: routes.weather },
  { title: 'Settings', icon: <Settings />, link: routes.settings }
]

export const Sidebar: FC = () => {
  const isOpen = useUnit($sidebar)
  const { ref } = useDebugLayer<HTMLDivElement>('widgets')

  return (
    <aside
      ref={ref}
      className={cn(
        'transition-[width, height] relative z-10 flex flex-col gap-4 p-4 duration-300',
        isOpen ? 'w-[15rem]' : 'w-[5rem]'
      )}
    >
      {navItems.map((item) => {
        return (
          <Link
            to={item.link}
            key={item.title}
            className="flex select-none items-center gap-2 overflow-hidden rounded-xl border border-input p-2 text-lg font-medium ring-offset-background transition-colors duration-300 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-12"
            activeClassName="bg-accent text-accent-foreground"
            inactiveClassName="bg-background text-foreground"
          >
            <div>{item.icon}</div>
            <span>{item.title}</span>
          </Link>
        )
      })}
    </aside>
  )
}
