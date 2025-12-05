import { Baselayout } from '@app/layouts/base-layout'
import { AmbilightPage } from '@pages/ambilight'
import { ErrorPage } from '@pages/error'
import { Settings } from '@pages/settings'
import { RouteObject } from 'react-router-dom'

const AmbilightRoute: RouteObject = {
  path: '/',
  index: true,
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
  children: [
    {
      index: true,
      path: '/',
      element: <AmbilightPage />
    },
    {
      path: '/settings',
      element: <Settings />
    }
  ]
}
