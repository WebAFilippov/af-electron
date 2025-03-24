import { useUnit } from 'effector-react'
import { Wifi, WifiOff } from 'lucide-react'

import { $isNetwork } from '../model/network'

export const NetworkIndicator = () => {
  const isNetworkOnline = useUnit($isNetwork)

  return (
    <>
      {isNetworkOnline ? (
        <Wifi className="h-4 w-4 text-green-500" />
      ) : (
        <WifiOff className="h-4 w-4 text-red-500" />
      )}
    </>
  )
}
