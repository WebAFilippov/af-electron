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
    <div className="flex h-full w-full overflow-hidden pr-5 pb-5">
      <aside className={cn('z-10 py-10 flex flex-col gap-2 transition-all overflow-hidden' , isCollapsed ? 'w-12' : 'w-40')}>
        {ROUTES.map((item) => {
          return <SidebarNavItem key={item.title} navItem={item} isCollapsed={isCollapsed} />
        })}
      </aside>

      <main
        className={cn(
          'custom-scrollbar relative z-20 flex-1 overflow-hidden rounded-2xl border-2 bg-background transition-all shadow-lg dark:shadow-white/10 shadow-black/10'
        )}
      >
        {children}
      </main>
    </div>
  )
}
