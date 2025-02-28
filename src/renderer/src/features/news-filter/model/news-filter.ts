import { combine, createApi, createStore } from 'effector'

import { $news } from '@entities/news'

const $categories = $news.map((news) => {
  const validCategories = news
    .map((item) => item.category)
    .filter((category): category is string => !!category && category.trim() !== '') // Исключаем null, undefined и пустые строки
  return ['Все', ...new Set(validCategories)]
})
const $currentCategory = createStore<string>('Все')
const $filteredNews = combine($news, $currentCategory, (news, category) =>
  category === 'Все' ? news : news.filter((news) => news.category.includes(category))
)

const { setCategory } = createApi($currentCategory, {
  setCategory: (_, category: string) => category
})

export { $categories, $currentCategory, $filteredNews, setCategory }

$categories.watch((categories) => console.log('#categories ', categories))
$currentCategory.watch((currentCategory) => console.log('#currentCategory ', currentCategory))
$filteredNews.watch((store) => console.log('#filteredNews ', store))
