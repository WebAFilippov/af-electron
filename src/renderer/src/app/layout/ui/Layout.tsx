import { sample } from 'effector'
import { createGate, useGate } from 'effector-react'
import { Outlet } from 'react-router-dom'

import { addListenerWindowFx, removeListenerWindowFx } from '@features/application'
import {
  addListenerSidebarFx,
  getSidebarItemsFx,
  removeListenerSidebarFx,
  Sidebar
} from '@features/sidebar'
import { WindowHeader } from '@features/window-topbar/ui'

import { removeListenerDebugFx } from '@entities/debug-mode/model/debug'
import { DebugWrapper } from '@entities/debug-mode/ui/DebugWrapper'

import { Toaster } from '@shared/components/ui'
import { cn } from '@shared/lib'

const Gate = createGate()
sample({
  clock: Gate.open,
  target: [addListenerSidebarFx, addListenerWindowFx, getSidebarItemsFx]
})
sample({
  clock: Gate.close,
  target: [removeListenerSidebarFx, removeListenerWindowFx, removeListenerDebugFx]
})

export const Layout = () => {
  useGate(Gate)

  return (
    <div
      className={cn(
        'relative m-0 box-border flex h-[100dvh] w-full flex-col p-0 font-jetbrains font-medium text-primary-foreground'
      )}
    >
      <DebugWrapper layer="app" />
      <Toaster />

      <WindowHeader />

      <div className="relative flex h-full w-full overflow-hidden">
        <Sidebar />

        <main
          className={cn(
            'overflow-y-auto" wallpaper custom-scrollbar-2 relative grow overflow-y-auto'
          )}
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}
