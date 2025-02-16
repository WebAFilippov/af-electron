import { useUnit } from 'effector-react'
import { FC, ReactNode } from 'react'

import { SidebarNav } from '@features/sidebar/ui/SidebarNav/sidebar-nav'

import { useDebugLayer } from '@entities/debug-mode/ui/use-debug-layer'

import { cn } from '@shared/lib'
import { AuroraText } from '@shared/ui'

import { $sidebar } from '../model/sidebar'

interface SidebarProps {
  Header?: ReactNode
  Navigation?: ReactNode
  Footer?: ReactNode
}

export const Sidebar: FC<SidebarProps> = ({ Header, Navigation, Footer }) => {
  const isOpen = useUnit($sidebar)
  const { ref } = useDebugLayer<HTMLDivElement>('widgets')

  return (
    <aside
      ref={ref}
      className={cn(
        'wallpaper transition-[width, height] relative z-10 flex h-full flex-col border-r border-dashed border-primary duration-300',
        isOpen ? 'w-[15rem]' : 'w-[5rem]'
      )}
    >
      <div className="relative flex h-[4rem] items-center justify-center border-b border-dashed border-primary bg-background ">
        <AuroraText as="span" className="text-4xl">
          {isOpen ? 'Logotype' : 'Logotype'}
        </AuroraText>
      </div>

      <SidebarNav />

      <div className="h-[3rem] border-t border-dashed border-primary bg-background">footer</div>
    </aside>
  )
}
