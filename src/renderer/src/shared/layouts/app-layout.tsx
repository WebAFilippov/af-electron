import { FC } from 'react'
import { Outlet } from 'react-router'

import { WindowHeader } from '@widgets/window-header/ui'

import { SidebarProvider } from '@shared/components/ui'
import { AppSidebar } from '@shared/components/ui/app-sidebar'

export const AppLayout: FC = () => {
  return (
    <SidebarProvider>
      <WindowHeader />
      <AppSidebar />
      <main className="h-screen flex-1 bg-sidebar-accent pb-2 pl-2 pt-10">
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
