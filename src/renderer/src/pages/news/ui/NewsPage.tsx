import { sample } from 'effector'
import { createGate, useGate, useStoreMap, useUnit } from 'effector-react'

import { NewsFilter } from '@features/news-filter'
import { $currentCategory, fetchCategoriesFx } from '@features/news-filter-category'
import { NewsFilterSearch } from '@features/news-filter-queryString'
import { addRefreshListener, NewsRefresh, removeRefreshListener } from '@features/news-refresh'

import { $isLoading, $news, firstFetchNews } from '@entities/news'
import { CardNews } from '@entities/news/ui/CardNews'
import { CardNewsSkeleton } from '@entities/news/ui/CardNewsSkeleton'

const Gate = createGate()
sample({
  clock: Gate.open,
  target: [firstFetchNews, addRefreshListener, fetchCategoriesFx]
})
sample({
  clock: Gate.close,
  target: [removeRefreshListener]
})

export const NewsPage = () => {
  useGate(Gate)
  const isLoading = useUnit($isLoading)
  const currentCategory = useUnit($currentCategory)
  const filteredNews = useStoreMap({
    store: $news,
    keys: [currentCategory],
    fn: (news, [category]) =>
      category === 'Все' ? news : news.filter((news) => news.category.includes(category))
  })

  return (
    <div className="relative flex h-full w-full select-none flex-col overflow-y-auto overflow-x-hidden">
      <div className="sticky top-0 z-50 flex items-center justify-between rounded-tl-2xl border-b bg-background/65 px-8 py-3 backdrop-blur-xl">
        <h1 className="text-3xl font-bold">
          {`Новости: ${currentCategory}`}
        </h1>
        <div className="flex items-center justify-center gap-2">
          <NewsRefresh />
          <NewsFilter />
          <NewsFilterSearch />
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-6 px-8 py-3">
          {Array(10)
            .fill(null)
            .map((_, index) => (
              <CardNewsSkeleton key={index} />
            ))}
        </div>
      ) : (
        <ul className="space-y-6 px-8 py-3">
          {filteredNews.length > 0 ? (
            filteredNews.map((news, index) => (
              <li key={index}>
                <CardNews news={news} />
              </li>
            ))
          ) : (
            <p className="text-center text-muted-foreground">Нет новостей в выбранной категории</p>
          )}
        </ul>
      )}
    </div>
  )
}
