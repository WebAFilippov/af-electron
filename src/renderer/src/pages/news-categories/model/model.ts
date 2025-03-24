import { createEvent, sample } from 'effector'
import { createGate } from 'effector-react'

import {
  Category,
  fetchCategoriesFx,
  loadCategories,
  setCurrentCategory
} from '@entities/categories'
import { $news, $queryTimelapse, setQueryCategory } from '@entities/news'

const setCurrentCategoryToTwice = createEvent<Category>()

const NewsCategoriesGate = createGate()

sample({
  clock: setCurrentCategoryToTwice,
  target: [setCurrentCategory, setQueryCategory]
})

sample({
  clock: fetchCategoriesFx.finished.success,
  fn: () => Date.now(),
  target: $queryTimelapse
})

sample({
  clock: fetchCategoriesFx.finished.success,
  fn: ({ result }) => {
    const flatedResult = result.data?.flatMap((category) => [category])
    const mappedResult = flatedResult?.map((category) => ({
      category: category.title,
      data: [],
      scroll: 0,
      cursor: null,
      hasNextPage: true
    }))

    return mappedResult || []
  },
  target: $news
})

sample({
  clock: NewsCategoriesGate.open,
  target: loadCategories
})

export { NewsCategoriesGate, setCurrentCategoryToTwice }
