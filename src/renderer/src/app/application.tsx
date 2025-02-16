import { FC } from 'react'

import { DebugMenu } from '@entities/debug-mode/ui/DebugMenu'

import { Layout } from './layout/ui/Layout'

export const App: FC = () => {
  return (
    <>
      <DebugMenu />
      <Layout />
    </>
  )
}
