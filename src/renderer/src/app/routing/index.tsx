import { createBrowserRouter } from 'react-router-dom'

import { MainLayout } from '@app/layouts'

import { HomePage } from '@pages/home'
import { NewsCategoriesPage } from '@pages/news-categories'
import { NewsDetailPage } from '@pages/news-detail'
import { NewsListPage } from '@pages/news-list'
import { NotFound404 } from '@pages/not-found'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'news', element: <NewsCategoriesPage /> },
        { path: 'news/:categoryId', element: <NewsListPage /> },
        { path: 'news/:newsId/detail', element: <NewsDetailPage /> },
        { path: '*', element: <NotFound404 /> }
      ]
    }
  ],
  {
    basename: window.location.pathname
  }
)
