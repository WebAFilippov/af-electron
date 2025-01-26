import { cn } from '@shared/lib'

type HorizontalLineProps = {
  width?: string
}

export const HorizontalLine = ({ width = '100%' }: HorizontalLineProps) => {
  return (
    <div
      className={cn(
        'pointer-events-none absolute bottom-0 right-0 block h-0 border-t border-dashed border-white/50'
      )}
      style={{
        width: width && `${width}`,
        maskImage: 'linear-gradient(90deg, transparent, #000 20%, #000 100%, transparent)'
      }}
    />
  )
}
