import { useUnit } from 'effector-react'
import { Settings, Thermometer } from 'lucide-react'

import { HorizontalLine, VerticalLine } from '@shared/components/ui'
import { SidebarItem } from '@shared/components/ui/sidebar-item'
import { cn } from '@shared/lib'

import { $sidebar, closeSidebar } from '../model/sidebar'

export const Sidebar = () => {
  const isOpenSidebar = useUnit($sidebar)

  const handleCloseSidebar = useUnit(closeSidebar)

  return (
    <>
      <div
        id="overlay"
        className={cn(
          'absolute left-0 top-0 z-0 h-full w-full cursor-pointer bg-transparent hover:bg-white/10 lg:hidden xl:hidden 2xl:hidden',
          isOpenSidebar ? 'md:visible' : 'md:hidden'
        )}
        onClick={handleCloseSidebar}
      />

      <aside
        id="navigation_sidebar"
        className={cn(
          'wallpaper relative z-10 flex h-[calc(100vh_-_2em)] flex-col border-r border-dashed border-white/50 transition-all duration-300',

          // isOpenSidebar
          //   ? 'md:translate-x-0 md:translate-x-0 md:translate-x-0 md:translate-x-0'
          //   : 'md:-translate-x-[100%]'
          isOpenSidebar
            ? 'md:w-[15em] lg:w-[17em] xl:w-[19em] 2xl:w-[21em]'
            : 'md:w-0 lg:w-[5em] xl:w-[5em] 2xl:w-[5em]'
        )}
      >
        <div id="header_sidebar" className="min-h-[5em] bg-background">
          header
        </div>

        <ul
          className={cn(
            'custom-scrollbar my-[2em] pl-[1em] pr-[calc(1em_-_8px)] flex flex-1 snap-y snap-center flex-col gap-y-[1em] overflow-y-auto overflow-x-hidden scroll-smooth'
          )}
        >
          <SidebarItem icon={<Thermometer />} title={'Погода'} path="settings" activeItem={true} />
          <SidebarItem icon={<Settings />} title={'Настройки'} path="settings" activeItem={false} />
          <SidebarItem
            icon={<Settings />}
            title={
              'Настройки Настройки'
            }
            path="settings"
            activeItem={true}
          />
          <SidebarItem icon={<Settings />} title={'Настройки'} path="settings" activeItem={false} />
          <SidebarItem icon={<Settings />} title={'Регулировка стола'} path="settings" activeItem={false} className='text-center'/>
          <SidebarItem icon={<Settings />} title={'Настройки'} path="settings" activeItem={false} />
          <SidebarItem icon={<Settings />} title={'Настройки'} path="settings" activeItem={false} />
          <SidebarItem icon={<Settings />} title={'Настройки'} path="settings" activeItem={false} />
          <SidebarItem icon={<Settings />} title={'Настройки'} path="settings" activeItem={false} />
          <SidebarItem icon={<Settings />} title={'Настройки'} path="settings" activeItem={false} />
          <SidebarItem icon={<Settings />} title={'Настройки'} path="settings" activeItem={false} />
          <SidebarItem icon={<Settings />} title={'Настройки'} path="settings" activeItem={false} />
          <SidebarItem icon={<Settings />} title={'Настройки'} path="settings" activeItem={false} />
          <SidebarItem icon={<Settings />} title={'Настройки'} path="settings" activeItem={false} />
          <SidebarItem icon={<Settings />} title={'Настройки'} path="settings" activeItem={false} />
          <SidebarItem icon={<Settings />} title={'Настройки'} path="settings" activeItem={false} />
          <SidebarItem icon={<Settings />} title={'Настройки'} path="settings" activeItem={false} className='font-serif'/>
          <SidebarItem icon={<Settings />} title={'Настройки'} path="settings" activeItem={false} className='font-mono'/>
          <SidebarItem icon={<Settings />} title={'Настройки'} path="settings" activeItem={true} className='font-mono'/>
        </ul>

        <div id="footer_sidebar" className="min-h-[4em] bg-background">
          footer
        </div>

        <HorizontalLine className="left-0 top-[5em]" offsetLeft={40} offsetRight={100} />
        <HorizontalLine className="bottom-[4em] left-0" offsetLeft={40} offsetRight={100} />
      </aside>
    </>
  )
}
