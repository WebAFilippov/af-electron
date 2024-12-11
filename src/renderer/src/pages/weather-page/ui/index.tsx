import { Check, PlusIcon } from 'lucide-react'
import { FC, PropsWithChildren, useCallback, useEffect, useState } from 'react'

import { Button, CommandItem, SearchSelect } from '@shared/components/ui'
import { useFetchData } from '@shared/hooks/use-fetch-data'
import { cn } from '@shared/lib'
import { formatFullAdressCity } from '@shared/utils'

import { SearchCitiesParams } from '../../../../../shared/types'
import { City } from '../model/types'

export const WeatherPage: FC<PropsWithChildren> = () => {
  const { data, isLoading, isError, fetchData } = useFetchData<City, SearchCitiesParams>(
    window.api.searchCities
  )
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selected, setSelected] = useState<City | undefined>()

  const handleSetActive = useCallback((obj: City | undefined) => {
    setSelected(obj)
  }, [])

  useEffect(() => {
    fetchData({ query: searchQuery, limit: 5, order: 'DESC' })
  }, [searchQuery])

  return (
    <div className="mx-10 flex h-full flex-col gap-5 py-5">
      <div className="flex items-center justify-end gap-1">
        <SearchSelect<City>
          data={data}
          isLoading={isLoading}
          isError={isError}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selected={selected}
          setectedField={selected?.city}
          comboboxPlaceholder="Город или район"
          searchInputPlaceholder="Выберите город..."
          loadingPlaceholder="Поиск..."
          notFoundPlaceholder="Город не найден"
        >
          {data.map((item) => (
            <CommandItem
              key={item.id}
              value={item.city}
              onSelect={(currentValue) => {
                currentValue === selected?.city ? handleSetActive(undefined) : handleSetActive(item)
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
                  selected?.id === item.id ? 'opacity-100' : 'opacity-0'
                )}
              />
            </CommandItem>
          ))}
        </SearchSelect>
        <Button variant="outline" size="icon">
          <PlusIcon />
        </Button>
      </div>
      <div className="flex min-h-24 w-full flex-wrap items-center justify-center bg-green-300">
        Feature -
        <span>
          Список городов. Тут можно выбрать ключевой по которому будет показан прогноз. А так же
          удалить город из списка
        </span>
      </div>
      <div className="h-full w-full bg-blue-300">
        Feature - <span>Тут будет показан прогноз погоды</span>
      </div>
    </div>
  )
}
