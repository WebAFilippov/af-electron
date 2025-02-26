import { useUnit } from 'effector-react'
import { RefreshCw } from 'lucide-react'
import { FC } from 'react'

import { cn } from '@shared/lib'
import { Button } from '@shared/ui'

import { refreshNews } from '../model/news-refresh'

interface NewsRefreshProps {
  onRefresh: () => void
  loading: boolean
}

export const NewsRefresh: FC<NewsRefreshProps> = ({ loading }) => {
  const handleRefreshNews = useUnit(refreshNews)

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleRefreshNews}
      disabled={loading}
      className="h-8 w-8"
    >
      <RefreshCw strokeWidth={1} className={cn('h-6 w-6', loading && 'animate-spin')} />
    </Button>
  )
}
