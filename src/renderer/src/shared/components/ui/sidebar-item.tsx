import { useUnit } from 'effector-react'
import { FC, ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'

import { $sidebar } from '@features/sidebar'

import { cn } from '@shared/lib'

interface SidebarProps {
  className?: string
  icon: ReactNode
  title: string
  path: string
  activeItem: boolean
}

export const SidebarItem: FC<SidebarProps> = ({ className, icon, title, path, activeItem }) => {
  const isOpenSidebar = useUnit($sidebar)

  const [active, setActive] = useState(activeItem)

  return (
    <li
      className={cn(
        'group flex min-h-[3em] cursor-pointer select-none snap-center scroll-m-0 items-center justify-start gap-[0.5em] overflow-hidden border border-white/20 bg-background text-[#f0f6ff] transition-all duration-300 user-select-none first:snap-start last:snap-end hover:border-white hover:bg-primary hover:text-white hover:ring-4 hover:ring-blue-300 hover:ring-offset-1',
        isOpenSidebar ? 'w-[calc(100%_-_4px)]' : 'w-[3em]',
        active &&
          'border-white bg-white text-black hover:border-white hover:bg-white hover:text-black',
        className
      )}
      onClick={() => console.log('das')}
    >
      <span className="flex h-full min-w-[3em] items-center justify-center">{icon}</span>
      <span className="flex h-full grow items-center pr-1 text-justify align-middle text-[1.1em] leading-[1.1em]">
        {title}
      </span>
    </li>
  )
}
