import { useGate, useUnit } from 'effector-react'
import { FC, PropsWithChildren } from 'react'

import { ROUTES } from '@shared/config/routing'
import { cn } from '@shared/lib'

import { $isCollapsedSidebar, SidebarGate } from '../model/sidebar'
import { SidebarNavItem } from './sidebar-nav-item'

export const Sidebar: FC<PropsWithChildren> = ({ children }) => {
  useGate(SidebarGate)
  const isCollapsed = useUnit($isCollapsedSidebar)

  return (
    <div className="flex h-full w-full overflow-hidden pb-5 pr-5">
      <aside
        className={cn(
          'z-10 flex flex-col gap-2 overflow-hidden py-10 transition-colors duration-0',
          isCollapsed ? 'w-12' : 'w-40'
        )}
      >
        {ROUTES.map((item) => {
          return <SidebarNavItem key={item.title} navItem={item} isCollapsed={isCollapsed} />
        })}
      </aside>

      <main
        className={cn(
          'relative z-20 flex-1 overflow-hidden rounded-2xl border-2 bg-background shadow-lg shadow-black/10 custom-scrollbar dark:shadow-white/10'
        )}
      >
        {children}
      </main>
    </div>
  )
}
