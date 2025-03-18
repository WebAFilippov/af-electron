import { createBrowserRouter } from 'react-router-dom'

import { Layout } from '@app/layout/ui/Layout'
import { NewsLayout } from '@app/layout/ui/NewsLayout'

import { HomePage } from '@pages/home'
import { News } from '@pages/news'
import { NewsDetail } from '@pages/news-detail'
import { NewsWithCategory } from '@pages/news-with-category'
import { NotFound404 } from '@pages/not-found'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'news',
        element: <NewsLayout />,
        children: [
          { index: true, element: <News /> },
          { path: ':category', element: <NewsWithCategory /> },
          { path: ':slug/detail', element: <NewsDetail /> }
        ]
      },
      { path: '*', element: <NotFound404 /> }
    ]
  }
])
