import { useUnit } from 'effector-react'
import { FC } from 'react'

import { resetCursor, setCursor } from '@features/application'

// import { getCityWeatherByIsDefault } from '@entities/city'

import { Button } from '@shared/components/ui'
import { WeatherHomeCard } from '@shared/components/ui/weather-home-card'
import { useAppSelector } from '@shared/hooks'

export const HomePage: FC = () => {
  // const CityWeather = useAppSelector(getCityWeatherByIsDefault)

  const $setCursor = useUnit(setCursor)
  const $resetCursor = useUnit(resetCursor)

  return (
    <div className="container flex h-full items-center justify-center gap-2 overflow-auto py-8">
      <Button
        onMouseEnter={() =>
          $setCursor({
            sizes: 60,
            offsetX: 37,
            offsetY: 61
          })
        }
        onMouseLeave={() => $resetCursor()}
      >
        TEST
      </Button>
      {/* <WeatherHomeCard card={CityWeather} /> */}
    </div>
  )
}
