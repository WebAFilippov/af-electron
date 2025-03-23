import { createEvent, sample } from 'effector'

import { $currentCategory, Category } from '@entities/categories'
import { $queryCategory } from '@entities/news'

const setCurrentCategory = createEvent<Category>()

sample({
  clock: setCurrentCategory,
  target: [$currentCategory, $queryCategory]
})

export { setCurrentCategory }
