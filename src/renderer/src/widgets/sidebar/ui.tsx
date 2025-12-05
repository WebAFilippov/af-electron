import { $sidebar, GateSidebar } from './model.ts.js'
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
import { is } from 'effector'
import { useGate, useUnit } from 'effector-react'
import { FC, Fragment } from 'react'
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
      <div className="flex-1 px-2 flex flex-col gap-3 justify-start items-center">
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
                        'select-none w-full py-2 border',
                        isActive && 'border-primary',
                        isOpen && 'h-fit'
                      )}
                    >
                      {item.icon}
                      {isOpen && (
                        <span className="text-center text-balance text-base font-medium  w-full">
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

      <div className="w-full relative pt-2 px-2">
        <Separator
          orientation="horizontal"
          className={cn('absolute top-0 left-1.5 !w-13', isOpen && '!w-53')}
        />
        <ThemeToggler />
      </div>
    </aside>
  )
}
