import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Layout } from '@app/layout/ui/Layout'

import { ROUTE } from '@shared/config/routes'

export const RouterProvider = () => {
  return (
    <BrowserRouter basename={window.location.pathname}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={ROUTE.HOME.element} />
          <Route
            path={ROUTE.AMBILIGHT.path}
            element={ROUTE.AMBILIGHT.element}
          />
          <Route
            path={ROUTE.AUDIODEVICE.path}
            element={ROUTE.AUDIODEVICE.element}
          />
          <Route path={ROUTE.LEDLIGHT.path} element={ROUTE.LEDLIGHT.element} />
          <Route path={ROUTE.TABLE.path} element={ROUTE.TABLE.element} />
          <Route path={ROUTE.SETTINGS.path} element={ROUTE.SETTINGS.element} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
