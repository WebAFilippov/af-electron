import { FC, PropsWithChildren } from 'react'
import { Outlet } from 'react-router-dom'

import { SearchCities } from '@features/search-cities/ui'

import { OpacityCard } from '@shared/components/ui'

const Cities = [
  { city: 'Майкоп', region: 'Адыгея', type_region: 'Респ', latitude: 44.6, longitude: 40.1 },
  { city: 'Майкоп', region: 'Адыгея', type_region: 'Респ', latitude: 44.6, longitude: 40.1 },
  { city: 'Майкоп', region: 'Адыгея', type_region: 'Респ', latitude: 44.6, longitude: 40.1 },
  { city: 'Майкоп', region: 'Адыгея', type_region: 'Респ', latitude: 44.6, longitude: 40.1 },
  { city: 'Майкоп', region: 'Адыгея', type_region: 'Респ', latitude: 44.6, longitude: 40.1 },
  { city: 'Майкоп', region: 'Адыгея', type_region: 'Респ', latitude: 44.6, longitude: 40.1 }
]

export const WeatherPage: FC<PropsWithChildren> = () => {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-end">
        <SearchCities />
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 px-6">
        {Cities.map((city) => (
          <OpacityCard title={city.city} description={city.region} />
        ))}
      </div>
      <div className="mt-10 bg-blue-300">
        <Outlet />
      </div>
    </div>
  )
}
