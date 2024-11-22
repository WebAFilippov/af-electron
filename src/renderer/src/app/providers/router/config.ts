import { createRoute } from 'atomic-router'

export const routes = {
  home: createRoute(),
  profile: createRoute()
}

export const routingConfig = [
  { path: '/', route: routes.home },
  { path: '/profile', route: routes.profile }
]
