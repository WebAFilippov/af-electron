import { RefreshCw } from 'lucide-react'

export const CheckingForUpdate = () => {
  return (
    <div className="flex items-center justify-between gap-3 text-xs font-medium">
      <span>Проверка наличия обновлений</span>
      <RefreshCw className="size-3 animate-spin" />
    </div>
  )
}
