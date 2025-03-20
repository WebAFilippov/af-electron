import { sample } from 'effector'
import { createGate } from 'effector-react'

import { loadCategories } from '@entities/categories'

const NewsCategoriesGate = createGate()

sample({
  clock: NewsCategoriesGate.open,
  target: loadCategories
})

export { NewsCategoriesGate }
