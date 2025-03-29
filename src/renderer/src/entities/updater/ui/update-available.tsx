import { useUnit } from 'effector-react'

import { Button } from '@shared/ui'

import { $isDowloading, $updateData, startUpdate } from '../model/updater'

export const UpdateAvailable = () => {
  const [updateData, handleStartUpdate, isDowloading] = useUnit([
    $updateData,
    startUpdate,
    $isDowloading
  ])

  if (!updateData) return null

  return (
    <div className="flex select-none flex-col items-start justify-between gap-2 text-xs font-medium">
      <p className="text-sm">Доступно новое обновление!</p>
      <div>
        <p>
          Версия: <span className="text-brand font-bold">{updateData.version}</span>
        </p>
        <p>
          Дата выпуска: <span className="text-brand font-bold">{updateData.releaseDate}</span>
        </p>
      </div>
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleStartUpdate()}
        disabled={isDowloading}
      >
        Обновить
      </Button>
    </div>
  )
}
