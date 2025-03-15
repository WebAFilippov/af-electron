import { createBrowserRouter } from 'react-router-dom'

import { Layout } from '@app/layout/ui/Layout'

import { HomePage } from '@pages/home'
import { NewsPage } from '@pages/news'
import { NewsDetail } from '@pages/news-full/ui/NewsDetail'
import { NotFound404 } from '@pages/not-found'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'news', element: <NewsPage /> },
      { path: 'news/:slug', element: <NewsDetail /> },
      { path: '*', element: <NotFound404 /> }
    ]
  }
])
