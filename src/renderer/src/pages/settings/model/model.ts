import { routes } from '@shared/config/routing'

export const currentRoute = routes.settings

currentRoute.opened.watch(() => console.log('Settings route opened'))
