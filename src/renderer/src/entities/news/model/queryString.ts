import { combine, createEvent, createStore, sample } from 'effector'

import { Category } from '../types/query'
import { $news } from './news'

const setLastTimeFetch = createEvent<number | null>()

const $queryCategory = createStore<Category | null>(null)
const $querySorting = createStore({ by: 'pubDate', order: 'desc' })
const $queryTake = createStore(25)
const $lastTimeFetch = createStore<number | null>(null)
const $queryString = combine(
  $news,
  $queryCategory,
  $querySorting,
  $queryTake,
  $lastTimeFetch,
  (news, category, sort, take, lastTime) => {
    const queryString = new URLSearchParams()

    // const currentNewsStore = news.find((news) => news.category === category)

    const query = {
      categoty: category && category.title,
      sortBy: sort.by,
      sortOrder: sort.order,
      take,
      lastTime
      // cursor: currentNewsStore?.cursor,
      // qs,
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

export { $querySorting, $queryTake, $queryCategory, setLastTimeFetch }

$queryCategory.watch((store) => console.log('#queryCategory: ', store))
$querySorting.watch((store) => console.log(`#querySorting: by_ ${store.by} order_ ${store.order}`))
$queryTake.watch((store) => console.log('#queryTake: ', store))
$lastTimeFetch.watch((store) => console.log('#lastTimeFetch: ', store))
$queryString.watch((store) => console.log('#queryString: ', store))

// cursor,
// take,
// qs,
// category,
// sortBy,
// sortOrder,
// lastTime,
