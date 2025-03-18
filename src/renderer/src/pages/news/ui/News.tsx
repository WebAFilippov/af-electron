import { sample } from 'effector'
import { createGate, useGate } from 'effector-react'

import { loadCategories } from '@features/news-filter'
import { addRefreshListener, removeRefreshListener } from '@features/news-refresh'

const Gate = createGate()
sample({
  clock: Gate.open,
  target: [addRefreshListener, loadCategories, loadCategories]
})
sample({
  clock: Gate.close,
  target: [removeRefreshListener]
})

export const News = () => {
  useGate(Gate)

  return (
    <div className="relative flex h-full w-full select-none flex-col overflow-y-auto overflow-x-hidden">
      News INDEX
      {/* {categories.map((category) => {
        return <div></div>
      })} */}
      {/* {!currentCategory && (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-center text-4xl italic text-muted-foreground">Выберите категорию</p>
        </div>
      )} */}
      {/* {isLoading ? (
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
      )} */}
    </div>
  )
}
