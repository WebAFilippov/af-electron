import { FC } from 'react'

import { getCityWeatherByIsDefault } from '@entities/city'

import { WeatherHomeCard } from '@shared/components/ui/weather-home-card'
import { useAppSelector } from '@shared/hooks'

export const HomePage: FC = () => {
  const CityWeather = useAppSelector(getCityWeatherByIsDefault)

  return (
    <div className="container flex h-full gap-2 overflow-auto py-8 justify-center items-center">
      <WeatherHomeCard card={CityWeather} />
    </div>
  )
}
