import { useStoreMap } from 'effector-react'
import { ChevronsLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

import { $news, NewsDetail } from '@entities/news'

import { cn } from '@shared/lib'
import { Button } from '@shared/ui'

export const NewsDetailPage = () => {
  const navigate = useNavigate()
  const { newsId } = useParams()
  const detailNews = useStoreMap({
    store: $news,
    keys: [newsId],
    fn: (store, [newsId]) => {
      const flatedNews = store.flatMap((news) => news.data)
      return flatedNews.find((flatNews) => flatNews.id === newsId)
    }
  })

  return (
    <div className="relative flex h-full w-full select-none flex-col overflow-y-auto overflow-x-hidden">
      <div className="sticky top-0 z-30 flex max-h-14 h-14 items-center justify-start gap-4 rounded-tl-2xl border-b border-border bg-card/65 backdrop-blur-xl">
        <Button
          variant="ghost"
          className={cn(
            'h-full rounded-none rounded-tl-2xl border-r border-border transition-colors'
          )}
          onClick={() => navigate(-1)}
        >
          <ChevronsLeft className="h-9 w-9 stroke-2" />
        </Button>
        <div className="flex w-full items-center justify-between gap-4 pr-4">
          <h1 className="text-3xl font-bold">{detailNews?.title}</h1>
        </div>
      </div>
      <div className="flex h-full w-full select-none flex-col gap-6 p-10">
        {detailNews && <NewsDetail news={detailNews} />}
      </div>
    </div>
  )
}
