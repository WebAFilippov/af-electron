import { Newspaper } from 'lucide-react'

import { NewsCategoriesPage } from '@pages/news-categories'

export const ROUTES = [
  {
    path: '/news',
    title: 'Новости',
    description: 'Список новостей',
    icon: <Newspaper size="1.5rem" />,
    element: <NewsCategoriesPage />
  }
]
