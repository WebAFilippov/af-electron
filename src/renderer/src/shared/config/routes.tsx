import { AmbilightPage } from '@pages/ambilight-page/ui'
import { AudioDevicePage } from '@pages/audio-device-page/ui'
import { HomePage } from '@pages/home-page/ui'
import { LedlightPage } from '@pages/ledlight-page/ui'
import { SettingsPage } from '@pages/settings-page/ui'
import { TablePage } from '@pages/table-page/ui'
import { WeatherPage } from '@pages/weather-page/ui'

export const ROUTE = {
  HOME: {
    path: '/',
    element: <HomePage />,
    name: 'Домашняя'
  },
  WEATHER: {
    path: '/weather',
    element: <WeatherPage />,
    name: 'Погода'
  },
  AUDIODEVICE: {
    path: '/audiodevice',
    element: <AudioDevicePage />,
    name: 'Аудиоустройства'
  },
  LEDLIGHT: {
    path: '/ledlight',
    element: <LedlightPage />,
    name: 'Подсветка стола'
  },
  TABLE: {
    path: '/table',
    element: <TablePage />,
    name: 'Регулировка стола'
  },
  SETTINGS: {
    path: '/settings',
    element: <SettingsPage />,
    name: 'Настройки'
  },
  AMBILIGHT: {
    path: '/ambilight',
    element: <AmbilightPage />,
    name: 'Подсветка монитора'
  }
}
