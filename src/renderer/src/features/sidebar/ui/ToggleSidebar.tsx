import { useUnit } from 'effector-react'
import { motion } from 'framer-motion'
import { ChevronsRight, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { FC } from 'react'

import { cn } from '@shared/lib'

import { $sidebar, toggleSidebar } from '../model/sidebar'

interface ToggleSidebarProps {
  className?: string
}

export const ToggleSidebar: FC<ToggleSidebarProps> = ({ className }) => {
  const isOpenSidebar = useUnit($sidebar)
  const handleToggleSidebar = useUnit(toggleSidebar)

  return (
    <>
      <button
        className={cn(
          'flex h-[2rem] w-[2.5rem] items-center justify-center border-0 text-primary area-no-drag hover:bg-foreground hover:text-primary-foreground focus-visible:ring focus-visible:ring-blue-500 outline-none' ,
          className
        )}
        style={{
          maskImage: 'linear-gradient(180deg, transparent, #000 20%)'
        }}
        onClick={handleToggleSidebar}
      >
        <motion.div
          animate={isOpenSidebar ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="absolute flex size-[2rem] items-center justify-center"
        >
          <PanelLeftClose className="size-[1.1rem]" />
        </motion.div>
        <motion.div
          animate={isOpenSidebar ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute flex size-[2rem] items-center justify-center"
        >
          <PanelLeftOpen className="size-[1.1rem]" />
        </motion.div>
      </button>
      <span
        className={cn(
          'absolute bottom-0 left-[4em] -translate-y-1/2 -rotate-12 select-none font-pacifico text-xs font-light text-primary'
        )}
      >
        Ctrl + B
      </span>
    </>
  )
}
