import { useUnit } from 'effector-react'
import { motion } from 'framer-motion'
import { Settings, Thermometer } from 'lucide-react'
import { useEffect } from 'react'

import { HorizontalLine, VerticalLine } from '@shared/components/ui'
import { SidebarItem } from '@shared/components/ui/sidebar-item'
import { SIDEBAR_KEYBOARD_SHORTCUT } from '@shared/config/constant'
import { cn } from '@shared/lib'

import { $isMobile } from '../model/isMobile'
import { $sidebar, toggleSidebar } from '../model/sidebar'
import { ToggleSidebar } from './ToggleSidebar'

export const Sidebar = () => {
  const stateSidebar = useUnit($sidebar)
  const handleToggleSidebar = useUnit(toggleSidebar)
  const isMobile = useUnit($isMobile)

  useEffect(() => {
    console.log(isMobile)
  }, [isMobile])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (SIDEBAR_KEYBOARD_SHORTCUT.includes(event.key) && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        handleToggleSidebar()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <motion.aside
      className={cn('wallpaper relative flex flex-col')}
      initial={{ width: '15em' }}
      animate={{ width: stateSidebar ? '15em' : '5em' }}
      transition={{ duration: 0.3 }}
    >
      {/* absolute  */}
      <VerticalLine
        className="pointer-events-auto -right-[0.4em] bottom-0 h-[calc(100%_+_2em)] w-[0.3em] cursor-w-resize transition-colors duration-300 hover:border-white"
        offsetBottom={90}
        offsetTop={3}
        onClick={handleToggleSidebar}
      />
      <ToggleSidebar />
      {/* end absolute */}

      <motion.div className="relative flex h-[5em] items-center justify-center bg-background">
        {/* Decoration */}
        <HorizontalLine
          className={cn(
            'left-0 top-0',
            stateSidebar ? 'w-[calc(100vw_-_15em)]' : 'w-[calc(100vw_-_5em)]',
            stateSidebar ? 'left-[15em]' : 'left-[5em]'
          )}
          offsetLeft={0}
          offsetRight={100}
        />
        <HorizontalLine className="left-0 top-0" offsetLeft={40} offsetRight={100} />
        <HorizontalLine className="bottom-0 left-0" offsetLeft={40} offsetRight={100} />
        <span className="pointer-events-none absolute -right-[5em] -top-[2.4em] -rotate-12 font-pacifico text-[0.7em] font-light text-white/50 user-select-none">
          Ctrl + B
        </span>
        {/* end Decoration */}

        <motion.div
          id="item"
          className="flex items-center"
          initial={{ width: '100%' }}
          animate={{ width: stateSidebar ? '100%' : '4rem' }}
          transition={{ duration: 0.3 }}
        ></motion.div>
      </motion.div>

      <nav className="flex-1 py-[2em]">
        <ul className="flex flex-col gap-y-[1em] px-[1em]">
          <SidebarItem
            icon={<Thermometer />}
            isOpen={stateSidebar}
            title={'Погода'}
            path="settings"
          />
          <SidebarItem
            icon={<Settings />}
            isOpen={stateSidebar}
            title={' НастройкиНастройкиНастройки НастройкиНастройкиНастройки'}
            path="settings"
          />
        </ul>
      </nav>

      <div className="items-end user-select-none pointer-events-none">dsa</div>
    </motion.aside>
  )
}



