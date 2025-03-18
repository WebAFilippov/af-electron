import { createEvent, createStore } from 'effector'
import { debounce } from 'patronum/debounce'

const DEBOUNCE_TIMEOUT_IN_MS = 500

const setSearchQuery = createEvent<string>()
const resetSeachQuery = createEvent()

const $searchQuery = createStore<string>('').reset(resetSeachQuery)

debounce({
  source: setSearchQuery,
  timeout: DEBOUNCE_TIMEOUT_IN_MS,
  target: $searchQuery
})

export { $searchQuery, setSearchQuery }

// $searchQuery.watch((searchQuery) => console.log('#searchQuery ', searchQuery))
