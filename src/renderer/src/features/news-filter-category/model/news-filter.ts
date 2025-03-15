import { createEffect, createEvent, restore, sample } from 'effector'

interface Category {
  title: string
}

interface ResponseCategories {
  success: boolean
  data?: Category[]
  message?: string
}

const fetchCategoriesFx = createEffect<void, ResponseCategories, Error>(async () => {
  const response = await fetch('http://localhost:4444/categories/', {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })

  return await response.json()
})

const setCategory = createEvent<string>()
const setCategories = createEvent<string[]>()
const setError = createEvent<{ message: string } | null>()

const $categories = restore(setCategories, ['Все'])
const $currentCategory = restore(setCategory, 'Все')
const $errorCategories = restore(setError, null)

sample({
  clock: fetchCategoriesFx,
  fn: () => null,
  target: setError
})

sample({
  clock: fetchCategoriesFx.doneData,
  filter: (response: ResponseCategories): response is { success: boolean; message: string } =>
    !response.success,
  fn: (response) => {
    return { message: response.message }
  },
  target: setError
})

sample({
  clock: fetchCategoriesFx.failData,
  fn: (error) => {
    return { message: error.message }
  },
  target: setError
})

sample({
  clock: fetchCategoriesFx.doneData,
  filter: (response) => response.success,
  fn: (response) => {
    const categoryTitles = response.data?.map((item) => item.title) || []
    return ['Все', ...categoryTitles]
  },
  target: setCategories
})

export { $categories, $currentCategory, $errorCategories, setCategory, fetchCategoriesFx }

// $categories.watch((categories) => console.log('#categories ', categories))
// $currentCategory.watch((currentCategory) => console.log('#currentCategory ', currentCategory))
// $errorCategories.watch((errorCategories) => console.log('#errorCategories ', errorCategories))
