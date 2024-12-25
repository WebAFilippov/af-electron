import { FC, useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

import { WindowControls } from '@features/window-topbar/ui'

import { setInitialApplication, useStartApp } from '@entities/application'
import { setInitialCityWeather } from '@entities/city'

import { Toaster } from '@shared/components/ui'
import { ROUTE } from '@shared/config/routes'
import { useAppDispatch } from '@shared/hooks'
import { cn } from '@shared/lib'

export const ApplicationLayout: FC = () => {
  const dispatch = useAppDispatch()
  const { data } = useStartApp()

  useEffect(() => {
    if (data) {
      dispatch(setInitialCityWeather(data.storeCity))
      dispatch(setInitialApplication(data.storeApplication))
    }
  }, [data])

  const [isCollapse] = useState(false)

  return (
    <div className="relative box-border flex h-screen min-h-screen w-screen gap-3 overflow-hidden bg-foreground p-8 pb-3 pl-2 pr-3 text-base text-primary-foreground">
      <Toaster />
      <header
        className="absolute right-0 top-0 z-[700] flex h-8 w-full items-center justify-end gap-3 area-drag"
        id="topbar"
      >
        <WindowControls />
      </header>

      <aside
        className={cn(
          'justify-s -mt-6 flex flex-col items-start gap-2 text-primary',
          isCollapse ? 'w-[72px]' : 'w-[204px]'
        )}
        id="sidebar"
      >
        <div className="flex h-14 w-full items-center">
          <Link to={ROUTE.HOME.path}>{ROUTE.HOME.name}</Link>
        </div>
        <nav className="flex w-full flex-1 flex-col overflow-auto">
          <Link to={ROUTE.WEATHER.path}>{ROUTE.WEATHER.name}</Link>
          <Link to={ROUTE.AMBILIGHT.path}>{ROUTE.AMBILIGHT.name}</Link>
          <Link to={ROUTE.LEDLIGHT.path}>{ROUTE.LEDLIGHT.name}</Link>
          <Link to={ROUTE.AUDIODEVICE.path}>{ROUTE.AUDIODEVICE.name}</Link>
          <Link to={ROUTE.TABLE.path}>{ROUTE.TABLE.name}</Link>
        </nav>
        <div>
          <Link to={ROUTE.SETTINGS.path}>{ROUTE.SETTINGS.name}</Link>
        </div>
      </aside>
      <main
        className="h-full w-10/12 flex-1 rounded-xl border border-border bg-background p-2"
        id="content"
      >
        <Outlet />
      </main>
    </div>
  )
}


