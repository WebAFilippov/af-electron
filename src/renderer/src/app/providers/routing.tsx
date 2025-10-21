import { Baselayout } from '@app/layouts/base-layout'
import { AmbilightPage } from '@pages/ambilight'
import { ErrorPage } from '@pages/error'
import { NotFound404Page } from '@pages/not-found'
import { Settings } from '@pages/settings'
import { RouteObject } from 'react-router-dom'

const NotFound404Route: RouteObject = {
  path: '*',
  element: <NotFound404Page />
}

const AmbilightRoute: RouteObject = {
  path: '/',
  element: <AmbilightPage />
}

const SettingsRoute: RouteObject = {
  path: '/settings',
  element: <Settings />
}

export const LayoutRoute: RouteObject = {
  path: '/',
  element: <Baselayout />,
  errorElement: <ErrorPage />,
  children: [AmbilightRoute, SettingsRoute, NotFound404Route]
}
