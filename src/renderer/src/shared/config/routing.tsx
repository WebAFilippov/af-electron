import { Newspaper } from 'lucide-react'

import { News } from '@pages/news'

export const routes = [
  {
    path: '/news',
    title: 'Новости',
    icon: <Newspaper size="1.5rem" />,
    element: <News />
  }
]
