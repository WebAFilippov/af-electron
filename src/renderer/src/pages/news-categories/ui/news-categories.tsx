import { useGate, useUnit } from 'effector-react'

import { setCurrentCategory } from '@features/filter-news'

import {
  $categories,
  CategoryPreview,
  CategoryPreviewSkeleton,
  fetchCategoriesFx
} from '@entities/categories'

import { NewsCategoriesGate } from '../model/categories'

export const NewsCategories = () => {
  useGate(NewsCategoriesGate)
  const [categories, isLoading] = useUnit([$categories, fetchCategoriesFx.$pending])
  const handleSetCurrentCategory = useUnit(setCurrentCategory)

  return (
    <div className="relative grid h-full w-full select-none grid-cols-4 flex-col gap-6 overflow-y-auto overflow-x-hidden p-10">
      {isLoading
        ? Array(20)
            .fill(null)
            .map((_, index) => <CategoryPreviewSkeleton key={index} />)
        : categories.map((category) => (
            <CategoryPreview
              key={category.id}
              category={category}
              onClick={() => handleSetCurrentCategory(category)}
            />
          ))}
    </div>
  )
}
