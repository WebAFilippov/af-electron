import { cn } from '@shared/lib'

type VerticalLineeProps = {
  height?: string
}

export const VerticalLine = ({ height = '100%' }: VerticalLineeProps) => {
  return (
    <div
      className={cn(
        'pointer-events-none absolute top-0 left-0 block w-0 border-l border-dashed border-white/50'
      )}
      style={{
        height: height && `${height}`,
      }}
    />
  )
}
