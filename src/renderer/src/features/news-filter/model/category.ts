import { concurrency, createJsonQuery } from '@farfetched/core'
import { zodContract } from '@farfetched/zod'

import { createEvent, createStore, restore, sample } from 'effector'
import { z } from 'zod'

const ResponseCategories = z.object({
  success: z.boolean(),
  data: z.array(z.object({ title: z.string() })).optional(),
  message: z.string().optional()
})

const toggleIsOpen = createEvent<boolean>()
const setCategory = createEvent<string>()
const loadCategories = createEvent()

const $isOpen = restore(toggleIsOpen, false)
const $categories = createStore<string[]>([])
const $currentCategory = createStore<string | null>(null)
const $categoriesError = createStore<string | null>(null)

const fetchCategoriesFx = createJsonQuery({
  request: {
    method: 'GET',
    url: () => 'http://localhost:4444/categories/'
  },
  response: {
    contract: zodContract(ResponseCategories)
  }
})

concurrency(fetchCategoriesFx, { strategy: 'TAKE_FIRST' })

sample({
  clock: setCategory,
  target: $currentCategory
})

sample({
  clock: loadCategories,
  source: $categories,
  filter: (categories) => categories.length === 0,
  target: fetchCategoriesFx.start
})

sample({
  clock: fetchCategoriesFx.finished.success,
  filter: (response) => response.result.success,
  fn: (response) => ['Все', ...(response.result.data?.map(({ title }) => title) || [])],
  target: $categories
})

sample({
  clock: fetchCategoriesFx.finished.success,
  fn: () => 'Все',
  target: $currentCategory
})

sample({
  clock: fetchCategoriesFx.finished.success,
  filter: (response) => !response.result.success,
  fn: (response) => response.result.message || 'Неизвестная ошибка',
  target: $categoriesError
})

sample({
  clock: fetchCategoriesFx.finished.failure,
  fn: ({ error }) =>
    error instanceof Error ? error.message : 'Произошла неизвестная ошибка при получении категорий',
  target: $categoriesError
})

export {
  $isOpen,
  $categories,
  $currentCategory,
  $categoriesError,
  loadCategories,
  setCategory,
  toggleIsOpen,
  fetchCategoriesFx
}

// $isOpen.watch((open) => console.log(`#open-popover ${open}`))
// $categories.watch((categories) => console.log(`#categories ${categories}`))
// $currentCategory.watch((currentCategory) => console.log(`#currentCategory ${currentCategory}`))
// $categoriesError.watch((categoriesError) => console.log(`#categoriesError ${categoriesError}`))
// fetchCategoriesFx.$pending.watch((pending) => console.log(`#fetchCategories-pending ${pending}`))
