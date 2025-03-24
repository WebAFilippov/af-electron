import { useIntersectionObserver } from '@uidotdev/usehooks'

import { useUnit } from 'effector-react'
import { RefreshCw } from 'lucide-react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { cn } from '@shared/lib'

import { fetchNewsQuery, loadNews } from '../api/fetch-news'

export const NewsPreviewObserver = () => {
  const [ref, entry] = useIntersectionObserver({
    threshold: 1,
    root: null,
    rootMargin: '20px 0px 0px 0px'
  })

  const location = useLocation()
  const [handleLoadNews, isLoading] = useUnit([loadNews, fetchNewsQuery.$pending])

  useEffect(() => {
    if (entry?.isIntersecting) {
      console.log('dsadsa')
      handleLoadNews()
    }
  }, [entry?.isIntersecting, location.pathname])

  return (
    <div
      ref={ref}
      className={`flex h-10 w-full items-center justify-center gap-2 transition-opacity duration-300`}
    >
      {isLoading && (
        <>
          <RefreshCw className={cn('h-4 w-4 animate-spin stroke-foreground stroke-2')} />
          <span className="text-sm text-muted-foreground">Загрузка новостей...</span>
        </>
      )}
    </div>
  )
}
