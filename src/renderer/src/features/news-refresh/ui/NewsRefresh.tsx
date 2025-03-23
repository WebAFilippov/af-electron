import { useGate, useUnit } from 'effector-react'
import { RefreshCw } from 'lucide-react'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { fetchCategoriesFx } from '@entities/categories'

import { cn } from '@shared/lib'
import { Button } from '@shared/ui'

import { GateRefresh, refreshCategories } from '../model/news-refresh'

export const NewsRefresh: FC = () => {
  const navigate = useNavigate()
  useGate(GateRefresh, { navigate })
  const handleRefreshCategories = useUnit(refreshCategories)
  const isLoading = useUnit(fetchCategoriesFx.$pending)

  return (
    <Button
      size="icon"
      onClick={() => handleRefreshCategories()}
      disabled={isLoading}
      className={cn('h-8 w-8 disabled:cursor-progress')}
    >
      <RefreshCw
        strokeWidth={2}
        className={cn('h-4 w-4 stroke-background', isLoading && 'animate-spin')}
      />
    </Button>
  )
}
