import { FC } from 'react'
import { BrowserRouter } from 'react-router'

import { DebugMenu } from '@entities/debug-mode/ui/DebugMenu'

import { Routing } from './routing'

export const App: FC = () => {
  return (
    <>
      <DebugMenu />
      <BrowserRouter basename={window.location.pathname}>
        <Routing />
      </BrowserRouter>
    </>
  )
}
