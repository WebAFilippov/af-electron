import { Baselayout } from '@app/layouts/base-layout'
import { CPUPage } from '@pages/cpu'
import { DiskPage } from '@pages/disk'

import { ErrorPage } from '@pages/error'
import { MemoryPage } from '@pages/memory'
import { NetworkPage } from '@pages/network'
import { OverviewPage } from '@pages/overview'

import { ProcessesPage } from '@pages/process'
import { SystemPage } from '@pages/systeminfo'

import { RouteObject } from 'react-router-dom'

export const Routing: RouteObject = {
  path: '/',
  element: <Baselayout />,
  errorElement: <ErrorPage />,
  children: [
    {
      index: true,
      path: '/',
      element: <OverviewPage />
    },
    {
      path: '/cpu',
      element: <CPUPage />
    },
    {
      path: '/disk',
      element: <DiskPage />
    },
    {
      path: '/memory',
      element: <MemoryPage />
    },
    {
      path: '/network',
      element: <NetworkPage />
    },
    {
      path: '/processes',
      element: <ProcessesPage />
    },
    {
      path: '/systeminfo',
      element: <SystemPage />
    }
  ]
}
