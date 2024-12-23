import { EmblaOptionsType } from 'embla-carousel'
import { FC, PropsWithChildren, useEffect, useState } from 'react'

import {
  allCityForWeather,
  getSelected,
  toggleIsDefault,
  toggleSelected,
  useLazyCreateCityForWeatherQuery,
  Weather
} from '@entities/city'

import { SearchSelect, SliderCards } from '@shared/components/ui'
import { useAppDispatch, useAppSelector } from '@shared/hooks'

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
  const [fetchCreate, { data: dataFetch }] = useLazyCreateCityForWeatherQuery()
  const dispatch = useAppDispatch()

  const selected = useAppSelector(getSelected)
  const CityForWeather = useAppSelector(allCityForWeather)
  // const CityForWeatherSelected = useAppSelector(getCityForWeatherBySelected)

  const [selectedCity, setSelectedCity] = useState<City | undefined>()
  const [data, setData] = useState<City[]>()
  const [searchQuery, setSearchQuery] = useState<string>('')

  const OPTIONS: EmblaOptionsType = { dragFree: true, loop: false }

  const fetchData = async () => {
    const data: City[] = await window.api.searchCitiesWithLimits({
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

  const handleFetchCreate = async (cityId: number) => {
    console.log('1')
    await fetchCreate(cityId)
  }

  return (
    <div className="container flex h-full flex-col gap-5 py-5">
      <SearchSelect
        data={data}
        isLoading={false}
        isError={false}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCity={selectedCity}
        setectedField={selectedCity?.city}
        handleSetActive={handleSetActive}
        handleFetchCreate={handleFetchCreate}
        comboboxPlaceholder="Город или район"
        searchInputPlaceholder="Выберите город..."
        loadingPlaceholder="Поиск..."
        notFoundPlaceholder="Город не найден"
      />

      <SliderCards
        slides={CityForWeather}
        selected={selected}
        toggleIsDefault={handleToggleIsDefault}
        toggleSelected={handleToggleSelected}
        options={OPTIONS}
      />

      <div className="w-full flex-1 bg-opacity_card_bg">content</div>
    </div>
  )
}
