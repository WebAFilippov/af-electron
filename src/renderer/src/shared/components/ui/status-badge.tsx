import { Loader } from 'lucide-react'
import { FC, ReactNode } from 'react'

import { cn } from '@shared/lib'

type Props = {
  icon: ReactNode
  active: boolean | undefined
  loading: boolean
}

export const StatusBadge: FC<Props> = ({ icon, active, loading }) => {
  return (
    <div className="flex items-center justify-center">
      <span
        className={cn(
          'text-[11px] font-bold text-destructive',
          active && 'text-success'
        )}
      >
        {loading ? (
          <Loader size={12} className="animate-spin text-primary-foreground" />
        ) : (
          icon
        )}
      </span>
    </div>
  )
}
