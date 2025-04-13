import { useUnit } from 'effector-react'

import { Progress } from '@shared/ui'

import { $updateData } from '../model/updater'

const formatBytes = (bytes) => {
  if (bytes < 1024) return `${bytes} Б`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} КБ`
  return `${(bytes / 1024 / 1024).toFixed(2)} МБ`
}

export const ProgressDownload = () => {
  const [updateData] = useUnit([$updateData])

  if (!updateData) return null

  return (
    <div className="flex select-none flex-col items-start justify-between gap-2 text-xs font-medium">
      <p className="text-xs">Скачивание...</p>
      <Progress value={0} />
      <div className="flex w-full justify-between">
        const [updateData] = useUnit([$updateData])
        <span>{`${updateData.percent.toFixed(2)}%`}</span>
        <span>{`${formatBytes(updateData.transferred)} / ${formatBytes(updateData.total)}`}</span>
        <span>{`${(updateData.bytesPerSecond / 1024).toFixed(2)} КБ/с`}</span>
      </div>
    </div>
  )
}
