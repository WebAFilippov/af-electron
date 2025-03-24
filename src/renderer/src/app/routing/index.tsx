import { createBrowserRouter } from 'react-router-dom'

import { MainLayout } from '@app/layouts'

import { HomePage } from '@pages/home'
import { NewsCategories } from '@pages/news-categories'
import { NewsList } from '@pages/news-list'
import { NotFound404 } from '@pages/not-found'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'news', element: <NewsCategories /> },
        { path: 'news/:categoryId', element: <NewsList /> },
        { path: '*', element: <NotFound404 /> }
      ]
    }
  ],
  {
    basename: window.location.pathname
  }
)
