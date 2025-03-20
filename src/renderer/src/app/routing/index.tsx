import { createBrowserRouter } from 'react-router-dom'

import { MainLayout, NewsLayout } from '@app/layouts'

import { HomePage } from '@pages/home'
import { NewsCategories } from '@pages/news-categories'
import { NewsDetail } from '@pages/news-detail'
import { NewsWithCategory } from '@pages/news-with-category'
import { NotFound404 } from '@pages/not-found'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: 'news',
          element: <NewsLayout />,
          children: [
            { index: true, element: <NewsCategories /> },
            { path: ':category', element: <NewsWithCategory /> },
            { path: ':slug/detail', element: <NewsDetail /> }
          ]
        },
        { path: '*', element: <NotFound404 /> }
      ]
    }
  ],
  {
    basename: window.location.pathname
  }
)
