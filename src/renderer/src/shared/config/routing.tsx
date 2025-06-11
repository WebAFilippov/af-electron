import { ChangelogPage } from '@pages/changelog'

export interface Route {
  path: string
  title: string
  element: JSX.Element
}

export const ROUTES: Route[] = [
  {
    path: '/',
    title: 'Обновление',
    element: <ChangelogPage />
  }
]
