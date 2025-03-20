import { sample } from 'effector'
import { createGate, useGate, useUnit } from 'effector-react'
import { RefreshCw } from 'lucide-react'
import { FC } from 'react'



import { cn } from '@shared/lib'
import { Button } from '@shared/ui'

import { addRefreshListener, refreshNews, removeRefreshListener } from '../model/news-refresh'

const Gate = createGate()
sample({
  clock: Gate.open,
  target: [addRefreshListener]
})
sample({
  clock: Gate.close,
  target: [removeRefreshListener]
})

export const NewsRefresh: FC = () => {
  useGate(Gate)
  const handleRefreshNews = useUnit(refreshNews)

  const isPendingFetchCategories = true


  return (
    <Button
      size="icon"
      onClick={handleRefreshNews}
      disabled={isPendingFetchCategories}
      className={cn('h-8 w-8 disabled:cursor-progress')}
    >
      <RefreshCw
        strokeWidth={2}
        className={cn('h-4 w-4 stroke-background', isPendingFetchCategories && 'animate-spin')}
      />
    </Button>
  )
}
