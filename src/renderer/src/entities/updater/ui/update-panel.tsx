import {
  $updateData,
  checkForUpdateFx,
  downloadUpdateFx,
  installNowUpdateFx,
  InstallOnQuitUpdateFx,
  retryDownloadFx
} from '../model/model-updater'
import { cn } from '@shared/lib'
import { Button, Card, Progress } from '@shared/ui'
import { useUnit } from 'effector-react'

export const UpdatePanel = () => {
  const [
    updateData,
    handleCheckForUpdate,
    handleRetryDownload,
    handleDownload,
    handleInstallNow,
    handleInstallOnQuit
  ] = useUnit([
    $updateData,
    checkForUpdateFx,
    retryDownloadFx,
    downloadUpdateFx,
    installNowUpdateFx,
    InstallOnQuitUpdateFx
  ])

  return (
    <div
      className={cn(
        'sticky top-0 z-50 h-1/12 flex flex-col justify-start gap-2',
        updateData.status !== 'idle' && 'h-fit max-h-4/12'
      )}
    >
      <div className="flex gap-4 justify-end items-center">
        <Button
          size={'sm'}
          disabled={updateData.status !== 'idle'}
          onClick={() => handleCheckForUpdate()}
        >
          Проверить обновление ПО
        </Button>
      </div>

      {updateData.status === 'error' && (
        <Card className="p-4 flex flex-col gap-2">
          <div className="text-center font-medium text-destructive">
            {updateData.data?.message || updateData.data?.error?.message || 'Неизвестная ошибка'}
          </div>
          <Button
            size="sm"
            variant="outline"
            className="mx-10"
            onClick={() => handleRetryDownload()}
          >
            Повторить
          </Button>
        </Card>
      )}

      {updateData.status === 'update-available' && (
        <Card className="p-4 flex flex-col gap-2">
          <div className="font-medium text-center">
            Доступно обновление: {updateData.data.version}
          </div>
          <Button size="sm" className="mx-10" variant="outline" onClick={() => handleDownload()}>
            Скачать обновление
          </Button>
        </Card>
      )}

      {updateData.status === 'download-progress' && (
        <Card className="p-4 flex flex-col gap-2">
          <div className="font-medium text-center">Загрузка обновления...</div>
          <Progress value={20} className="w-11/12 self-center" />
          <div className="text-sm text-center">
            {updateData.data.transferred}/{updateData.data.total} байт (
            {(updateData.data.bytesPerSecond / 1024).toFixed(2)} КБ/с)
          </div>
        </Card>
      )}

      {updateData.status === 'update-downloaded' && (
        <Card className="p-4 flex flex-col gap-2 h-3/4">
          <div className="font-medium text-xl text-center">
            Обновление <span className="font-bold">1.1.1</span> успешно загружено
          </div>
          <div className="flex w-full items-center justify-center gap-2 ">
            <Button
              size="sm"
              variant="outline"
              className="w-1/2"
              onClick={() => handleInstallNow()}
            >
              Установить сейчас
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="w-1/2"
              onClick={() => handleInstallOnQuit()}
            >
              Установить позже
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
