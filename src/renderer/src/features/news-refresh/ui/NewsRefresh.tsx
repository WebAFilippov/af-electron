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
      variant={'outline'}
      className={cn(
        'h-full w-16 rounded-none border-none border-border transition-colors duration-0 disabled:cursor-progress'
      )}
      disabled={isLoading}
      onClick={() => handleRefreshCategories()}
    >
      <div className="flex h-9 w-9 items-center justify-center">
        <RefreshCw
          className={cn('h-6 w-6 stroke-foreground stroke-2', isLoading && 'animate-spin')}
        />
      </div>
    </Button>
  )
}
