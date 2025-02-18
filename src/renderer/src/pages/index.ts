import { createRoutesView } from 'atomic-router-react'

import { HomeRoute } from './home'
import { SettingsRoute } from './settings'
import { WeatherRoute } from './weather'

export const Pages = createRoutesView({
  routes: [HomeRoute, WeatherRoute, SettingsRoute]
})
