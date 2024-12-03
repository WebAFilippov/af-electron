import { BrowserRouter, Route, Routes } from 'react-router'

import { ROUTE } from '@shared/config/routes'
import { AppLayout } from '@shared/layouts/app-layout'

export const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route {...ROUTE.HOME} />
          <Route {...ROUTE.WEATHER} />
          <Route {...ROUTE.AMBILIGHT} />
          <Route {...ROUTE.AUDIODEVICE} />
          <Route {...ROUTE.LEDLIGHT} />
          <Route {...ROUTE.TABLE} />
          <Route {...ROUTE.SETTINGS} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
