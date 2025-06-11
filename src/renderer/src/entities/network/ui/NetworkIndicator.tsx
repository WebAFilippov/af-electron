import { $isNetwork } from '../model/network'
import { cn } from '@shared/lib'
import { Tooltip, TooltipContent, TooltipTrigger } from '@shared/ui'
import { useUnit } from 'effector-react'
import { Wifi, WifiOff } from 'lucide-react'

export const NetworkIndicator = () => {
  const isNetworkOnline = useUnit($isNetwork)

  return (
    <Tooltip delayDuration={700}>
      <TooltipTrigger
        className={cn(
          "size-9 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          isNetworkOnline && 'text-chart-2 hover:text-chart-2'
        )}
      >
        <div>{isNetworkOnline ? <Wifi /> : <WifiOff />}</div>
      </TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={-7}>
        {isNetworkOnline ? 'Network online' : 'Network offline'}
      </TooltipContent>
    </Tooltip>
  )
}
