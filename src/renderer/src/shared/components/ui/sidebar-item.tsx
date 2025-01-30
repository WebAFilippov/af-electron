import { motion, Variants } from 'framer-motion'
import { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { cn } from '@shared/lib'

interface SidebarProps {
  isOpen: boolean
  icon: ReactNode
  title: string
  path: string
}

const variants: Variants = {
  open: { width: '13rem' },
  closed: { width: '3rem' },
  hovered: { backgroundColor: '#fff', color: 'rgb(47, 50, 53)' }
}

export const SidebarItem: FC<SidebarProps> = ({ isOpen, icon, title, path }) => {
  return (
    <Link to={path}>
      <motion.li
        className={cn(
          'bg-[hsl(210, 7%, 11%)] text-[rgb(240, 246, 255)] group flex h-[3em] items-center justify-start gap-[0.5em] overflow-hidden border border-white/20 user-select-none'
        )}
        variants={variants}
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        whileHover="hovered"
        transition={{ duration: 0.3 }}
        layout="size"
      >
        <span className="flex h-[3em] min-w-[3em] items-center justify-center">{icon}</span>
        <span className="text-md flex h-full items-center text-balance text-start leading-[1.5em]">
          {title}
        </span>
      </motion.li>
    </Link>
  )
}
