import { useUnit } from 'effector-react'
import { motion } from 'framer-motion'

import { HorizontalLine, VerticalLine } from '@shared/components/ui'
import { cn } from '@shared/lib'

import { $sidebar } from '../model'

export const Sidebar = () => {
  const stateSidebar = useUnit($sidebar)

  return (
    <motion.aside
      className={cn('relative')}
      initial={{ width: '15em' }}
      animate={{ width: stateSidebar ? '15em' : '4em' }}
      transition={{ duration: 0.3 }}
    >
      {/* absolute  */}
      <VerticalLine
        className="-right-[0.1em] bottom-0 h-[calc(100%_+_2em)]"
        offsetBottom={90}
        offsetTop={3}
      />
      {/* end absolute */}

      <motion.div
        id="logo"
        className="relative flex h-[4em] items-center justify-center bg-background"
      >
        <HorizontalLine
          className={cn(
            'left-0 top-0',
            stateSidebar ? 'w-[calc(100vw_-_15em)]' : 'w-[calc(100vw_-_4em)]',
            stateSidebar ? 'left-[15em]' : 'left-[4em]'
          )}
          offsetLeft={0}
          offsetRight={100}
        />
        <HorizontalLine className="left-0 top-0" offsetLeft={40} offsetRight={100} />
        <HorizontalLine className="bottom-0 left-0" offsetLeft={40} offsetRight={100} />
        <motion.div
          id="item"
          className="flex items-center"
          initial={{ width: '100%' }}
          animate={{ width: stateSidebar ? '100%' : '4rem' }}
          transition={{ duration: 0.3 }}
        ></motion.div>
      </motion.div>

      <div>
        <ul className="flex flex-col gap-4 p-4">
          <motion.li
            id="item"
            className="flex items-center"
            initial={{ width: '100%' }}
            animate={{ width: stateSidebar ? '100%' : '4rem' }}
            transition={{ duration: 0.3 }}
          >
            <span id="icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2L2 22H22L12 2Z" fill="currentColor" />
              </svg>
            </span>
            <motion.span
              id="text"
              initial={{ opacity: 1 }}
              animate={{ opacity: stateSidebar ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              Title
            </motion.span>
          </motion.li>
        </ul>
      </div>
    </motion.aside>
  )
}
