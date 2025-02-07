import { useUnit } from 'effector-react'

import { DebugWrapper } from '@entities/debug-mode/ui/DebugWrapper'

import { cn } from '@shared/lib'

import { $sidebar } from '../model/sidebar'
import { SidebarNav } from './SidebarNav/sidebar-nav'

export const Sidebar = () => {
  const isOpenSidebar = useUnit($sidebar)

  return (
    <aside
      id="navigation_sidebar"
      className={cn(
        'wallpaper transition-[width, height] relative z-10 flex h-full flex-col border-r border-dashed border-primary duration-300',
        isOpenSidebar ? 'w-[15rem]' : 'w-[5rem]'
      )}
    >
      <DebugWrapper layer="features" />

      <div
        id="header_sidebar"
        className="relative h-[4rem] border-b border-dashed border-primary bg-background"
      >
        header
      </div>

      <SidebarNav />

      <div
        id="footer_sidebar"
        className="h-[3rem] border-t border-dashed border-primary bg-background"
      >
        footer
      </div>
    </aside>
  )
}
