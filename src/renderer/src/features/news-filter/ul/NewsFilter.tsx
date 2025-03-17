import { useUnit } from 'effector-react'

import { Button, Popover, PopoverContent, PopoverTrigger, Skeleton } from '@shared/ui'

import {
  $categories,
  $currentCategory,
  $isOpen,
  fetchCategoriesFx,
  setCategory,
  toggleIsOpen
} from '../model/category'
import { $sort, setSort, SORT_OPTIONS } from '../model/sort'

export const NewsFilter = () => {
  const [categories, currentCategory, handleSetCategory, pending] = useUnit([
    $categories,
    $currentCategory,
    setCategory,
    fetchCategoriesFx.$pending
  ])

  const [sort, handleSetSort] = useUnit([$sort, setSort])

  return (
    <Popover defaultOpen={false}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-8">
          Фильтр
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex divide-x-2 p-2" align="center">
        <div className="flex flex-col gap-2 pr-2">
          <h1 className="mt-1 select-none text-base font-bold leading-none">Категории</h1>
          <div className="custom-scrollbar flex max-h-[26rem] w-fit min-w-40 flex-col overflow-auto">
            {pending ? (
              <Skeleton className="h-60 w-44 rounded-none" />
            ) : (
              categories.map((category) => {
                return (
                  <Button
                    key={category}
                    variant={currentCategory === category ? 'default' : 'ghost'}
                    className="max-h-6 min-w-44 select-none items-center justify-start rounded-none px-3 py-1"
                    size="sm"
                    onClick={() => handleSetCategory(category)}
                  >
                    {category}
                  </Button>
                )
              })
            )}
          </div>
        </div>

        <div className="flex flex-col divide-y-2 pl-2">
          <div className="flex flex-1 flex-col gap-2">
            <h1 className="mt-1 select-none text-base font-bold leading-none">Сортировка</h1>
            <div className="mb-2 flex max-h-[22rem] min-w-32 flex-col overflow-auto">
              {SORT_OPTIONS.map((option) => {
                return (
                  <Button
                    key={option.label}
                    variant={
                      sort.by === option.value.by && sort.order === option.value.order
                        ? 'default'
                        : 'ghost'
                    }
                    className="max-h-6 select-none items-center justify-start rounded-none px-2 py-1 text-[0.7rem]"
                    size="sm"
                    onClick={() =>
                      handleSetSort({ by: option.value.by, order: option.value.order })
                    }
                  >
                    {option.label}
                  </Button>
                )
              })}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="mt-2 select-none text-base font-bold leading-none">Количество</h1>
            <div className="flex justify-center">
              <Button
                variant="ghost"
                className="max-h-6 w-full select-none rounded-none px-2 py-1 text-[0.7rem]"
                size="sm"
              >
                10
              </Button>
              <Button
                variant="default"
                className="max-h-6 w-full rounded-none px-2 py-1 text-[0.7rem]"
                size="sm"
              >
                20
              </Button>
              <Button
                variant="ghost"
                className="max-h-6 w-full rounded-none px-2 py-1 text-[0.7rem]"
                size="sm"
              >
                30
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
