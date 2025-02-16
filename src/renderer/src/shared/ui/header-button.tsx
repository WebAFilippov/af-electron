import { ButtonHTMLAttributes, FC, ReactNode } from 'react'

import { useDebugLayer } from '@entities/debug-mode'

import { cn } from '@shared/lib'

interface HeaderButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  icon: ReactNode
  className?: string
}

export const HeaderButton: FC<HeaderButtonProps> = ({ icon, className, ...props }) => {
  const { ref } = useDebugLayer<HTMLButtonElement>('shared')
  return (
    <button
      ref={ref}
      className={cn(
        'relative flex h-[2rem] w-[2.5rem] items-center justify-center bg-background text-primary outline-none transition-[background,color,width,height] duration-300 area-no-drag hover:bg-foreground hover:text-primary-foreground focus-visible:-outline-offset-[0.1rem] focus-visible:outline-blue-500',
        className
      )}
      {...props}
    >
      {icon}
    </button>
  )
}
