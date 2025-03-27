import { useGate, useUnit } from 'effector-react'
import { Outlet } from 'react-router-dom'

import { HeaderApp } from '@widgets/header-app'
import { TopbarApp } from '@widgets/topbar'

import { Sidebar } from '@features/sidebar'

import { $theme } from '@entities/theme'
import { GateWindow } from '@entities/window'

import { cn } from '@shared/lib'
import { Particles } from '@shared/ui'

export const MainLayout = () => {
  useGate(GateWindow)
  const theme = useUnit($theme)

  return (
    <div
      className={cn(
        'relative m-0 box-border flex h-[100dvh] w-full flex-col overflow-hidden bg-background p-0 font-jetbrains font-normal text-foreground transition-colors'
      )}
    >
      {/* Design Elements */}
      <Particles
        className="absolute inset-0 z-0 overflow-hidden"
        quantity={600}
        ease={50}
        size={0.5}
        vx={0}
        vy={0}
        color={theme === 'dark' ? '#ffffff' : '#000000'}
        refresh={true}
      />

      <TopbarApp />

      <HeaderApp />

      <Sidebar>
        <Outlet />
      </Sidebar>
    </div>
  )
}
