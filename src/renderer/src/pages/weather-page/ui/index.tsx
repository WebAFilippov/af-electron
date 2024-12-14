import { EmblaOptionsType } from 'embla-carousel'
import { Check, PlusIcon } from 'lucide-react'
import { FC, PropsWithChildren, useEffect, useState } from 'react'

import {
  allCityForWeather, // getCityForWeatherBySelected,
  getSelected,
  toggleIsDefault,
  toggleSelected,
  Weather
} from '@entities/city-for-weather'
import { WeatherComponent } from '@entities/city-for-weather/model/weather'

import { Button, CommandItem, SearchSelect, SliderCards } from '@shared/components/ui'
import { useAppDispatch, useAppSelector } from '@shared/hooks'
import { cn } from '@shared/lib'
import { formatFullAdressCity } from '@shared/utils'

import { City } from '../model/types'

const mockWeather: Weather = {
  coord: {
    lon: 37.62,
    lat: 55.75
  },
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d'
    }
  ],
  base: 'stations',
  main: {
    temp: 20,
    feels_like: 18,
    temp_min: 19,
    temp_max: 21,
    pressure: 1012,
    humidity: 60,
    sea_level: 1012,
    grnd_level: 1009
  },
  visibility: 10000,
  wind: {
    speed: 3.5,
    deg: 120
  },
  snow: {
    '1h': 0
  },
  clouds: {
    all: 0
  },
  dt: 1670000000,
  sys: {
    type: 1,
    id: 9029,
    country: 'RU',
    sunrise: 1670040000,
    sunset: 1670070000
  },
  timezone: 10800,
  id: 524901,
  name: 'Moscow',
  cod: 200
}

export const WeatherPage: FC<PropsWithChildren> = () => {
  const dispatch = useAppDispatch()

  const selected = useAppSelector(getSelected)
  const CityForWeather = useAppSelector(allCityForWeather)
  // const CityForWeatherSelected = useAppSelector(getCityForWeatherBySelected)

  const [selectedCity, setSelectedCity] = useState<City | undefined>()
  const [data, setData] = useState<City[]>()

  const [searchQuery, setSearchQuery] = useState<string>('')

  const fetchData = async () => {
    const data: City[] = await window.api.searchCities({
      query: searchQuery,
      limit: 5,
      order: 'DESC'
    })
    setData(data)
    console.log('first2')
  }

  useEffect(() => {
    fetchData()
  }, [searchQuery])

  const handleSetActive = (obj: City | undefined) => {
    setSelectedCity(obj)
  }

  const handleToggleIsDefault = async (id: number) => {
    try {
      const response = await window.api.updateCityForWeatherByIsDefault(id)
      dispatch(toggleIsDefault(response))
    } catch (error) {
      console.log(error)
    }
  }

  const handleToggleSelected = async (id: number) => {
    dispatch(toggleSelected(id))
  }

  const OPTIONS: EmblaOptionsType = { dragFree: true, loop: false }

  return (
    <div className="mx-5 flex h-full flex-col gap-5 py-5">
      <div className="flex items-center justify-end gap-1">
        <SearchSelect<City>
          data={data}
          isLoading={false}
          isError={false}
          disabled={CityForWeather.length === 10}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCity={selectedCity}
          setectedField={selectedCity?.city}
          comboboxPlaceholder="Город или район"
          searchInputPlaceholder="Выберите город..."
          loadingPlaceholder="Поиск..."
          notFoundPlaceholder="Город не найден"
        >
          {data &&
            data.map((item) => (
              <CommandItem
                key={item.id}
                value={item.city}
                onSelect={(currentValue) => {
                  currentValue === selectedCity?.city
                    ? handleSetActive(undefined)
                    : handleSetActive(item)
                }}
              >
                <div className="flex cursor-pointer flex-col items-start justify-start text-primary">
                  <span>{item.city}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatFullAdressCity({
                      type_region: item.type_region,
                      region: item.region
                    })}
                  </span>
                </div>
                <Check
                  className={cn(
                    'ml-auto text-primary',
                    selectedCity?.id === item.id ? 'opacity-100' : 'opacity-0'
                  )}
                />
              </CommandItem>
            ))}
        </SearchSelect>

        <Button variant="outline" size="icon" disabled={CityForWeather.length === 10}>
          <PlusIcon />
        </Button>
      </div>

      <button onClick={() => handleToggleIsDefault(22)}>test</button>

      <SliderCards
        slides={CityForWeather}
        selected={selected}
        toggleIsDefault={handleToggleIsDefault}
        toggleSelected={handleToggleSelected}
        options={OPTIONS}
      />

      <div className="w-full flex-1 bg-opacity_card_bg">
        {/* {CityForWeatherSelected && CityForWeatherSelected.cityInfo.city} */}
        <WeatherComponent weather={mockWeather} />
      </div>
    </div>
  )
}
