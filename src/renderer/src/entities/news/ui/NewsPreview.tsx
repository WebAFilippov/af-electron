import { FC } from 'react'
import { Link } from 'react-router-dom'

import { cn, formatedDate } from '@shared/lib'
import { Card, CardDescription, CardHeader, CardTitle } from '@shared/ui'

import { NewsItem } from '../types/news'

interface Props {
  newsItem: NewsItem
}

export const NewsPreview: FC<Props> = ({ newsItem }) => {
  const getContentText = (): string => {
    if (!newsItem.content || newsItem.content.length === 0) return 'Нет описания'
    return (
      newsItem.content.find((node) => node.text && node.text.trim() !== '')?.text || 'Нет описания'
    )
  }

  return (
    <Card>
      <CardHeader className={cn('z-0 flex select-none flex-row gap-2 p-3')}>
        {newsItem.media?.thumbnailUrl ? (
          <div className="pointer-events-none m-1 h-36 w-36 flex-shrink-0">
            <img
              src={newsItem.media.thumbnailUrl}
              alt={'Фото'}
              className={cn('h-full w-full rounded-md bg-muted object-cover')}
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
              to={`/news/${newsItem.slug}`}
              className="cursor-pointer text-xl font-extrabold leading-6 antialiased outline-black hover:underline"
            >
              {newsItem.title}
            </Link>
          </CardTitle>
          <CardDescription className="line-clamp-3 text-base italic leading-4 antialiased">
            {getContentText()}
          </CardDescription>
          <div className="flex divide-x divide-dotted divide-card-foreground/50">
            <CardDescription className="pr-2 text-sm italic tracking-tighter text-card-foreground">
              {formatedDate(newsItem.pubDate)}
            </CardDescription>
            <CardDescription className="px-2 text-sm italic tracking-tighter text-card-foreground">
              {newsItem.category?.title || 'Не указана'}
            </CardDescription>
            <CardDescription className="pl-2 text-sm italic tracking-tighter text-card-foreground">
              {newsItem.creator?.name || 'Не указан'}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
