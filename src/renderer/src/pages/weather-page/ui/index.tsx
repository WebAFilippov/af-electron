import { EmblaOptionsType } from 'embla-carousel'
import { Check, PlusIcon } from 'lucide-react'
import { FC, PropsWithChildren, useEffect, useState } from 'react'

import {
  allCityForWeather,
  getCityForWeatherByIsDefault,
  getCityForWeatherBySelected,
  getSelected,
  toggleIsDefault,
  toggleSelected
} from '@entities/city-for-weather'

import { Button, CommandItem, SearchSelect, SliderCards } from '@shared/components/ui'
import { useAppDispatch, useAppSelector } from '@shared/hooks'
import { cn } from '@shared/lib'
import { formatFullAdressCity } from '@shared/utils'

import { City } from '../model/types'

export const WeatherPage: FC<PropsWithChildren> = () => {
  const dispatch = useAppDispatch()

  const selected = useAppSelector(getSelected)
  const CityForWeather = useAppSelector(allCityForWeather)
  const CityByIsDefault = useAppSelector(getCityForWeatherByIsDefault)
  const CityForWeatherSelected = useAppSelector(getCityForWeatherBySelected)

  const [selectedCity, setSelectedCity] = useState<City | undefined>()
  const [data, setData] = useState<City[]>()

  const [searchQuery, setSearchQuery] = useState<string>('')
  console.log('first1')

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

  // const { data, isLoading, isError, fetchData } = useFetchData<City, SearchCitiesParams>(
  //   window.api.searchCities
  // )

  // const fetchList = async () => {
  //   const list = await window.api.getAllCityForWeather()
  //   dispatch(setCities(list))
  // }

  // useEffect(() => {
  //   fetchData({ query: searchQuery, limit: 5, order: 'DESC' })
  //   console.log('da')
  // }, [searchQuery])

  // useEffect(() => {
  //   fetchList()
  // }, [])

  const handleSetActive = (obj: City | undefined) => {
    setSelectedCity(obj)
  }

  const handleToggleIsDefault = async (id: number) => {
    try {
      const response = await window.api.updateCityForWeatherByIsDefault(id)
      dispatch(toggleIsDefault(response))
    } catch {}
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

        <Button variant="outline" size="icon">
          <PlusIcon />
        </Button>
      </div>

      <SliderCards
        slides={CityForWeather}
        selected={selected}
        toggleIsDefault={handleToggleIsDefault}
        toggleSelected={handleToggleSelected}
        options={OPTIONS}
      />

      <div className="w-full flex-1 bg-opacity_card_bg">
        {CityForWeatherSelected && CityForWeatherSelected.cityInfo.city}
      </div>
    </div>
  )
}
