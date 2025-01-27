import { FC } from 'react'

import { cn } from '@shared/lib'

interface HorizontalLineProps {
  offsetLeft?: number
  offsetRight?: number
  className?: string
}

export const HorizontalLine: FC<HorizontalLineProps> = ({
  offsetLeft = 0,
  offsetRight = 100,
  className
}) => {
  return (
    <div
      className={cn(
        'pointer-events-none absolute block h-0 w-full border-b border-dashed border-white/50 transition-all duration-300',
        className
      )}
      style={{
        maskImage: `linear-gradient(90deg, transparent, #000 ${offsetLeft}%, #000 ${offsetRight}%, transparent)`
      }}
    />
  )
}
