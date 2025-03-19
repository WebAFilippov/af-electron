import { useIntersectionObserver } from '@uidotdev/usehooks'

import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { cn, formatedDate } from '@shared/lib'
import { Card, CardDescription, CardHeader, CardTitle } from '@shared/ui'

interface CardNewsProps {
  news: any
}

export const News: FC<CardNewsProps> = ({ news }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [date, setDate] = useState(formatedDate(news.pubDate.toISOString()))
  const [ref, entry] = useIntersectionObserver({
    threshold: [0.2, 0.8],
    root: null,
    rootMargin: '0px 0px 0px 0px'
  })

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null
    if (entry?.isIntersecting) {
      setIsVisible(true)
      intervalId = setInterval(() => {
        setDate(formatedDate(news.pubDate.toISOString()))
      }, 3000)
    }

    return () => {
      if (intervalId) {
        setIsVisible(false)
        clearInterval(intervalId)
      }
    }
  }, [entry?.isIntersecting])

  const getContentText = (): string => {
    if (!news.content || news.content.length === 0) return 'Нет описания'
    const firstText = news.content.find((node) => node.text && node.text.trim() !== '')?.text
    return firstText || 'Нет описания'
  }

  return (
    <Card
      ref={ref}
      className={cn('opacity-5 transition-all duration-500', isVisible && 'opacity-100')}
    >
      <CardHeader className={cn('z-0 flex select-none flex-row gap-2 p-3')}>
        {news.media?.thumbnailUrl ? (
          <div className="pointer-events-none m-1 h-36 w-36 flex-shrink-0">
            <img
              src={news.media.thumbnailUrl}
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
              to={`/news/${news.slug}`}
              className="cursor-pointer text-xl font-extrabold leading-6 antialiased outline-black hover:underline"
            >
              {news.title}
            </Link>
          </CardTitle>
          <CardDescription className="line-clamp-3 text-base italic leading-4 antialiased">
            {getContentText()}
          </CardDescription>
          <div className="flex divide-x divide-dotted divide-card-foreground/50">
            <CardDescription className="pr-2 text-sm italic tracking-tighter text-card-foreground">
              {date}
            </CardDescription>
            {/* <CardDescription className="px-2 text-sm italic tracking-tighter text-card-foreground">
              {news.category || 'Не указана'}
            </CardDescription>
            <CardDescription className="pl-2 text-sm italic tracking-tighter text-card-foreground">
              {news.creator || 'Не указан'}
            </CardDescription> */}
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
