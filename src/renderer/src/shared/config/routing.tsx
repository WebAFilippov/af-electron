import {
  createHistoryRouter,
  createRoute,
  createRouterControls,
  UnmappedRouteObject
} from 'atomic-router'
import { sample } from 'effector'
import { createBrowserHistory } from 'history'

import { AppStarted } from './init'

export const routes = {
  home: createRoute(),
  settings: createRoute()
}

const routesMap: UnmappedRouteObject<any>[] = [
  {
    path: '/',
    route: routes.home
  },
  {
    path: '/settings',
    route: routes.settings
  }
]

export const controls: ReturnType<typeof createRouterControls> = createRouterControls()

export const router: ReturnType<typeof createHistoryRouter> = createHistoryRouter({
  routes: routesMap,
  controls
})

sample({
  clock: AppStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory
})
