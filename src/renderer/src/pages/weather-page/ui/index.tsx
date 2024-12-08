import { FC, PropsWithChildren } from 'react'
import { Outlet } from 'react-router-dom'

import { allCities } from '@features/cities/model/cities.slice'
import { SearchCities } from '@features/search-cities/ui'

import { OpacityCard } from '@shared/components/ui'
import { useAppSelector } from '@shared/hooks/store-hooks'
import { formatFullAdressCity } from '@shared/utils/formatFullAdressCity'

export const WeatherPage: FC<PropsWithChildren> = () => {
  const Cities = useAppSelector(allCities)

  console.log(Cities)
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-end">
        <SearchCities />
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 px-6">
        {Cities.map((city) => (
          <OpacityCard
            key={city.id}
            title={city.city.city}
            description={formatFullAdressCity({
              type_region: city.city.type_region,
              region: city.city.region
            })}
            isSelected={city.isSelected}
          />
        ))}
      </div>
      <div className="mt-10 bg-blue-300">
        <Outlet />
      </div>
    </div>
  )
}
