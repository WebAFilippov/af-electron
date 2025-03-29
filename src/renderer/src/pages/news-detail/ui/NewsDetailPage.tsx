import { useStoreMap } from 'effector-react'
import { ChevronsLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

import { $news, NewsDetail } from '@entities/news'

import { cn, formatedDate } from '@shared/lib'
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
      <div className="sticky top-0 z-30 flex items-center justify-start gap-4 rounded-tl-2xl border-b border-border bg-background/80 backdrop-blur-sm transition-colors">
        <Button
          variant="ghost"
          className={cn('h-full w-16 rounded-none border-none border-border text-foreground')}
          onClick={() => navigate(-1)}
        >
          <ChevronsLeft className="h-9 w-9 stroke-2" />
        </Button>

        <div className="space-y-1 py-3 pr-4">
          <h1 className="w-full text-3xl font-bold leading-7 text-foreground">
            {detailNews && detailNews.title}
          </h1>
          <div className="w-full divide-x divide-dotted divide-card-foreground/50">
            <span className="pr-2 text-sm italic tracking-tighter text-muted-foreground">
              {detailNews && formatedDate(detailNews.pubDate)}
            </span>
            <span className="px-2 text-sm italic tracking-tighter text-muted-foreground">
              {detailNews?.category?.title || 'Не указана'}
            </span>
            <span className="pl-2 text-sm italic tracking-tighter text-muted-foreground">
              {(detailNews && detailNews.creator?.name) || 'Не указан'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex h-full w-full select-none flex-col gap-6 py-5">
        {detailNews && <NewsDetail news={detailNews} />}
      </div>
    </div>
  )
}
