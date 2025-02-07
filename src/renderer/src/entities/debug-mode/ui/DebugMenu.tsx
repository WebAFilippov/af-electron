import { sample } from 'effector'
import { createGate, useGate, useList, useUnit } from 'effector-react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { cn } from '@shared/lib'

import {
  $debug,
  $debugMenu,
  addListenerDebugFx,
  DebugLayerInfo,
  removeListenerDebugFx,
  setDebugLayerOption
} from '../model/debug'

const DEBUG_MENU_KEYBOARD_SHORTCUT = ['f', 'F', 'а', 'А']

const Gate = createGate()
sample({
  clock: Gate.open,
  target: [addListenerDebugFx]
})
sample({
  clock: Gate.close,
  target: [removeListenerDebugFx]
})

export const DebugMenu = () => {
  // Проверка, только если режим разработки
  if (process.env.NODE_ENV !== 'development') {
    return null
  }
  
  useGate(Gate)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const debug = useUnit($debug)
  const handleSetDebugLayerOption = useUnit(setDebugLayerOption)
  const menuItems = useList($debugMenu, (item) => {
    return (
      <div className="flex items-center justify-between rounded border border-gray-300 p-2">
        <input
          type="checkbox"
          checked={item.enabled}
          className="mr-2 h-6 w-6 rounded-md border-2 border-gray-500 checked:border-blue-700 checked:bg-blue-500"
          onChange={() =>
            handleSetDebugLayerOption({
              layer: item.layer,
              option: { ...item, enabled: !item.enabled }
            })
          }
        />
        <span className="flex-grow text-[1.5rem]">{item.layer}</span>
        <select
          className="ml-2 rounded border p-1"
          value={item.type}
          onChange={(e) =>
            handleSetDebugLayerOption({
              layer: item.layer,
              option: { ...item, type: e.target.value as DebugLayerInfo['type'] }
            })
          }
        >
          <option value="solid">Solid</option>
          <option value="dashed">Dashed</option>
          <option value="dotted">Dotted</option>
          <option value="double">Double</option>
        </select>
        <input
          type="color"
          value={item.color}
          className="ml-2 h-8 w-8 rounded border"
          onChange={(e) =>
            handleSetDebugLayerOption({
              layer: item.layer,
              option: { ...item, color: e.target.value }
            })
          }
        />
      </div>
    )
  })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (debug && event.key === 'Escape' && openMenu) {
        setOpenMenu(false)
      }

      if (debug && event.ctrlKey && DEBUG_MENU_KEYBOARD_SHORTCUT.includes(event.key)) {
        setOpenMenu(!openMenu)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [openMenu, debug])

  useEffect(() => {
    !debug && setOpenMenu(false)
  }, [debug])

  if (!debug) {
    return null
  }

  return createPortal(
    <div
      id="debug-menu-portal"
      ref={menuRef}
      className={cn(
        'fixed -right-full top-1/2 flex h-[20rem] w-full max-w-[calc(100dvw_-_60%)] -translate-y-1/2 select-none overflow-hidden bg-transparent transition-all duration-300',
        openMenu && 'right-0'
      )}
    >
      <div className="relative flex h-full w-full items-center justify-center bg-transparent">
        <button
          className="absolute left-0 top-0 flex min-h-full w-[3rem] items-center justify-center bg-yellow-500"
          onClick={() => debug && setOpenMenu(!openMenu)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2rem"
            height="2rem"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-separator-vertical"
          >
            <line x1="12" x2="12" y1="3" y2="21" />
            <polyline points="8 8 4 12 8 16" />
            <polyline points="16 16 20 12 16 8" />
          </svg>
        </button>

        <div className="absolute right-0 top-0 flex h-full w-[calc(100%_-_3rem)] flex-1 flex-col bg-white p-[1rem] pr-[0.4rem]">
          <span className="mx-auto mb-[1rem] text-[1.8rem] font-black leading-[1.8rem] text-black">
            Debug Menu 🚀
          </span>

          <div
            id="list"
            className="custom-scrollbar-2 flex flex-col gap-2 overflow-auto pr-[0.4rem]"
          >
            {menuItems}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
