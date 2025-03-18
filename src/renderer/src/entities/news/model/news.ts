import { concurrency, createJsonQuery } from '@farfetched/core'
import { zodContract } from '@farfetched/zod'

import { combine, createStore, sample } from 'effector'

import { z } from 'zod'

import { $categories, $currentCategory, $sort, $take } from '@features/news-filter'
import { $searchQuery } from '@features/news-filter-queryString'

const ParsedNodeSchema = z.lazy(() =>
  z.object({
    root: z.boolean(),
    tag: z.string(),
    text: z.string(),
    attributes: z.record(z.string()),
    parentNode: z.string().nullable(),
    children: z.array(ParsedNodeSchema)
  })
)

const NewsSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  link: z.string().nullable(),
  pubDate: z.string(),
  content: z.array(ParsedNodeSchema).nullable(),
  category: z.object({ title: z.string() }).nullable(),
  creator: z.object({ name: z.string() }).nullable(),
  media: z
    .object({
      contentUrl: z.string().nullable(),
      thumbnailUrl: z.string().nullable(),
      credit: z.array(ParsedNodeSchema).nullable(),
      title: z.array(ParsedNodeSchema).nullable(),
      text: z.array(ParsedNodeSchema).nullable()
    })
    .nullable()
})

const ResponseNewsSchema = z.object({
  success: z.boolean(),
  data: z.array(NewsSchema).optional(),
  hasNextPage: z.boolean().optional(),
  nextCursor: z.string().nullable().optional(),
  message: z.string().optional()
})

type NewsProps = z.infer<typeof NewsSchema>

interface CategoryNews {
  category: string
  data: any
  scroll: number
  cursor: string | null
  hasNextPage: boolean
}

const $lastTimeFetch = createStore<number | null>(null)
const $news = createStore<CategoryNews[]>([])
const $newsError = createStore<string | null>(null)
const $queryString = combine(
  $news,
  $searchQuery,
  $currentCategory,
  $sort,
  $take,
  $lastTimeFetch,
  (news, qs, category, sort, take, lastTime) => {
    const queryString = new URLSearchParams()

    const currentNewsStore = news.find((news) => news.category === category)

    const query = {
      cursor: currentNewsStore?.cursor,
      qs,
      category,
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

    console.log(queryString.toString())

    return queryString.toString()
  }
)

sample({
  clock: $categories,
  filter: (categories) => categories.length > 1,
  fn: () => Date.now(),
  target: $lastTimeFetch
})

sample({
  clock: $categories,
  filter: (categories) => categories.length > 1,
  fn: (categories) => {
    return categories.map((category) => ({
      category,
      data: [],
      scroll: 0,
      cursor: null,
      hasNextPage: true
    }))
  },
  target: $news
})

const fetchNewsFx = createJsonQuery({
  request: {
    method: 'GET',
    url: () => 'http://localhost:4444/news',
    query: $queryString
  },
  response: {
    contract: zodContract(ResponseNewsSchema)
  }
})

concurrency(fetchNewsFx, { strategy: 'TAKE_LATEST' })

sample({
  clock: fetchNewsFx.finished.success,
  source: { news: $news, currentCategory: $currentCategory },
  filter: (_, response) => response.result.success,
  fn: ({ news, currentCategory }, response) => {
    const index = news.findIndex((n) => n.category === currentCategory)

    const mapped: CategoryNews = {
      category: currentCategory || 'Все',
      data: response.result.data || [],
      scroll: 0,
      cursor: response.result.nextCursor || null,
      hasNextPage: response.result.hasNextPage || false
    }

    const newNews = news
    newNews[index] = mapped

    console.log(newNews)

    return newNews
  },
  target: $news
})

sample({
  clock: fetchNewsFx.finished.success,
  filter: (response) => !response.result.success,
  fn: (response) => response.result.message || 'Неизвестная ошибка',
  target: $newsError
})

sample({
  clock: fetchNewsFx.finished.failure,
  fn: ({ error }) => {
    console.log(error)
    return 'error'
  },
  target: $newsError
})

export { $news, fetchNewsFx }

$lastTimeFetch.watch((date) => console.log(`#lastTimeFetch ${date}`))
$news.watch((store) => console.log('#news ', store))
$newsError.watch((error) => console.log('#newsError ', error))
fetchNewsFx.$pending.watch((pending) => console.log(`#fetchNewsFx-pending ${pending}`))
fetchNewsFx.$failed.watch((fail) => console.log(`#fail ${fail}`))
$queryString.watch((query) => console.log('#queryString ', query))
