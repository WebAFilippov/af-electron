import { FC, useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

import { WindowControls } from '@features/window-topbar/ui'

import { setApplicationStore } from '@entities/application'
import { setCityForWeatherStore } from '@entities/city-for-weather'

import { Toaster } from '@shared/components/ui'
import { ROUTE } from '@shared/config/routes'
import { useAppDispatch } from '@shared/hooks'
import { cn } from '@shared/lib'

export const ApplicationLayout: FC = () => {
  // const { data } = useGetAllCityForWeatherQuery()
  // const [getWeather, { data, error, isLoading }] = useLazyGetAllCityForWeatherQuery()

  const dispatch = useAppDispatch()

  const [isCollapse] = useState(false)

  useEffect(() => {
    const sendCommandShowWindow = async () => {
      const response = await window.api.startApplication()

      const { storeCityForWeather, storeApplication } = response

      const selected = storeCityForWeather && storeCityForWeather.find((city) => city.isDefault)?.id
      const parsedList = {
        cityForWeather: storeCityForWeather ? storeCityForWeather : [],
        selected: selected ? selected : null
      }

      dispatch(setCityForWeatherStore(parsedList))
      dispatch(setApplicationStore(storeApplication))
    }
    sendCommandShowWindow()

    console.log('effect')
    // console.log('as/dasd')
    // getWeather()
  }, [])

  // useEffect(() => {
  //   console.log(data, '1')

  //   console.log('123')

  //   // setInitial store CityForWeather && selected
  //   const selected = data && data.find((city) => city.isDefault)?.id
  //   const parsedList = {
  //     cityForWeather: data ? data : [],
  //     selected: selected ? selected : null
  //   }
  //   dispatch(setCities(parsedList))
  // })

  return (
    <div className="relative flex h-screen min-h-screen w-screen gap-3 overflow-hidden bg-background p-8 pb-3 pl-2 pr-3 text-primary">
      <Toaster />
      <header
        className="absolute right-0 top-0 z-[700] flex h-8 w-full items-center justify-end gap-3 area-drag"
        id="topbar"
      >
        <WindowControls />
      </header>

      <aside
        className={cn(
          'justify-s -mt-6 flex flex-col items-start gap-2',
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
        className="h-full w-10/12 flex-1 rounded-xl border border-border bg-foreground p-2"
        id="content"
      >
        <Outlet />
      </main>
    </div>
  )
}
