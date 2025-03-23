import { sample } from 'effector'
import { createGate } from 'effector-react'

import { setCurrentCategory } from '@features/filter-news'

import { fetchCategoriesFx, loadCategories } from '@entities/categories'
import { $queryCategory, setLastTimeFetch } from '@entities/news'

const NewsCategoriesGate = createGate()

sample({
  clock: fetchCategoriesFx.finished.success,
  fn: () => Date.now(),
  target: setLastTimeFetch
})

sample({
  clock: NewsCategoriesGate.open,
  fn: () => null,
  target: [$queryCategory, setCurrentCategory]
})

sample({
  clock: NewsCategoriesGate.open,
  target: loadCategories
})

export { NewsCategoriesGate }
