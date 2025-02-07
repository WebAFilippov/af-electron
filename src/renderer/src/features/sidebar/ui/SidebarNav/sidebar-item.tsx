import { UniqueIdentifier } from '@dnd-kit/core'

import { useStoreMap, useUnit } from 'effector-react'
import { forwardRef, HTMLAttributes } from 'react'

import { $isDnd, $sidebarItems } from '@features/sidebar/model/sidebar'

import { DebugWrapper } from '@entities/debug-mode/ui/DebugWrapper'

import { AudioLinesIcon, Settings, Thermometer } from '@shared/assets/svg-icons'
import { cn } from '@shared/lib'

const iconMap = {
  weather: <Thermometer />,
  settings: <Settings />,
  audio_device: <AudioLinesIcon />
} as const

const getIcon = (icon: keyof typeof iconMap) => iconMap[icon] || null

interface SidebarItemProps extends Omit<HTMLAttributes<HTMLElement>, 'id'> {
  id: UniqueIdentifier
}

export const SidebarItem = forwardRef<HTMLLIElement, SidebarItemProps>(({ id, ...props }, ref) => {
  const sidebarItem = useStoreMap({
    store: $sidebarItems,
    keys: [id],
    fn: (store, [itemId]) => store.find(({ id }) => id === itemId)
  })
  const isDnd = useUnit($isDnd)

  if (!sidebarItem) {
    return null
  }

  return (
    <li
      ref={ref}
      style={props.style}
      className={cn(
        'transition-[width, background, color] group flex min-h-[3rem] cursor-pointer select-none snap-center items-center justify-between gap-[0.5rem] overflow-hidden border border-primary bg-background text-white outline-none duration-300 first:snap-start last:snap-end focus-visible:outline-offset-[0.3rem] focus-visible:outline-blue-500',
        !isDnd && 'hover:border-white hover:bg-primary',
        props.className
      )}
      {...props}
    >
      <DebugWrapper layer="features" />

      <span className="flex min-h-[3rem] min-w-[3rem] items-center justify-center">
        {getIcon(sidebarItem.icon as keyof typeof iconMap)}
      </span>
      <span className="flex h-full grow items-center pr-1 text-justify align-middle text-base">
        {sidebarItem.name}
      </span>
    </li>
  )
})

// Указываем displayName для удобства отладки
SidebarItem.displayName = 'SidebarItem'
