import { useGate, useUnit } from 'effector-react'
import { RefreshCw } from 'lucide-react'
import { FC } from 'react'

import { fetchCategoriesFx } from '@entities/categories'

import { cn } from '@shared/lib'
import { Button } from '@shared/ui'

import { refreshCategories, RefreshGate } from '../model/news-refresh'

export const NewsRefresh: FC = () => {
  useGate(RefreshGate)

  const [handleRefreshCategories, isLoading] = useUnit([
    refreshCategories,
    fetchCategoriesFx.$pending
  ])

  return (
    <Button
      onClick={() => handleRefreshCategories()}
      disabled={isLoading}
      className={cn('h-8 w-8 disabled:cursor-progress')}
    >
      <RefreshCw
        className={cn('h-4 w-4 stroke-background stroke-2', isLoading && 'animate-spin')}
      />
    </Button>
  )
}
