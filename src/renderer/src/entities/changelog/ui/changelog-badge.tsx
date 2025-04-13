import { FC, PropsWithChildren } from 'react'

import { PulsatingButton } from '@shared/ui'

interface ChangelogBadgeProps {
  isPulse: boolean
}

export const ChangelogBadge: FC<PropsWithChildren<ChangelogBadgeProps>> = ({
  isPulse,
  children
}) => {
  return (
    <PulsatingButton
      className="select-none rounded-md border border-border bg-background px-2 py-0.5 text-xs font-semibold text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      classNamePusle="rounded-md"
      duration={isPulse ? '1.65s' : '0s'}
      tabIndex={-1}
    >
      {children}
    </PulsatingButton>
  )
}
