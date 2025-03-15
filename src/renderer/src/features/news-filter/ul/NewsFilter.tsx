import { useUnit } from 'effector-react'

import { $categories, $currentCategory, setCategory } from '@features/news-filter-category'

import { Button, Popover, PopoverContent, PopoverTrigger } from '@shared/ui'

import { $isOpen, toggleIsOpen } from '../model/model'

export const NewsFilter = () => {
  const [categories, currentCategory, handleSetCategory] = useUnit([
    $categories,
    $currentCategory,
    setCategory
  ])

  const [isOpen, handleToggleIsOpen] = useUnit([$isOpen, toggleIsOpen])

  return (
    <Popover open={isOpen} defaultOpen={false} onOpenChange={handleToggleIsOpen}>
      <PopoverTrigger>
        <Button variant="outline" className="h-8" onClick={() => handleToggleIsOpen(true)}>
          Фильтр
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex divide-x-2 p-2" align="center">
        <div className="flex flex-col gap-2 pr-2">
          <h1 className="mt-1 text-base font-bold leading-none">Категории</h1>
          <div className="custom-scrollbar flex max-h-[26rem] w-fit min-w-40 flex-col overflow-auto">
            {categories.map((category) => {
              return (
                <Button
                  key={category}
                  variant={currentCategory === category ? 'default' : 'ghost'}
                  className="max-h-6 items-center justify-start rounded-none px-3 py-1"
                  size="sm"
                  onClick={() => {
                    handleToggleIsOpen(false)
                    handleSetCategory(category)
                  }}
                >
                  {category}
                </Button>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col divide-y-2 pl-2">
          <div className="flex flex-1 flex-col gap-2">
            <h1 className="mt-1 text-base font-bold leading-none">Сортировка</h1>
            <div className="mb-2 flex max-h-[22rem] min-w-32 flex-col overflow-auto">
              <Button
                variant="default"
                className="max-h-6 items-center justify-start rounded-none px-2 py-1 text-[0.7rem]"
                size="sm"
              >
                Дата публикации: новые
              </Button>
              <Button
                variant="ghost"
                className="max-h-6 items-center justify-start rounded-none px-2 py-1 text-[0.7rem]"
                size="sm"
              >
                Дата публикации: старые
              </Button>
              <Button
                variant="ghost"
                className="max-h-6 items-center justify-start rounded-none px-2 py-1 text-[0.7rem]"
                size="sm"
              >
                Популярные: сверху
              </Button>
              <Button
                variant="ghost"
                className="max-h-6 items-center justify-start rounded-none px-2 py-1 text-[0.7rem]"
                size="sm"
              >
                Популярные: снизу
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="mt-2 text-base font-bold leading-none">Количество</h1>
            <div className="flex justify-center">
              <Button
                variant="ghost"
                className="max-h-6 w-full rounded-none px-2 py-1 text-[0.7rem]"
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
