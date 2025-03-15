import { createEffect, createEvent, createStore, sample } from 'effector'

import { fetchNews } from '@shared/api'

import { NewsItem } from '../types'

const fetchNewsFx = createEffect(async () => {
  return await fetchNews()
})

const firstFetchNews = createEvent()

const $news = createStore<NewsItem[]>([])
const $isLoading = fetchNewsFx.pending

sample({
  clock: firstFetchNews,
  source: $news,
  filter: (existingNews) => existingNews.length === 0,
  target: fetchNewsFx
})

sample({
  clock: fetchNewsFx.doneData,
  source: $news,
  fn: (existingNews, newNews) => {
    const combinedNews = [...newNews, ...existingNews]
    return Array.from(new Map(combinedNews.map((item) => [item.link, item])).values())
  },
  target: $news
})

export { $news, fetchNewsFx, $isLoading, firstFetchNews }

$news.watch((store) => console.log('#news ', store))
