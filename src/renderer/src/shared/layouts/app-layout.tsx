import { FC, PropsWithChildren, useEffect, useState } from 'react'

import { WindowHeader } from '@widgets/window-header'

import AutoComplete from '@features/auto-complite'

import { SidebarProvider } from '@shared/components/ui'
import { AppSidebar } from '@shared/components/ui/app-sidebar'

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  const [device, setDevice] = useState({ id: '', name: '', volume: 0, muted: true })

  useEffect(() => {
    window.api.sendDevice((device) => {
      console.log(device)
      setDevice(device)
    })
  }, [])
  return (
    <SidebarProvider>
      <WindowHeader />
      <AppSidebar />
      <main className="mt-10 flex-1 bg-background">
        {children}
        {device.id && (
          <>
            <p>ID: {device.id}</p>
            <p>Name: {device.name}</p>
            <p>Volume: {device.volume}</p>
            <p>Muted: {device.muted ? 'muted' : 'unmuted'}</p>
            <br />
            <AutoComplete />
          </>
        )}
      </main>
    </SidebarProvider>
  )
}
