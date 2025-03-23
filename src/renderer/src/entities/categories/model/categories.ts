import { createEvent, createStore, sample } from 'effector'

import { fetchCategoriesFx } from '../api/fetch-categories'
import { Category } from '../types'

const loadCategories = createEvent()

const $categories = createStore<Category[]>([])
const $currentCategory = createStore<Category | null>(null)

sample({
  clock: loadCategories,
  source: $categories,
  filter: (categories) => !categories.length,
  target: fetchCategoriesFx.start
})

sample({
  clock: fetchCategoriesFx.finished.success,
  filter: (response) => response.result.success,
  fn: (response) => {
    return response.result.data || []
  },
  target: $categories
})

// sample({
//   clock: $categories,
//   source: $currentCategory,
//   fn: (current, categories) => {
//     if (current) {
//       if (categories.find((category) => category.title === current)) return current
//     }

//     if (categories.length) return 'Все'

//     return null
//   },
//   target: $currentCategory
// })

export { $categories, $currentCategory, loadCategories }

// $categories.watch((categories) => console.log('#categories: ', categories))
// $currentCategory.watch((category) => console.log('#currentCategory: ', category))
