import { useUnit } from 'effector-react'
import { RefreshCw } from 'lucide-react'
import { FC } from 'react'

import { $isLoading } from '@entities/news'

import { cn } from '@shared/lib'
import { Button } from '@shared/ui'

import { refreshNews } from '../model/news-refresh'

export const NewsRefresh: FC = () => {
  const handleRefreshNews = useUnit(refreshNews)
  const isLoading = useUnit($isLoading)

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleRefreshNews}
      disabled={isLoading}
      className={cn('h-8 w-8 disabled:cursor-not-allowed')}
    >
      <RefreshCw strokeWidth={1} className={cn('h-6 w-6', isLoading && 'animate-spin')} />
    </Button>
  )
}
