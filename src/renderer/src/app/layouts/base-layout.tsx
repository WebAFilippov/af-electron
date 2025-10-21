import { Sidebar } from '@widgets/sidebar'
import { WindowFrame } from '@widgets/window-frame'
import { Outlet } from 'react-router-dom'

export const Baselayout = () => {
  return (
    <div className="flex flex-col h-screen w-screen font-sans bg-background">
      {/* <Toaster position="top-right" offset={{ right: 20, top: 60 }} /> */}
      <WindowFrame />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
