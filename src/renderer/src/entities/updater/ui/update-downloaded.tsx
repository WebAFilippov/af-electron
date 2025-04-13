import { useUnit } from 'effector-react'

import { Button } from '@shared/ui'

import { $updateData, installNow, installOnQuit } from '../model/updater'

export const UpdateDownloaded = () => {
  const [updateData, handleinstallNow, handleInstallOnQuit] = useUnit([
    $updateData,
    installNow,
    installOnQuit
  ])

  if (!updateData) return null

  return (
    <div className="flex select-none flex-col items-start justify-between gap-2 text-xs font-medium">
      <p className="text-sm">Обновление готово к установке!</p>
      <p>
        Версия <span className="font-bold text-brand">{updateData.version}</span> была успешно
        загружена.
      </p>
      <p>{updateData.downloadedFile}</p>
      <div className="flex flex-col items-center gap-2">
        <Button size="sm" variant="outline" onClick={() => handleinstallNow()}>
          Установить сейчас
        </Button>
        <Button size="sm" variant="outline" onClick={() => handleInstallOnQuit()}>
          Установить позже
        </Button>
      </div>
    </div>
  )
}
