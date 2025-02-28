import { sample } from 'effector'
import { createGate, useGate, useUnit } from 'effector-react'

import { $filteredNews, NewsFilter } from '@features/news-filter'
import { addRefreshListener, NewsRefresh, removeRefreshListener } from '@features/news-refresh'

import { $isLoading, firstFetchNews } from '@entities/news'
import { CardNews } from '@entities/news/ui/CardNews'
import { CardNewsSkeleton } from '@entities/news/ui/CardNewsSkeleton'

const Gate = createGate()
sample({
  clock: Gate.open,
  target: [firstFetchNews, addRefreshListener]
})
sample({
  clock: Gate.close,
  target: [removeRefreshListener]
})

export const NewsPage = () => {
  useGate(Gate)
  const filteredNews = useUnit($filteredNews)
  const isLoading = useUnit($isLoading)

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h1 className="text-2xl font-bold">Новости</h1>
        <div className="flex w-1/4 items-center gap-2">
          <NewsFilter />
          <NewsRefresh />
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-6 overflow-y-auto overflow-x-hidden px-8 py-3">
          {Array(10)
            .fill(null)
            .map((_, index) => (
              <CardNewsSkeleton key={index} />
            ))}
        </div>
      ) : (
        <ul className="space-y-6 overflow-y-auto overflow-x-hidden px-8 py-3">
          {filteredNews.length > 0 ? (
            filteredNews.map((item, index) => (
              <li key={index}>
                <CardNews news={item} />
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
