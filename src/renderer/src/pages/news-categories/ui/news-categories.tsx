import { useGate, useUnit } from 'effector-react'

import { NewsRefresh } from '@features/news-refresh'

import {
  $categories,
  CategoryPreview,
  CategoryPreviewSkeleton,
  fetchCategoriesFx
} from '@entities/categories'

import { NewsCategoriesGate, setCurrentCategoryToTwice } from '../model/model'

export const NewsCategories = () => {
  useGate(NewsCategoriesGate)
  const [categories, isLoading] = useUnit([$categories, fetchCategoriesFx.$pending])
  const handleSetCurrentCategoryTwice = useUnit(setCurrentCategoryToTwice)

  return (
    <div className="relative flex h-full w-full select-none flex-col overflow-y-auto overflow-x-hidden">
      <div className="sticky top-0 z-30 flex min-h-14 items-center overflow-y-auto overflow-x-hidden rounded-tl-2xl border-b border-border bg-card/65 backdrop-blur-md">
        <div className="flex w-full items-center justify-start gap-4 px-4">
          <NewsRefresh />
          <h1 className="text-3xl font-bold">Категории</h1>
        </div>
      </div>
      <div className="grid h-full w-full select-none grid-cols-4 flex-col gap-6 p-10">
        {isLoading
          ? Array(16)
              .fill(null)
              .map((_, index) => <CategoryPreviewSkeleton key={index} />)
          : categories.map((category) => (
              <CategoryPreview
                key={category.id}
                category={category}
                onClick={() => handleSetCurrentCategoryTwice(category)}
              />
            ))}
      </div>
    </div>
  )
}
