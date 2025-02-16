import { createRouteView } from 'atomic-router-react'

import { currentRoute } from './model/model'
import { SettingsPage } from './ui'

export const SettingsRoute = {
  view: createRouteView({ route: currentRoute, view: SettingsPage }),
  route: currentRoute
}
