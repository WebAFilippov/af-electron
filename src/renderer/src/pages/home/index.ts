import { createRouteView } from 'atomic-router-react'

import { currentRoute } from './model/model'
import { Home } from './ui'

export const HomeRoute = {
  view: createRouteView({ route: currentRoute, view: Home }),
  route: currentRoute
}
