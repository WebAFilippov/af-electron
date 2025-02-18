import { RouterProvider } from 'atomic-router-react'
import { FC } from 'react'

import { Pages } from '@pages/index'

import { DebugMenu } from '@entities/debug-mode/ui/DebugMenu'

import { router } from '@shared/config/routing'

import { Layout } from './layout/ui/Layout'

export const App: FC = () => {
  return (
    <>
      <DebugMenu />
      <RouterProvider router={router}>
        <Layout>
          <Pages />
        </Layout>
      </RouterProvider>
    </>
  )
}
