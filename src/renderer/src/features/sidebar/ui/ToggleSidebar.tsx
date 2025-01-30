import { useUnit } from 'effector-react'
import { motion } from 'framer-motion'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { FC } from 'react'

import { cn } from '@shared/lib'

import { $sidebar, toggleSidebar } from '../model/sidebar'

interface ToggleSidebarProps {
  className?: string
}

export const ToggleSidebar: FC<ToggleSidebarProps> = ({ className }) => {
  const sidebarState = useUnit($sidebar)
  const handleToggleSidebar = useUnit(toggleSidebar)

  return (
    <motion.button
      className={cn(
        'absolute -top-[2em] z-50 flex h-[2em] w-[5em] items-center justify-center bg-background text-primary transition-colors duration-200 area-no-drag hover:bg-foreground hover:text-primary-foreground',
        sidebarState ? 'left-[14em]' : 'left-[3em]',
        className
      )}
      style={{
        maskImage: 'linear-gradient(180deg, transparent, #000 20%)'
      }}
      initial={{ left: '10em' }}
      animate={{ left: sidebarState ? '10em' : '0' }}
      transition={{ duration: 0.3 }}
      onClick={handleToggleSidebar}
    >
      <motion.div className="relative h-[1.1em] w-[1.1em]">
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          animate={sidebarState ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <PanelLeftClose className="mt-[0.1em] size-[1.1em]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.1 }}
          animate={sidebarState ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <PanelLeftOpen className="mt-[0.1em] size-[1.1em]" />
        </motion.div>
      </motion.div>
    </motion.button>
  )
}
