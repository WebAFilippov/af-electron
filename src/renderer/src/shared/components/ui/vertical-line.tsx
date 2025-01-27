import { FC } from 'react'

import { cn } from '@shared/lib'

interface VerticalLineProps {
  offsetTop?: number
  offsetBottom?: number
  className: string
}

export const VerticalLine: FC<VerticalLineProps> = ({
  offsetTop = 0,
  offsetBottom = 100,
  className
}) => {
  return (
    <div
      className={cn(
        'pointer-events-none absolute block h-full w-0 border-l border-dashed border-white/50',
        className
      )}
      style={{
        maskImage: `linear-gradient(180deg, transparent, #000 ${offsetTop}%, #000 ${offsetBottom}%, transparent)`
      }}
    />
  )
}
