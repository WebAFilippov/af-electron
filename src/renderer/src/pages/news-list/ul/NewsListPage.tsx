import { useStoreMap, useUnit } from 'effector-react'
import { ChevronsLeft } from 'lucide-react'
import { FC, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { $currentCategory } from '@entities/categories'
import { $news, NewsPreview, NewsPreviewObserver } from '@entities/news'

import { cn } from '@shared/lib'
import { Button } from '@shared/ui'

import { updateScroll } from '../model/model'

export const NewsListPage: FC = () => {
  const navigate = useNavigate()
  const scrollRef = useRef<HTMLDivElement>(null)

  const [currentCategory] = useUnit([$currentCategory])
  const handleUpdateScroll = useUnit(updateScroll)
  const news = useStoreMap({
    store: $news,
    keys: [currentCategory],
    fn: (state, [category]) => state.find((news) => news.category === category?.title)
  })

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current && currentCategory?.title) {
        const scrollPosition = scrollRef.current.scrollTop
        handleUpdateScroll({ category: currentCategory.title, scroll: scrollPosition })
      }
    }

    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll)
    }

    if (scrollElement && news?.scroll) {
      scrollElement.scrollTop = news.scroll
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <div
      ref={scrollRef}
      className="relative flex h-full w-full select-none flex-col overflow-y-auto overflow-x-hidden"
    >
      <div className="sticky top-0 z-30 flex items-center justify-start gap-4 rounded-tl-2xl border-b border-border bg-background/80 backdrop-blur-sm transition-colors">
        <Button
          variant="ghost"
          className={cn(
            'h-full w-16 rounded-none border-none border-border text-foreground transition-colors'
          )}
          onClick={() => navigate('/news')}
        >
          <ChevronsLeft className="h-9 w-9 stroke-2" />
        </Button>
        <div className="flex w-full items-center justify-between gap-4 pr-4">
          <h1 className="text-3xl font-bold text-foreground">{currentCategory?.title}</h1>
        </div>
      </div>
      <div className="flex h-full w-full select-none snap-y flex-col px-10 pt-10">
        {news &&
          news.data.map((newsItem) => {
            return <NewsPreview newsItem={newsItem} key={newsItem.id} />
          })}
        {news && news.hasNextPage ? <NewsPreviewObserver /> : <div className="min-h-10 w-full" />}
      </div>
    </div>
  )
}
