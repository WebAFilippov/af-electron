import { combine, createEvent, createStore, sample } from 'effector'

import { Category } from '../types/query'
import { $news } from './news'

const setQueryCategory = createEvent<Category>()

const $queryCategory = createStore<Category | null>(null)
const $queryTimelapse = createStore<number | null>(null)
const $queryCursor = combine($news, $queryCategory, (news, category) => {
  const currentNewsStore = news.find((news) => news.category === category?.title)
  return currentNewsStore?.cursor || ''
})
const $queryObject = combine(
  $queryCursor,
  $queryCategory,
  $queryTimelapse,
  (cursor, category, timelapse) => ({
    cursor: cursor,
    category: category && category.title,
    timelapse
  })
)

sample({
  clock: setQueryCategory,
  target: $queryCategory
})

export { $queryObject, $queryTimelapse, setQueryCategory }

// $queryCursor.watch((store) => console.log('#queryCursor: ', store))
// $queryCategory.watch((store) => console.log('#queryCategory: ', store))
// $queryTimelapse.watch((store) => console.log('#queryTimelapse: ', store))
// $queryObject.watch((store) => console.log('#queryObject: ', store))
