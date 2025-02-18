import { routes } from '@shared/config/routing'

export const currentRoute = routes.weather

currentRoute.opened.watch(() => console.log('Weather opened'))
