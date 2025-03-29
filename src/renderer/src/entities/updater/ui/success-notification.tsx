import { useUnit } from 'effector-react'
import { X } from 'lucide-react'

import { $successNotification, resetSuccessNotification } from '../model/success-notification'

export const SuccessNotification = () => {
  const [version, handleReset] = useUnit([$successNotification, resetSuccessNotification])

  if (!version) return null

  return (
    <div className="flex select-none items-center justify-between gap-1 rounded-md border border-border bg-background px-2 py-1 text-foreground hover:bg-accent hover:text-accent-foreground">
      <p className="text-xs">
        Версия <span className="text-brand font-medium">{version}</span> успешно установлена!
      </p>
      <X
        className="hover:text-brand size-4 cursor-pointer stroke-1 text-foreground"
        onClick={() => handleReset()}
      />
    </div>
  )
}
