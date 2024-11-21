import { useState } from 'react'

import { cn } from '@shared/lib/utils'

type Props = {
  window_header?: React.ReactNode
  window_sidebar?: React.ReactNode
  children?: React.ReactNode
}
export const WindowLayout = ({ window_header, window_sidebar, children }: Props) => {
  const [openSiderbar, setOpenSidebar] = useState(false)

  return (
    <main className="bg-background max-h-screen h-screen w-screen">
      {window_header}
      <div className="p-3 pt-8 h-screen flex gap-3">
        {/* Sidebar */}
        <div
          className={cn(
            openSiderbar ? 'w-[200px]' : 'w-[72px]',
            'bg-background rounded-sm transition-[width] duration-300'
          )}
        >
          <div>
            <span>logo</span>
            <button onClick={() => setOpenSidebar(!openSiderbar)}>+</button>
          </div>
          <div>{window_sidebar}sidebar</div>
        </div>
        {/* Content */}
        <div className="bg-foreground text-black rounded-sm flex-1 overflow-y-auto overflow-x-hidden scrollbar">
          <div>{children}</div>
        </div>
      </div>
    </main>
  )
}
