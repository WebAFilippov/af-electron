import { Routing } from '@app/providers/routing'
import { FC } from 'react'
import { createHashRouter, RouterProvider } from 'react-router-dom'

export const router = createHashRouter([Routing])

export const App: FC = () => {
  return <RouterProvider router={router} />
}
