import { useIntersectionObserver } from '@uidotdev/usehooks'

import { useUnit } from 'effector-react'
import { RefreshCw } from 'lucide-react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { cn } from '@shared/lib'

import { loadNews } from '../api/fetch-news'

export const NewsPreviewObserver = () => {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0.1,
    root: null,
    rootMargin: '200px 0px 0px 0px'
  })

  const location = useLocation()
  const [handleLoadNews] = useUnit([loadNews])

  useEffect(() => {
    if (entry?.isIntersecting) {
      handleLoadNews()
    }
  }, [entry?.isIntersecting, location.pathname])

  return (
    <div ref={ref} className="flex w-full items-center justify-center gap-4 p-10">
      <RefreshCw className={cn('h-4 w-4 animate-spin stroke-foreground stroke-2')} />
      <span className="text-sm text-muted-foreground">Загрузка новостей...</span>
    </div>
  )
}
