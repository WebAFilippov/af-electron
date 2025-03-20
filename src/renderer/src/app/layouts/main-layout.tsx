import { sample } from 'effector'
import { createGate, useGate, useUnit } from 'effector-react'
import { Outlet } from 'react-router-dom'

import { Header } from '@widgets/header'
import { addListenerSidebarFx, removeListenerSidebarFx } from '@widgets/sidebar/model/sidebar'
import { Sidebar } from '@widgets/sidebar/ui/sidebar'
import { Topbar } from '@widgets/topbar'

import { addListenerDebugFx, removeListenerDebugFx } from '@entities/debug-mode/model/debug'
import { useDebugLayer } from '@entities/debug-mode/ui/use-debug-layer'
import { $isDarkTheme } from '@entities/theme/model/model'

import { cn } from '@shared/lib'
import { Particles } from '@shared/ui'

const Gate = createGate()
sample({
  clock: Gate.open,
  target: [addListenerSidebarFx, addListenerDebugFx]
})
sample({
  clock: Gate.close,
  target: [removeListenerSidebarFx, removeListenerDebugFx]
})

export const MainLayout = () => {
  useGate(Gate)
  const { ref } = useDebugLayer<HTMLDivElement>('app')
  const isDarkTheme = useUnit($isDarkTheme)

  return (
    <div
      ref={ref}
      className={cn(
        'relative m-0 box-border flex h-[100dvh] w-full flex-col overflow-hidden bg-background p-0 font-jetbrains font-normal text-foreground'
      )}
    >
      {/* Design Elements */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={300}
        ease={50}
        color={isDarkTheme ? '#ffffff' : '#000000'}
        refresh
      />

      <Topbar />

      <Header />

      <div className="relative flex h-full w-full overflow-hidden">
        <Sidebar />
        <main
          className={cn(
            'custom-scrollbar-2 relative flex-1 rounded-tl-2xl border-l border-t bg-background'
          )}
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}
