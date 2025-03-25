import { Briefcase, HelpCircle, Newspaper, Package, Settings, User } from 'lucide-react'

import { NewsCategoriesPage } from '@pages/news-categories'

export const ROUTES = [
  {
    path: '/news',
    title: 'Новости',
    description: 'Список новостей',
    icon: <Newspaper size="1.5rem" />,
    element: <NewsCategoriesPage />
  },
  {
    path: '/profile',
    title: 'Профиль',
    description: 'Ваши данные',
    icon: <User size="1.5rem" />,
    element: <NewsCategoriesPage />
  },
  {
    path: '/portfolio',
    title: 'Портфолио',
    description: 'Ваши проекты',
    icon: <Briefcase size="1.5rem" />,
    element: <NewsCategoriesPage />
  },
  {
    path: '/products',
    title: 'Продукты',
    description: 'Наши продукты',
    icon: <Package size="1.5rem" />,
    element: <NewsCategoriesPage />
  },
  {
    path: '/settings',
    title: 'Настройки',
    description: 'Управление приложением',
    icon: <Settings size="1.5rem" />,
    element: <NewsCategoriesPage />
  },
  {
    path: '/help',
    title: 'Помощь',
    description: 'Справка и поддержка',
    icon: <HelpCircle size="1.5rem" />,
    element: <NewsCategoriesPage />
  }
]
