import { useUnit } from 'effector-react'

import { $updateData } from '../model/updater'

export const ErrorUpdate = () => {
  const [updateData] = useUnit([$updateData])

  if (!updateData) return null

  return (
    <div className="flex items-center justify-between gap-3 text-xs font-medium">
      <p>{updateData?.error.message || updateData?.message || 'Неизвестная ошибка'}</p>
    </div>
  )
}
