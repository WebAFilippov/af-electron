import { combine, createEvent, createStore, sample } from 'effector'

import { Category } from '../types/query'
import { $news } from './news'

const setLastTimeFetch = createEvent<number | null>()
const resetQueryCategory = createEvent()

const $querySearch = createStore('')
const $queryCategory = createStore<Category | null>(null).reset(resetQueryCategory)
const $querySorting = createStore({ by: 'pubDate', order: 'desc' })
const $queryTake = createStore(25)
const $lastTimeFetch = createStore<number | null>(null)
const $queryCursor = combine($news, $queryCategory, (news, category) => {
  const currentNewsStore = news.find((news) => news.category === category?.title)
  return currentNewsStore?.cursor || ''
})
const $queryString = combine(
  $queryCursor,
  $querySearch,
  $queryCategory,
  $querySorting,
  $queryTake,
  $lastTimeFetch,
  (cursor, qs, category, sort, take, lastTime) => {
    const queryString = new URLSearchParams()

    const query = {
      cursor: cursor,
      qs,
      category: category && category.title,
      sortBy: sort.by,
      sortOrder: sort.order,
      take,
      lastTime
    }

    Object.entries(query).forEach(([key, value]) => {
      if (value) {
        queryString.set(key, value.toString())
      }
    })

    return queryString.toString()
  }
)

sample({
  clock: setLastTimeFetch,
  target: $lastTimeFetch
})

export {
  $queryString,
  $querySearch,
  $querySorting,
  $queryTake,
  $queryCategory,
  setLastTimeFetch,
  resetQueryCategory
}

// $querySearch.watch((store) => console.log('#querySearch: ', store))
// $queryCursor.watch((store) => console.log('#queryCursor: ', store))
// $queryCategory.watch((store) => console.log('#queryCategory: ', store))
// $querySorting.watch((store) => console.log(`#querySorting: by_ ${store.by} order_ ${store.order}`))
// $queryTake.watch((store) => console.log('#queryTake: ', store))
// $lastTimeFetch.watch((store) => console.log('#lastTimeFetch: ', store))
// $queryString.watch((store) => console.log('#queryString: ', store))
