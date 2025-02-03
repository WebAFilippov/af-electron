import { sample } from 'effector'
import { createGate, useGate } from 'effector-react'
import { Outlet } from 'react-router-dom'

import { addListenerWindowFx, removeListenerWindowFx } from '@features/application'
import { addListenerSidebarFx, removeListenerSidebarFx, Sidebar } from '@features/sidebar'
import { WindowHeader } from '@features/window-topbar/ui'

import { Toaster } from '@shared/components/ui'
import { cn } from '@shared/lib'

const Gate = createGate()
sample({
  clock: Gate.open,
  target: [addListenerSidebarFx, addListenerWindowFx]
})
sample({
  clock: Gate.close,
  target: [removeListenerSidebarFx, removeListenerWindowFx]
})

export const Layout = () => {
  useGate(Gate)

  return (
    <div className="relative m-0 p-0 flex h-[100dvh] w-full flex-col font-jetbrains font-medium text-primary-foreground">
      <Toaster />

      <WindowHeader />

      <div className="relative flex h-[calc(100%_-_2em)] w-full overflow-hidden">
        <Sidebar />

        <main className={cn('overflow-y-auto" relative grow bg-background overflow-y-auto custom-scrollbar-2')}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
