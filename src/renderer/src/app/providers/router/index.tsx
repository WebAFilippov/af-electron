import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// import { AppLayout } from '@shared/layouts/app-layout'
import { ApplicationLayout } from '@app/layout/ui/application-layout'

import { initialCities } from '@features/cities/model/cities.slice'

import { ROUTE } from '@shared/config/routes'
import { useAppDispatch } from '@shared/hooks/store-hooks'

export const RouterProvider = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const sendCommandShowWindow = async () => {
      const response = await window.api.startWindow()
      dispatch(initialCities(response))
    }

    sendCommandShowWindow()
  })
  return (
    <BrowserRouter basename={window.location.pathname}>
      <Routes>
        <Route path="/" element={<ApplicationLayout />}>
          <Route index element={ROUTE.HOME.element} />
          <Route path={ROUTE.WEATHER.path} element={ROUTE.WEATHER.element} />
          <Route path={ROUTE.AMBILIGHT.path} element={ROUTE.AMBILIGHT.element} />
          <Route path={ROUTE.AUDIODEVICE.path} element={ROUTE.AUDIODEVICE.element} />
          <Route path={ROUTE.LEDLIGHT.path} element={ROUTE.LEDLIGHT.element} />
          <Route path={ROUTE.TABLE.path} element={ROUTE.TABLE.element} />
          <Route path={ROUTE.SETTINGS.path} element={ROUTE.SETTINGS.element} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
