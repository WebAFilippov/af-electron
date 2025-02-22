import { sample } from 'effector'
import { createGate, useGate, useUnit } from 'effector-react'
import { FC, PropsWithChildren } from 'react'

import { Header } from '@widgets/header'
import { addListenerSidebarFx, removeListenerSidebarFx } from '@widgets/sidebar/model/sidebar'
import { Sidebar } from '@widgets/sidebar/ui/sidebar'
import { Topbar } from '@widgets/topbar'

import { addListenerWindowFx, removeListenerWindowFx } from '@features/application'

import { addListenerDebugFx, removeListenerDebugFx } from '@entities/debug-mode/model/debug'
import { useDebugLayer } from '@entities/debug-mode/ui/use-debug-layer'
import { $isDarkTheme, $theme } from '@entities/theme/model/model'

import { cn } from '@shared/lib'
import { Particles } from '@shared/ui'

const Gate = createGate()
sample({
  clock: Gate.open,
  target: [addListenerWindowFx, addListenerSidebarFx, addListenerDebugFx]
})
sample({
  clock: Gate.close,
  target: [removeListenerWindowFx, removeListenerSidebarFx, removeListenerDebugFx]
})

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { ref } = useDebugLayer<HTMLDivElement>('app')
  const isDarkTheme = useUnit($isDarkTheme)

  useGate(Gate)

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
            'custom-scrollbar-2 relative m-2 ml-0 mt-0 grow overflow-y-auto rounded-2xl border border-t p-4'
          )}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
