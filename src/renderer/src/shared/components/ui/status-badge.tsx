import { Loader2 } from 'lucide-react'
import { FC, ReactNode } from 'react'

import { cn } from '@shared/lib/utils'

type Props = {
  icon: ReactNode
  isActive: boolean
  loading: boolean
}

export const StatusBadge: FC<Props> = ({ icon, isActive, loading }) => {
  if (loading)
    return (
      <div className="flex items-center justify-center">
        <span>
          <Loader2 size={12} />
        </span>
      </div>
    )

  return (
    <div className="flex items-center justify-center">
      <span className={cn('text-[11px] font-bold text-red-400', isActive && 'text-green-400')}>
        {icon}
      </span>
    </div>
  )
}
