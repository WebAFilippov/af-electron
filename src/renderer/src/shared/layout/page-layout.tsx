import { cn } from '@shared/lib'
import { FC, PropsWithChildren } from 'react'

type Props = {
  className?: string
}

export const PageLayout: FC<PropsWithChildren<Props>> = ({ children, className }) => {
  return <div className={cn('h-[616px] max-h-[616px] px-6 relative', className)}>{children}</div>
}
