import { useUnit } from 'effector-react'
import { BluetoothConnected, BluetoothOff } from 'lucide-react'
import { FC } from 'react'

import { $deviceConnected } from '../model/device'

export const DeviceIndicator: FC = () => {
  const isDeviveConnected = useUnit($deviceConnected)

  return (
    <>
      {isDeviveConnected ? (
        <BluetoothConnected className="h-4 w-4 text-green-500" />
      ) : (
        <BluetoothOff className="h-4 w-4 text-red-500" />
      )}
    </>
  )
}
