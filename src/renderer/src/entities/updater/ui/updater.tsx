import { useUnit } from 'effector-react'

import { Card } from '@shared/ui'

import { $updateStatus } from '../model/updater'
import { CheckingForUpdate } from './checking-for-update'
import { ErrorUpdate } from './error-update'
import { UpdateAvailable } from './update-available'
import { UpdateNotAvailable } from './update-not-available'
import { UpdateDownloaded } from './update-downloaded'

export const Updater = () => {
  const [updateStatus] = useUnit([$updateStatus])

  if (!updateStatus) return null

  return (
    <Card className="m-2 p-4 dark:shadow-white/10">
      {updateStatus === 'checking-for-update' && <CheckingForUpdate />}
      {updateStatus === 'update-available' && <UpdateAvailable />}
      {updateStatus === 'update-not-available' && <UpdateNotAvailable />}
      {updateStatus === 'update-downloaded' && <UpdateDownloaded />}
      {updateStatus === 'error' && <ErrorUpdate />}
    </Card>
  )
}
