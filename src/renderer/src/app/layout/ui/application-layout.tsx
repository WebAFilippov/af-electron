import { FC, useState } from 'react'
import { Outlet } from 'react-router-dom'

import { ModeToggle } from '@features/theme-mode'
import { WindowControls } from '@features/window-control/ui'

import { cn } from '@shared/lib/utils'

export const ApplicationLayout: FC = () => {
  const [isCollapse] = useState(false)

  return (
    <div className="relative flex h-screen min-h-screen gap-3 overflow-hidden bg-background p-8 pb-3 pl-2 pr-3 text-red-600">
      <header
        className="absolute right-0 top-0 z-[700] flex h-8 w-full items-center justify-end gap-3 area-drag"
        id="topbar"
      >
        <ModeToggle className="area-no-drag" />
        <WindowControls />
      </header>

      <aside
        className={cn(
          'justify-s -mt-6 flex w-full flex-col items-start gap-2 break-words',
          isCollapse ? 'w-[72px]' : 'w-[204px]'
        )}
        id="sidebar"
      >
        <div>header sidebar</div>
        <nav className="flex-1 overflow-auto">
          <div>sidebar content</div>
          <div>sidebar content</div>
          <div>sidebar content</div>
          <div>sidebar content</div>
          <div>sidebar content</div>
          <div>sidebar content</div>
          <div>sidebar content</div>
          <div>sidebar content</div>
        </nav>
        <div>footer sidebar</div>
      </aside>
      <main
        className="h-full flex-1 rounded-xl border border-border bg-foreground p-2"
        id="content"
      >
        <Outlet />
      </main>
    </div>
  )
}
