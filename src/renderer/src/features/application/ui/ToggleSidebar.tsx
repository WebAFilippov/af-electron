import { useUnit } from 'effector-react'
import { motion } from 'framer-motion'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { FC } from 'react'

import { $sidebar, toggleSidebar } from '@features/application'

import { cn } from '@shared/lib'

interface ToggleSidebarProps {
  className: string
}

export const ToggleSidebar: FC<ToggleSidebarProps> = ({ className }) => {
  const sidebarState = useUnit($sidebar)
  const handleToggleSidebar = useUnit(toggleSidebar)

  return (
    <motion.button
      className={cn(
        'absolute top-0 z-50 flex h-[2em] w-[4em] items-center justify-center bg-background text-primary transition-colors duration-200 area-no-drag hover:bg-foreground hover:text-primary-foreground',
        sidebarState ? 'left-[14em]' : 'left-[3em]',
        className
      )}
      style={{
        maskImage: 'linear-gradient(180deg, transparent, #000 20%)'
      }}
      initial={{ left: '13em' }}
      animate={{ left: sidebarState ? '11em' : '0' }}
      transition={{ duration: 0.3 }}
      onClick={handleToggleSidebar}
    >
      {sidebarState ? (
        <PanelLeftClose className="mt-[0.1em] size-[1.1em]" />
      ) : (
        <PanelLeftOpen className="mt-[0.1em] size-[1.1em]" />
      )}
    </motion.button>
  )
}
