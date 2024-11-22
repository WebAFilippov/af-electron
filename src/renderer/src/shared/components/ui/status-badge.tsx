import { FC, ReactNode } from 'react'

import { cn } from '@shared/lib/utils'

type Props = {
  icon: ReactNode
  isActive: boolean
}

export const StatusBadge: FC<Props> = ({ icon, isActive }) => {
  return (
    <div className="flex items-center justify-center">
      <span
        className={cn(
          'font-ym_text text-[11px] font-bold text-red-400',
          isActive && 'text-green-400'
        )}
      >
        {icon}
      </span>
    </div>
  )
}
