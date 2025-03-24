import { useStoreMap, useUnit } from 'effector-react'
import { ChevronsLeft } from 'lucide-react'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { $currentCategory } from '@entities/categories'
import { $news, NewsPreview, NewsPreviewObserver } from '@entities/news'

import { Button } from '@shared/ui'

export const NewsList: FC = () => {
  const navigate = useNavigate()

  const [currentCategory] = useUnit([$currentCategory])
  const news = useStoreMap({
    store: $news,
    keys: [currentCategory],
    fn: (state, [category]) => state.find((news) => news.category === category?.title)
  })

  return (
    <div className="relative flex h-full w-full select-none flex-col overflow-y-auto overflow-x-hidden">
      <div className="sticky top-0 z-30 flex min-h-14 items-center justify-start gap-4 rounded-tl-2xl border-b border-border bg-card/65 backdrop-blur-xl">
        <Button
          variant="ghost"
          className="h-full rounded-none rounded-tl-2xl border-r border-border"
          onClick={() => navigate('/news')}
        >
          <ChevronsLeft className="h-8 w-8 stroke-2" />
        </Button>
        <div className="flex w-full items-center justify-between gap-4 pr-4">
          <h1 className="text-3xl font-bold">{currentCategory?.title}</h1>
        </div>
      </div>
      <div className="flex h-full w-full select-none flex-col gap-6 p-10">
        {news &&
          news.data.map((newsItem) => {
            return <NewsPreview newsItem={newsItem} key={newsItem.id + newsItem.slug} />
          })}
        {news && news.hasNextPage ? (
          <NewsPreviewObserver />
        ) : (
          <div className="h-5 min-h-5 w-full" />
        )}
      </div>
    </div>
  )
}
