import { sample } from 'effector'
import { createGate, useGate, useUnit } from 'effector-react'
import { Link } from 'react-router-dom'

import {
  $categories,
  fetchCategoriesFx,
  loadCategories,
  resetCurrentCategory
} from '@features/news-filter'

import { Card, CardDescription, CardTitle, Skeleton } from '@shared/ui'

const Gate = createGate()
sample({
  clock: Gate.open,
  target: [loadCategories, resetCurrentCategory]
})

export const News = () => {
  useGate(Gate)

  const [categories, isLoading] = useUnit([$categories, fetchCategoriesFx.$pending])

  return (
    <div className="relative grid h-full w-full select-none grid-cols-4 flex-col gap-6 overflow-y-auto overflow-x-hidden p-10">
      {isLoading
        ? Array(20)
            .fill(null)
            .map((_, index) => <Skeleton key={index} />)
        : categories.map((category) => (
            <Link to={category.slug} key={category.slug}>
              <Card className="h-full p-10 transition-shadow duration-300 hover:shadow-lg">
                <CardTitle>{category.title}</CardTitle>
                <CardDescription>{category.count}</CardDescription>
              </Card>
            </Link>
          ))}
    </div>
  )
}
