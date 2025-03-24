import { createEvent, createStore, sample } from 'effector'
import { debounce } from 'patronum'

import { $querySearch } from '@entities/news'

const DEBOUNCE_TIMEOUT_IN_MS = 500

const setSearchInput = createEvent<string>()

const $searchInput = createStore('')

debounce({
  source: setSearchInput,
  timeout: DEBOUNCE_TIMEOUT_IN_MS,
  target: $querySearch
})

sample({
  clock: setSearchInput,
  target: $searchInput
})

export { $searchInput, setSearchInput }

// $searchInput.watch((state) => console.log('#search input: ', state))
