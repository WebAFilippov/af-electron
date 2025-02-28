import { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { DebugMenu } from '@entities/debug-mode/ui/DebugMenu'

import { Routing } from './routing'

export const App: FC = () => {
  return (
    <>
      <DebugMenu />
      <BrowserRouter
        basename={window.location.pathname}
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <Routing />
      </BrowserRouter>
    </>
  )
}
