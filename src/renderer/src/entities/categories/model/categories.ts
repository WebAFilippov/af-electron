import { createEvent, createStore, sample } from 'effector'

import { fetchCategoriesFx } from '../api/fetch-categories'
import { ICategory } from '../types'

const loadCategories = createEvent()

const $categories = createStore<ICategory[]>([])
const $currentCategory = createStore<string | null>(null)

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
    const allCount = response.result.data?.reduce((acc, { count }) => acc + count, 0) || 0
    const all = { slug: 'All', title: 'Все', count: allCount }
    return [all, ...(response.result.data || [])]
  },
  target: $categories
})

sample({
  clock: $categories,
  source: $currentCategory,
  fn: (current, categories) => {
    if (current) {
      if (categories.find((category) => category.title === current)) return current
    }

    if (categories.length) return 'Все'

    return null
  },
  target: $currentCategory
})

export { $categories, $currentCategory, loadCategories }
