import { $sidebar, GateSidebar } from '../model.ts.js'
import { NavItems } from '@shared/config/constants'
import { cn } from '@shared/lib'
import {
  Button,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@shared/ui'
import { ThemeToggler } from '@shared/ui/theme-toggler'
import { useGate, useUnit } from 'effector-react'
import { FC, Fragment } from 'react'
import { NavLink } from 'react-router-dom'

export const AppSidebar: FC = () => {
  useGate(GateSidebar)
  const isOpen = useUnit($sidebar)

  return (
    <aside
      className={cn(
        'bg-sidebar text-sidebar-foreground border-sidebar-border relative z-10 flex flex-col border-r py-2',
        isOpen ? 'w-56' : 'w-16'
      )}
    >
      <div className="flex flex-1 flex-col items-center justify-start gap-3 px-2">
        {NavItems.map((item) => {
          const link = (
            <NavLink
              to={item.path}
              key={item.id}
              className="w-full"
              draggable={false}
            >
              {({ isActive }) => {
                return (
                  <Fragment>
                    <Button
                      slot="span"
                      size={isOpen ? 'xl' : 'icon-xl'}
                      variant={isActive ? 'default' : 'outline'}
                      className={cn(
                        'w-full border py-2 select-none',
                        isActive && 'border-primary',
                        isOpen && 'h-fit'
                      )}
                    >
                      {item.icon}
                      {isOpen && (
                        <span className="w-full text-center text-base font-medium text-balance">
                          {item.description}
                        </span>
                      )}
                    </Button>
                  </Fragment>
                )
              }}
            </NavLink>
          )

          // Если панель открыта — тултип не нужен
          return !isOpen ? (
            <Tooltip key={item.title} delayDuration={500}>
              <TooltipTrigger tabIndex={-1} asChild>
                {link}
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                {item.description}
              </TooltipContent>
            </Tooltip>
          ) : (
            link
          )
        })}
      </div>

      <div className="relative w-full px-2 pt-2">
        <Separator
          orientation="horizontal"
          className={cn('absolute top-0 left-1.5 !w-13', isOpen && '!w-53')}
        />
        <ThemeToggler />
      </div>
    </aside>
  )
}
