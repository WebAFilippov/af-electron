import { Newspaper } from 'lucide-react'

import { News } from '@pages/news'

export const ROUTES = [
  {
    path: '/news',
    title: 'Новости',
    description: 'Список новостей',
    icon: <Newspaper size="1.5rem" />,
    element: <News />
  }
]
