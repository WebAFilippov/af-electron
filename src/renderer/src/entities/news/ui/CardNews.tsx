import { FC } from 'react'
import { Link } from 'react-router'

import { useIntersectionObserver } from '@shared/lib'
import { Card, CardDescription, CardHeader, CardTitle, Separator } from '@shared/ui'

import { NewsItem } from '../types'

interface CardNewsProps {
  news: NewsItem
}

export const CardNews: FC<CardNewsProps> = ({ news }) => {
  const { ref, formattedDate } = useIntersectionObserver(news.pubDate)

  const getContentText = (): string => {
    if (!news.content || news.content.length === 0) return 'Нет описания'
    const firstText = news.content.find((node) => node.text && node.text.trim() !== '')?.text
    return firstText || 'Нет описания'
  }

  return (
    <Card ref={ref}>
      <CardHeader className="flex select-none flex-row gap-2 p-3">
        {news.media?.thumbnailUrl ? (
          <div className="pointer-events-none m-1 h-36 w-36 flex-shrink-0">
            <img
              src={news.media.thumbnailUrl}
              alt={news.media.credit || news.title}
              className="h-full w-full rounded-md object-cover"
            />
          </div>
        ) : (
          <div className="pointer-events-none m-1 flex h-36 w-36 flex-shrink-0 items-center justify-center rounded-md bg-card-foreground">
            <span className="text-sm font-medium text-card">Нет фото</span>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <CardTitle>
            <Link
              to={`/news/${news.slug}`}
              className="cursor-pointer text-xl font-extrabold leading-6 antialiased hover:underline"
            >
              {news.title}
            </Link>
          </CardTitle>
          <CardDescription className="line-clamp-3 text-base italic leading-4 antialiased">
            {getContentText()}
          </CardDescription>
          <div className="flex gap-2">
            <CardDescription className="text-sm italic tracking-tighter text-card-foreground">
              {formattedDate}
            </CardDescription>
            <Separator orientation="vertical" />
            <CardDescription className="text-sm italic tracking-tighter text-card-foreground">
              {news.category || 'Не указана'}
            </CardDescription>
            <Separator orientation="vertical" />
            <CardDescription className="text-sm italic tracking-tighter text-card-foreground">
              {news.creator || 'Не указан'}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
