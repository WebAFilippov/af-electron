import { RouterProvider } from 'atomic-router-react'
import { sample } from 'effector'
import { createGate, useGate } from 'effector-react'

import { Pages } from '@pages/index'

import { Sidebar } from '@widgets/sidebar/ui/sidebar'
import { Topbar } from '@widgets/topbar'

import { addListenerWindowFx, removeListenerWindowFx } from '@features/application'
import { addListenerSidebarFx, getSidebarItemsFx, removeListenerSidebarFx } from '@features/sidebar'

import { removeListenerDebugFx } from '@entities/debug-mode/model/debug'
import { useDebugLayer } from '@entities/debug-mode/ui/use-debug-layer'

import { router } from '@shared/config/routing'
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
  const { ref } = useDebugLayer<HTMLDivElement>('app')

  useGate(Gate)

  return (
    <div
      ref={ref}
      className={cn(
        'relative m-0 box-border flex h-[100dvh] w-full flex-col border border-dashed border-primary p-0 font-jetbrains font-medium text-primary-foreground'
      )}
    >
      <Topbar />

      <div className="relative flex h-full w-full overflow-hidden">
        <Sidebar />
        <main
          className={cn(
            'overflow-y-auto" wallpaper custom-scrollbar-2 relative grow overflow-y-auto'
          )}
        >
          <RouterProvider router={router}>
            <Pages />
          </RouterProvider>
        </main>
      </div>
    </div>
  )
}
