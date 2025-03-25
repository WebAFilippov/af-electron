import { useGate, useUnit } from 'effector-react'

import { NewsRefresh } from '@features/news-refresh'

import {
  $categories,
  CategoryPreview,
  CategoryPreviewSkeleton,
  fetchCategoriesFx
} from '@entities/categories'

import { NewsCategoriesGate, setCurrentCategoryToTwice } from '../model/model'

export const NewsCategoriesPage = () => {
  useGate(NewsCategoriesGate)
  const [categories, isLoading] = useUnit([$categories, fetchCategoriesFx.$pending])
  const handleSetCurrentCategoryTwice = useUnit(setCurrentCategoryToTwice)

  return (
    <div className="relative flex h-full w-full select-none flex-col overflow-y-auto overflow-x-hidden">
      <div className="sticky top-0 z-30 flex h-14 min-h-14 items-center gap-4 rounded-tl-2xl border-b border-border bg-card/65 backdrop-blur-md">
        <NewsRefresh />
        <div className="flex w-full items-center justify-between px-4">
          <h1 className="text-2xl font-semibold">Категории</h1>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 p-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading && !categories.length
          ? Array(12)
              .fill(null)
              .map((_, index) => <CategoryPreviewSkeleton key={index} />)
          : categories.map((category, index) => (
              <div
                key={category.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CategoryPreview
                  category={category}
                  onClick={() => handleSetCurrentCategoryTwice(category)}
                />
              </div>
            ))}
      </div>
    </div>
  )
}
