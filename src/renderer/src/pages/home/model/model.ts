import { routes } from '@shared/config/routing'

export const currentRoute = routes.home

currentRoute.opened.watch(() => console.log('Home route opened'))
