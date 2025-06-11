import { DeviceIndicator } from '@entities/device'
import { NetworkIndicator } from '@entities/network'
import { ThemeSwitcher } from '@entities/theme'
import { GateWindow } from '@entities/window'
import { ROUTES } from '@shared/config/routing'
import { cn } from '@shared/lib'
import { Button, Toaster } from '@shared/ui'
import { TopbarApp } from '@widgets/topbar'
import { useGate } from 'effector-react'
import { NavLink, Outlet } from 'react-router-dom'

export const MainLayout = () => {
  useGate(GateWindow)

  return (
    <div
      className={cn(
        'min-w-dvw relative m-0 box-border flex h-dvh flex-col items-center justify-center overflow-hidden bg-background p-0 font-normal text-foreground transition-all duration-0'
      )}
    >
      <Toaster dir="auto" position="top-center" offset={{ top: 38 }} />
      <TopbarApp />

      <div className="relative flex h-full max-h-[715px] w-full max-w-[865px] flex-col justify-start">
        <div className="h-[32px] min-h-[32px] w-full">
        </div>
        <div className="h-[1px] min-h-[1px] w-full bg-gradient-to-r from-transparent from-5% via-foreground via-80% to-transparent to-100%"></div>

        <div className="flex w-full items-center justify-between px-9 py-4">
          <div className="flex items-center justify-start gap-3">
            <h1 className="font-mono text-2xl font-extrabold text-foreground">Effectory</h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1">
              <DeviceIndicator />
              <NetworkIndicator />
            </div>
            <ThemeSwitcher />
          </div>
        </div>

        <div className="h-[1px] min-h-[1px] w-full bg-gradient-to-r from-transparent from-5% via-foreground via-80% to-transparent to-100%"></div>

        <div className="grid h-full grid-cols-22 items-start justify-center">
          <div className="col-span-4 flex flex-col items-start justify-start gap-1 py-4 pl-2 text-lg font-medium">
            {ROUTES.map((route) => (
              <NavLink
                to={route.path}
                key={route.path}
                className={cn(
                  'outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] rounded-md'
                )}
              >
                {({ isActive }) => (
                  <Button
                    key={route.path}
                    variant="link"
                    tabIndex={-1}
                    className={cn(
                      'cursor-pointer ring-0 w-fit text-base underline-offset-[5px] hover:text-foreground hover:underline hover:decoration-primary hover:decoration-2',
                      isActive && 'text-foreground underline decoration-primary decoration-2'
                    )}
                  >
                    {route.title}
                  </Button>
                )}
              </NavLink>
            ))}
          </div>

          <div className="col-span-18">
            <Outlet />
          </div>
        </div>
        <div className="h-[1px] min-h-[1px] w-full bg-gradient-to-r from-transparent from-5% via-foreground via-80% to-transparent to-100%"></div>
      </div>
    </div>
  )
}
