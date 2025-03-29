import { FC, ReactNode } from 'react'

import { CHANGELOG } from '@shared/changelog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@shared/ui'

import { ChangelogBadge } from './changelog-badge'
import { ChangelogList } from './changelog-list'

interface ChangelogProps {
  updated: boolean
  autoUpdater: ReactNode
}

export const Changelog: FC<ChangelogProps> = ({ updated, autoUpdater }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger tabIndex={-1} className="outline-none">
        <ChangelogBadge isPulse={updated}>{CHANGELOG[0].version}</ChangelogBadge>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 shadow-md dark:shadow-white/10" sideOffset={10}>
        <DropdownMenuLabel className="select-none text-start text-xl">
          Что Нового?
        </DropdownMenuLabel>
        {autoUpdater}
        <ChangelogList />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
