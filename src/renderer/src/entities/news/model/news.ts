import { createEffect, createEvent, createStore, sample } from 'effector'

import { fetchNews } from '@shared/api/news'

import { NewsItem } from '../types'

const fetchNewsFx = createEffect(async () => {
  return await fetchNews()
})

const firstFetchNews = createEvent()

const $isLoading = fetchNewsFx.pending
const $news = createStore<NewsItem[]>([])

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

export { $news, $isLoading, fetchNewsFx, firstFetchNews }

$news.watch((store) => console.log('#news ', store))
$isLoading.watch((store) => console.log('#isLoading ', store))
