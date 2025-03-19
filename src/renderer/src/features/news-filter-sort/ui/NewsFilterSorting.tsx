import { useUnit } from 'effector-react'

import { $currentSorting, $sorting } from '@entities/news'

import { Button } from '@shared/ui'

import { setCurrentSorting } from '../model/sorting'

export const NewsFilterSorting = () => {
  const [sorting, currentSorting, handleSetCurrentSorting] = useUnit([
    $sorting,
    $currentSorting,
    setCurrentSorting
  ])

  return (
    <div className="flex flex-1 flex-col gap-2">
      <h1 className="mt-1 select-none text-base font-bold leading-none">Сортировка</h1>
      <div className="mb-2 flex max-h-[22rem] min-w-32 flex-col overflow-auto">
        {sorting.map((option) => {
          return (
            <Button
              key={option.label}
              variant={
                currentSorting.by === option.value.by && currentSorting.order === option.value.order
                  ? 'default'
                  : 'ghost'
              }
              className="max-h-6 select-none items-center justify-start rounded-none px-2 py-1 text-[0.7rem]"
              size="sm"
              onClick={() =>
                handleSetCurrentSorting({ by: option.value.by, order: option.value.order })
              }
            >
              {option.label}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
