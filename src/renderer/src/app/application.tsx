import { LayoutRoute } from '@app/providers/routing'
import { FC } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

export const router = createBrowserRouter([LayoutRoute], {
  basename: window.location.pathname
})

export const App: FC = () => {
  return <RouterProvider router={router} />
}
