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
    <div className="flex h-full w-full overflow-hidden p-5 pl-0 pt-0">
      <aside className={cn('z-10 my-10 flex flex-col gap-2 transition-all', isCollapsed ? 'w-12' : 'w-44')}>
        {ROUTES.map((item) => {
          return <SidebarNavItem key={item.title} navItem={item} isCollapsed={isCollapsed} />
        })}
      </aside>

      <main
        className={cn(
          'custom-scrollbar-2 relative z-20 flex-1 overflow-hidden rounded-2xl border-2 bg-background transition-all'
        )}
      >
        {children}
      </main>
    </div>
  )
}
