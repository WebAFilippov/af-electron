import { FC } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Routing } from './providers/routing'

export const router = createBrowserRouter([Routing], {
  basename: window.location.pathname,
})

export const App: FC = () => {
  return <RouterProvider router={router} />
}
