import { createRouteView } from 'atomic-router-react'

import { currentRoute } from './model/model'
import { Weather } from './ui'

export const WeatherRoute = {
  view: createRouteView({ route: currentRoute, view: Weather }),
  route: currentRoute
}
