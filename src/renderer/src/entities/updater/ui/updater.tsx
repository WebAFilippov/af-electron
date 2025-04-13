import { useUnit } from 'effector-react'

import { Card } from '@shared/ui'

import { $updateStatus } from '../model/updater'
import { CheckingForUpdate } from './checking-for-update'
import { ErrorUpdate } from './error-update'
import { ProgressDownload } from './progress-download'
import { UpdateAvailable } from './update-available'
import { UpdateDownloaded } from './update-downloaded'
import { UpdateNotAvailable } from './update-not-available'

export const Updater = () => {
  const [updateStatus] = useUnit([$updateStatus])

  if (!updateStatus) return null

  return (
    <Card className="m-2 p-4 dark:shadow-white/10">
      {updateStatus === 'checking-for-update' && <CheckingForUpdate />}
      {updateStatus === 'update-available' && <UpdateAvailable />}
      {updateStatus === 'update-not-available' && <UpdateNotAvailable />}
      {updateStatus === 'update-downloaded' && <UpdateDownloaded />}
      {updateStatus === 'download-progress' && <ProgressDownload />}
      {updateStatus === 'error' && <ErrorUpdate />}
    </Card>
  )
}
