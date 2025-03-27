import { FC } from 'react'
import { RouterProvider } from 'react-router-dom'

// import { DebugMenu } from '@entities/debug-mode/ui/DebugMenu'

import { router } from './routing'

export const App: FC = () => {
  return (
    <>
      {/* <DebugMenu /> */}
      <RouterProvider router={router} />
    </>
  )
}
