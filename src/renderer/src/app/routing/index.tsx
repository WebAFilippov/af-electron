import { MainLayout } from '@app/layouts'
import { ChangelogPage } from '@pages/changelog'
import { ErrorPage } from '@pages/error'
import { NotFound404 } from '@pages/not-found'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <ChangelogPage /> },
        { path: '*', element: <NotFound404 /> }
      ]
    }
  ],
  {
    basename: window.location.pathname
  }
)
