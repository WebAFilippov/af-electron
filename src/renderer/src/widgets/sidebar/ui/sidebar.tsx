import { $sidebar, GateSidebar } from '../model/sidebar.model'
import { NavItems } from '@shared/config/constants'
import { cn } from '@shared/lib'
import { Separator, Tooltip, TooltipContent, TooltipTrigger } from '@shared/ui'
import { ThemeToggler } from '@shared/ui/theme-toggler'
import { useGate, useUnit } from 'effector-react'
import { FC } from 'react'
import { NavLink } from 'react-router-dom'

export const Sidebar: FC = () => {
  useGate(GateSidebar)
  const isOpen = useUnit($sidebar)

  return (
    <aside
      className={cn(
        'relative z-10 flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border py-2',
        isOpen ? 'w-56' : 'w-16'
      )}
    >
      <div className="flex-1 p-2 flex flex-col gap-3">
        {NavItems.map((item, index) => {
          const link = (
            <NavLink
              to={item.path}
              key={item.title + index}
              data-open={isOpen}
              className={cn(
                'flex flex-col h-fit gap-1 items-center justify-center bg-transparent rounded-sm p-2 text-sidebar-foreground/80 hover:text-sidebar-accent-foreground hover:bg-sidebar-border [&[aria-current="page"]]:bg-accent [&[aria-current="page"]]:text-accent-foreground'
              )}
            >
              {item.icon}
              {isOpen && (
                <span className="text-center text-sm font-medium whitespace-normal">
                  {item.description}
                </span>
              )}
            </NavLink>
          )

          // Если панель открыта — тултип не нужен
          return !isOpen ? (
            <Tooltip key={item.title} delayDuration={500}>
              <TooltipTrigger asChild>{link}</TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                {item.description}
              </TooltipContent>
            </Tooltip>
          ) : (
            link
          )
        })}
      </div>

      <div className="w-full">
        <Separator orientation="horizontal" className="mx-auto my-2 w-4/5" />
        <div className="p-2">
          <ThemeToggler />
        </div>
      </div>
    </aside>
  )
}
