import { NewsItem } from '@entities/news'

export const fetchNews = async (): Promise<NewsItem[]> => {
  return await window.api.fetchNews()
}
