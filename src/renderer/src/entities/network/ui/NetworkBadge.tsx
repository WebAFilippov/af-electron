import { useUnit } from 'effector-react'

import { cn } from '@shared/lib'

import { $isNetwork } from '../model/network'

export const NetworkBadge = () => {
  const isNetworkOnline = useUnit($isNetwork)

  return (
    <div className="bg-card">
      <span
        className={cn('animate-pulse text-sm', isNetworkOnline ? 'text-green-400' : 'text-red-400')}
      >
        network
      </span>
    </div>
  )
}
