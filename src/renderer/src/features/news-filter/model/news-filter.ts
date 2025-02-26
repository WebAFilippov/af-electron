import { combine, createApi, createStore } from 'effector'

import { $news } from '@entities/news'

const $categories = $news.map((news) => ['Все', ...new Set(news.map((item) => item.category))])
const $currentCategory = createStore<string>('Все')
const $filteredNews = combine($news, $currentCategory, (news, category) =>
  category === 'Все' ? news : news.filter((news) => news.category === category)
)

const { setCategory } = createApi($currentCategory, {
  setCategory: (_, category: string) => category
})

export { $categories, $currentCategory, $filteredNews, setCategory }

$categories.watch((categories) => console.log('#categories ', categories))
$currentCategory.watch((currentCategory) => console.log('#currentCategory ', currentCategory))
$filteredNews.watch((store) => console.log('#filteredNews ', store))
