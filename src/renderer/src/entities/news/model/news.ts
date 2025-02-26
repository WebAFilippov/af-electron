import { createApi, createEffect, createStore, sample } from 'effector'

import { NewsItem } from '../types'

const $loading = createStore<boolean>(false)
const $news = createStore<NewsItem[]>([])

const { setLoading } = createApi($loading, {
  setLoading: (_, loading: boolean) => loading
})

const fetchNewsFx = createEffect(async () => {
  return await window.api.fetchNews()
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

sample({
  clock: fetchNewsFx,
  fn: () => true,
  target: setLoading
})

sample({
  clock: fetchNewsFx.finally,
  fn: () => false,
  target: setLoading
})

export { $news, $loading, fetchNewsFx }

$news.watch((store) => console.log('#news ', store))
