import { EmblaOptionsType } from 'embla-carousel'
import { FC, PropsWithChildren, useEffect, useState } from 'react'

import {
  getAllCityWeather,
  getSelected,
  toggleIsDefault,
  toggleSelected,
  useLazyCreateCityForWeatherQuery
} from '@entities/city'

import { SearchSelect, SliderCards } from '@shared/components/ui'
import { useAppDispatch, useAppSelector } from '@shared/hooks'

import { City } from '../model/types'

export const WeatherPage: FC<PropsWithChildren> = () => {
  const [fetchCreate] = useLazyCreateCityForWeatherQuery()
  const dispatch = useAppDispatch()

  const selected = useAppSelector(getSelected)
  const CityForWeather = useAppSelector(getAllCityWeather)

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

      <div className="bg-opacity_card_bg w-full flex-1">content</div>
    </div>
  )
}
