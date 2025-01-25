import { FC } from 'react'

import { getCityWeatherByIsDefault } from '@entities/city'

import { Button } from '@shared/components/ui'
import { WeatherHomeCard } from '@shared/components/ui/weather-home-card'
import { useAppSelector } from '@shared/hooks'

export const HomePage: FC = () => {
  const CityWeather = useAppSelector(getCityWeatherByIsDefault)

  return (
    <div className="container flex h-full items-center justify-center gap-2 overflow-auto py-8">
      <Button>TEST</Button>
      <WeatherHomeCard card={CityWeather} />
    </div>
  )
}
