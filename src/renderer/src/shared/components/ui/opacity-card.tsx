import { Trash2 } from 'lucide-react'
import { FC } from 'react'

type Props = {
  title: string
  description: string
}

export const OpacityCard: FC<Props> = ({ title, description }) => {
  return (
    <div className="bg-opacity_card_bg flex w-[264px] items-center justify-between rounded-xl px-4 py-2 shadow-md">
      <div className="flex flex-col items-start gap-2">
        <div className="text-xl font-semibold leading-none tracking-tight">{title}</div>
        <div className="text-sm text-muted-foreground">{description}</div>
      </div>
      <button className="flex h-10 w-10 items-center justify-center rounded-md transition-colors duration-150 hover:bg-foreground">
        <Trash2 size={16} strokeWidth={2} />
      </button>
    </div>
  )
}
