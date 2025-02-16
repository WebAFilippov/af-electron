import { createRoutesView } from 'atomic-router-react'

import { HomeRoute } from './home'
import { SettingsRoute } from './settings'

export const Pages = createRoutesView({
  routes: [HomeRoute, SettingsRoute]
})
