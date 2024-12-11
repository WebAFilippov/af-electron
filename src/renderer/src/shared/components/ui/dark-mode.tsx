import { FC, PropsWithChildren, ReactNode } from 'react'

import { useTheme } from '@app/providers/theme'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@shared/components/ui'

type Props = {
  triggerNode?: ReactNode
}

export const DarkMode: FC<PropsWithChildren<Props>> = ({ triggerNode }) => {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{triggerNode}</DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className="cursor-pointer text-xs text-primary"
        >
          Всегда светлый
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className="cursor-pointer text-xs text-primary"
        >
          Всегда темный
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className="cursor-pointer text-xs text-primary"
        >
          Как в системе
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
