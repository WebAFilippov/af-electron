import { NavLink } from 'react-router-dom'

import { Route } from '@shared/config/routing'
import { cn } from '@shared/lib'

interface SidebarNavItemProps {
  navItem: Route
  isCollapsed: boolean
}

export const SidebarNavItem = ({ navItem, isCollapsed }: SidebarNavItemProps): JSX.Element => {
  return (
    <NavLink to={navItem.path} key={navItem.title}>
      {({ isActive }) => (
        <div
          className={cn(
            'relative flex select-none items-center justify-start gap-2 overflow-hidden border-y border-border bg-background p-3 text-lg leading-none text-foreground shadow-md transition-colors dark:shadow-white/10',
            isActive && 'border-primary bg-primary text-background',
            !isActive && 'hover:bg-muted'
          )}
        >
          <div
            className={cn('flex h-6 w-6 items-center justify-center overflow-hidden duration-0')}
          >
            {navItem.icon}
          </div>
          <span
            className={cn(
              'absolute left-11 transition-opacity',
              !isCollapsed ? 'opacity-100' : 'opacity-0'
            )}
          >
            {navItem.title}
          </span>
        </div>
      )}
    </NavLink>
  )
}
