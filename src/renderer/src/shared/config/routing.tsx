import { Newspaper, Settings, Thermometer } from 'lucide-react'

import { NewsPage } from '@pages/news'
import { SettingsPage } from '@pages/settings'
import { WeatherPage } from '@pages/weather'

export const routes = [
  {
    path: '/news',
    title: 'News',
    icon: <Newspaper size="1.5rem" />,
    element: <NewsPage />
  },
  {
    path: '/weather',
    title: 'Weather',
    icon: <Thermometer size="1.5rem" />,
    element: <WeatherPage />
  },
  {
    path: '/settings',
    title: 'Settings',
    icon: <Settings size="1.5rem" />,
    element: <SettingsPage />
  }
]
