import React, { HTMLAttributes } from 'react'

import { cn } from '@shared/lib'

interface PulsatingButtonProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  pulseColor?: string
  duration?: string
  classNamePusle?: HTMLAttributes<HTMLDivElement>['className']
}

export const PulsatingButton = React.forwardRef<HTMLDivElement, PulsatingButtonProps>(
  ({ className, children, pulseColor = '#0096ff', duration = '1.5s', classNamePusle, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative flex cursor-pointer items-center justify-center rounded-lg bg-primary px-4 py-2 text-center text-primary-foreground ',
          className
        )}
        style={
          {
            '--pulse-color': pulseColor,
            '--duration': duration
          } as React.CSSProperties
        }
        {...props}
      >
        <div className="relative z-10">{children}</div>
        <div
          className={cn(
            'absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-lg bg-inherit',
            classNamePusle
          )}
        />
        
      </div>
    )
  }
)

PulsatingButton.displayName = 'PulsatingButton'
