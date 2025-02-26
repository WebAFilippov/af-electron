import { Route, Routes } from 'react-router'

import { Layout } from '@app/layout/ui/Layout'

import { HomePage } from '@pages/home'
import { NewsPage } from '@pages/news'
import { SettingsPage } from '@pages/settings'
import { WeatherPage } from '@pages/weather'

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}
