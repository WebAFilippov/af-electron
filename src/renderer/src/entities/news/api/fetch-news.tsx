import { concurrency, createQuery } from '@farfetched/core'
import { zodContract } from '@farfetched/zod'

import { createEffect, createEvent, sample } from 'effector'

import { $news } from '../model/news'
import { $queryObject } from '../model/query-object'
import { ResponseNewsSchema } from '../types/news'

const loadNews = createEvent()

const fetchNewsFx = createEffect(
  async ({
    query
  }: {
    query: {
      cursor: string
      category: string | null
      timelapse: number | null
    }
  }) => {
    const queryString = new URLSearchParams()

    Object.entries(query).forEach(([key, value]) => {
      if (value) {
        queryString.set(key, value.toString())
      }
    })

    return await window.api.fetchNews(queryString.toString())
  }
)

const fetchNewsQuery = createQuery({
  effect: fetchNewsFx,
  contract: zodContract(ResponseNewsSchema)
})

concurrency(fetchNewsQuery, { strategy: 'TAKE_LATEST' })

sample({
  clock: loadNews,
  source: $queryObject,
  filter: (queryObject) => !!queryObject,
  fn: (queryObject) => ({
    query: queryObject
  }),
  target: fetchNewsQuery.start
})

sample({
  clock: fetchNewsQuery.finished.success,
  source: $news,
  filter: (_news, response) => response.result.success,
  fn: (news, response) => {
    const { category } = response.params.query
    const { data, nextCursor, hasNextPage } = response.result
    const newNews = news.map((item) =>
      item.category === category
        ? {
            ...item,
            data: [...item.data, ...(data ?? [])],
            cursor: nextCursor ?? item.cursor,
            hasNextPage: hasNextPage ?? item.hasNextPage
          }
        : item
    )

    return newNews
  },
  target: $news
})

export { fetchNewsQuery, loadNews }

// fetchNewsQuery.$pending.watch((pending) => console.log(`#fetchNewsQuery_pending: ${pending}`))
