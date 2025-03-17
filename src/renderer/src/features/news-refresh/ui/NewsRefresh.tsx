import { useUnit } from 'effector-react'
import { RefreshCw } from 'lucide-react'
import { FC } from 'react'

import { fetchCategoriesFx } from '@features/news-filter'

import { $isLoading } from '@entities/news'

import { cn } from '@shared/lib'
import { Button } from '@shared/ui'

import { refreshNews } from '../model/news-refresh'

export const NewsRefresh: FC = () => {
  const handleRefreshNews = useUnit(refreshNews)
  const isLoading = useUnit($isLoading)
  const isPendingFetchCategories = useUnit(fetchCategoriesFx.$pending)

  return (
    <Button
      size="icon"
      onClick={handleRefreshNews}
      disabled={isLoading || isPendingFetchCategories}
      className={cn('h-8 w-8 disabled:cursor-progress')}
    >
      <RefreshCw
        strokeWidth={2}
        className={cn(
          'h-4 w-4 stroke-background',
          isLoading || (isPendingFetchCategories && 'animate-spin')
        )}
      />
    </Button>
  )
}
