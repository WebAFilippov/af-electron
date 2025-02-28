import { NewsItem } from '@entities/news'

const fetchNews = async (): Promise<NewsItem[]> => {
  return await window.api.fetchNews()
}

export { fetchNews }