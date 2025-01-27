import { Outlet } from 'react-router-dom'

import { Sidebar } from '@features/application/ui/Sidebar'
import { WindowHeader } from '@features/window-topbar/ui'

import { Toaster } from '@shared/components/ui'

export const ApplicationLayout = () => {
  return (
    <div className="relative m-0 box-border flex h-screen min-h-screen w-screen overflow-hidden pt-8 font-jetbrains text-base font-medium text-primary-foreground">
      {/* Absolut blocks */}
      <Toaster />
      <WindowHeader />
      {/* end absolut blocks */}

      <Sidebar />

      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  )
}
