import { Baselayout } from './base-layout'
import { ChangelogPage } from '@pages/changelog'
import { ErrorPage } from '@pages/error'
import { HomePage } from '@pages/home'
import { NotFound404 } from '@pages/not-found'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Baselayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: '/update', element: <ChangelogPage /> },
        { path: '*', element: <NotFound404 /> }
      ]
    }
  ],
  {
    basename: window.location.pathname
  }
)
