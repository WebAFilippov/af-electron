import { sample } from 'effector'
import { createGate } from 'effector-react'

import { fetchCategoriesFx, loadCategories, resetCurrentCategory } from '@entities/categories'
import {  resetQueryCategory, setLastTimeFetch } from '@entities/news'

const NewsCategoriesGate = createGate()

sample({
  clock: fetchCategoriesFx.finished.success,
  fn: () => Date.now(),
  target: setLastTimeFetch
})

sample({
  clock: NewsCategoriesGate.open,
  target: [resetQueryCategory, resetCurrentCategory]
})

sample({
  clock: NewsCategoriesGate.open,
  target: loadCategories
})

export { NewsCategoriesGate }
