import { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

import { Cursor } from '@features/application'
import { WindowControls } from '@features/window-topbar/ui'

import { setOWMApikey, useStartApplication } from '@entities/application'

// import { getAllCityWeather, setInitialCityWeather } from '@entities/city'
// import { useCitiesWeather } from '@entities/city/api/city.api'
import { HorizontalLine, Toaster } from '@shared/components/ui'
import { Logo } from '@shared/components/ui/H'
import { ROUTE } from '@shared/config/routes'
import { useAppDispatch, useAppSelector } from '@shared/hooks'
import { cn } from '@shared/lib'

export const ApplicationLayout = () => {
  const dispatch = useAppDispatch()
  // const CitiesWeather = useAppSelector(getAllCityWeather)

  const [isCollapse] = useState(false)
  const { data: dataStartApp } = useStartApplication()
  // const { data: dataCitiesWeather } = useCitiesWeather(CitiesWeather)

  useEffect(() => {
    if (dataStartApp) {
      // dispatch(setInitialCityWeather(dataStartApp.city))
      dispatch(setOWMApikey(dataStartApp.application.owm_apikey))
    }
  }, [dataStartApp])

  // useEffect(() => {
  //   if (dataCitiesWeather) {
  //     dispatch(setInitialCityWeather(dataCitiesWeather))
  //   }
  // }, [dataCitiesWeather])
  return (
    <div
      className="relative m-0 box-border flex h-screen min-h-screen w-screen gap-3 overflow-hidden p-8 pb-3 pl-2 pr-3 font-jetbrains text-base font-medium text-primary-foreground"
      id="clickThroughElement"
    >
      <Cursor />
      <Toaster />

      <header
        className="absolute right-0 top-0 m-0 mb-1 flex h-8 w-full items-center justify-end gap-3 area-drag"
        id="topbar"
      >
        {/* <HorizontalLine /> */}
        <WindowControls />
      </header>

      <aside
        className={cn(
          '-mt-6 flex flex-col items-start justify-center gap-2 text-primary',
          isCollapse ? 'w-[72px]' : 'w-[204px]'
        )}
        id="sidebar"
      >
        <div className="flex h-14 w-full items-center">
          <Link to={ROUTE.HOME.path}>{ROUTE.HOME.name}</Link>
        </div>
        <nav className="flex w-full flex-1 flex-col overflow-auto">
          {/* <Link to={ROUTE.WEATHER.path}>{ROUTE.WEATHER.name}</Link> */}
          <Link to={ROUTE.AMBILIGHT.path}>{ROUTE.AMBILIGHT.name}</Link>
          <Link to={ROUTE.LEDLIGHT.path}>{ROUTE.LEDLIGHT.name}</Link>
          <Link to={ROUTE.AUDIODEVICE.path}>{ROUTE.AUDIODEVICE.name}</Link>
          <Link to={ROUTE.TABLE.path}>{ROUTE.TABLE.name}</Link>
        </nav>
        <div>{/* <Link to={ROUTE.SETTINGS.path}>{ROUTE.SETTINGS.name}</Link> */}</div>
      </aside>
      <main className="h-full w-10/12 flex-1 p-2" id="content">
        {/* <Outlet /> */}
      </main>
    </div>
  )
}
