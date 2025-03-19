import { useUnit } from 'effector-react'
import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import { useDebugLayer } from '@entities/debug-mode/ui/use-debug-layer'

import { ROUTES } from '@shared/config/routing'
import { cn } from '@shared/lib'

import { $sidebar } from '../model/sidebar'

export const Sidebar: FC = () => {
  const isOpen = useUnit($sidebar)
  const { ref } = useDebugLayer<HTMLDivElement>('widgets')

  return (
    <aside
      ref={ref}
      className={cn(
        'transition-[width, height] relative z-10 flex flex-col gap-2 pt-4 duration-300',
        isOpen ? 'w-44' : 'w-12'
      )}
    >
      {ROUTES.map((item) => {
        return (
          <NavLink
            to={item.path}
            key={item.title}
            className={({ isActive }) =>
              cn(
                'flex select-none items-center gap-3 overflow-hidden border-b border-t border-input shadow-sm ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                isOpen ? 'px-3 py-3' : 'px-3 py-3',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background text-foreground hover:bg-accent hover:text-accent-foreground'
              )
            }
          >
            <div className="flex h-6 w-6 items-center justify-center">{item.icon}</div>
            <span
              className={cn(
                'flex-1 text-lg font-normal leading-none transition-opacity duration-300',
                isOpen ? 'opacity-100' : 'opacity-0'
              )}
            >
              {item.title}
            </span>
          </NavLink>
        )
      })}
    </aside>
  )
}
