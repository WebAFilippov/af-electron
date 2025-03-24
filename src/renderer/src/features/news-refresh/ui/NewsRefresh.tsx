import { useGate, useUnit } from 'effector-react'
import { RefreshCw } from 'lucide-react'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { cn } from '@shared/lib'
import { Button } from '@shared/ui'

import { GateRefresh, refreshCategories } from '../model/news-refresh'

interface Props {
  isLoading: boolean
}

export const NewsRefresh: FC<Props> = ({ isLoading }) => {
  const navigate = useNavigate()
  useGate(GateRefresh, { navigate })
  const handleRefreshCategories = useUnit(refreshCategories)

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
