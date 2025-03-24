import { createEvent, createStore, sample } from 'effector'

import { fetchCategoriesFx } from '../api/fetch-categories'
import { Category } from '../types'

const loadCategories = createEvent()
const setCurrentCategory = createEvent<Category>()

const $categories = createStore<Category[]>([])
const $currentCategory = createStore<Category | null>(null)

sample({
  clock: setCurrentCategory,
  target: $currentCategory
})

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

export { $categories, $currentCategory, loadCategories, setCurrentCategory }

// $categories.watch((categories) => console.log('#categories: ', categories))
$currentCategory.watch((category) => console.log('#currentCategory: ', category))
