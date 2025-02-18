import { FC } from 'react'
import { Link } from 'react-router-dom'

import { CityWeather } from '@entities/city'

import { ROUTE } from '@shared/config/routing'

import { Button } from '../../ui/button'
import { Skeleton } from './skeleton'
import { WeatherIcon } from './WeatherIcon'

interface Props {
  card?: CityWeather
}

export const WeatherHomeCard: FC<Props> = ({ card }) => {
  return (
    <div className="flex h-fit w-fit flex-col justify-between gap-4 rounded-xl border border-border bg-card px-4 py-4 shadow-md duration-200 user-select-none hover:shadow-xl">
      <div id="header" className="flex items-center justify-start">
        <h1 className="w-full text-lg font-medium leading-none text-primary">
          {card ? (
            `Погода в ${card?.cityInfo.city}`
          ) : (
            <div className="flex gap-2">
              Погода <Skeleton className="h-[18px] w-full bg-muted-foreground" />
            </div>
          )}
        </h1>
      </div>
      <div id="content" className="flex flex-1 flex-col">
        <div className="flex items-center justify-start gap-3">
          {card && card.weather ? (
            <div className="flex items-center justify-center gap-1 px-2">
              <span className="text-4xl">{Math.round(card.weather.main.temp)}°</span>
              <div className="flex size-10 items-center justify-center">
                {card.weather.weather.map((item) => (
                  <WeatherIcon weather={item} key={item.id} />
                ))}
              </div>
              <div className="flex flex-col justify-between gap-1">
                <p className="text-sm leading-none">{card.weather.weather[0].description}</p>
                <p className="text-sm leading-none">
                  ощущается как {Math.round(card.weather.main.feels_like)}°
                </p>
              </div>
            </div>
          ) : (
            <div className="flex h-10 items-center justify-center gap-1 px-2">
              <span className="text-4xl">
                <Skeleton className="h-10 w-20 bg-muted-foreground" />
              </span>
              <div className="flex flex-col justify-between gap-1">
                <div className="text-sm leading-none">
                  <Skeleton className="h-[14px] w-32 bg-muted-foreground" />
                </div>
                <div className="text-sm leading-none">
                  <Skeleton className="h-[14px] w-32 bg-muted-foreground" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div id="footer" className="w-full">
        <Link to={ROUTE.WEATHER.path}>
          <Button className="w-full" size="sm" variant="secondary">
            Подробнее
          </Button>
        </Link>
      </div>
    </div>
  )
}
