import { concurrency, createQuery } from '@farfetched/core'
import { zodContract } from '@farfetched/zod'

import { createEffect, createEvent, sample } from 'effector'

import { $queryString } from '../model/query-string'
import { ResponseNewsSchema } from '../types/news'

const loadNews = createEvent()

const fetchNewsFx = createEffect(async ({ query }: { query: string }) => {
  console.log(query)
  return await window.api.fetchNews(query)
})

const fetchNewsQuery = createQuery({
  effect: fetchNewsFx,
  contract: zodContract(ResponseNewsSchema)
})

concurrency(fetchNewsQuery, { strategy: 'TAKE_FIRST' })

sample({
  clock: loadNews,
  source: $queryString,
  fn: (queryString) => ({
    query: queryString
  }),
  target: fetchNewsQuery.start
})

export { loadNews, fetchNewsQuery }
