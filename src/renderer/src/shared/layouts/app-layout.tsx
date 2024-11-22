import { FC, PropsWithChildren } from 'react'

import { WindowHeader } from '@widgets/window-header'

import { SidebarProvider } from '@shared/components/ui'
import { AppSidebar } from '@shared/components/ui/app-sidebar'

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SidebarProvider>
      <WindowHeader />
      <AppSidebar />
      <main className="flex-1 bg-background">
        {children}
        {/* {'children'.repeat(1000)} */}
      </main>
    </SidebarProvider>
  )
}
