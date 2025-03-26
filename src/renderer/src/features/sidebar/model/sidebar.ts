import { createEffect, createEvent, createStore, sample } from 'effector'
import { createGate } from 'effector-react'

import { SIDEBAR_KEYBOARD_SHORTCUT } from '@shared/config/constant'

const KeyDownToSidebar = (event: KeyboardEvent) => {
  if (SIDEBAR_KEYBOARD_SHORTCUT.includes(event.key) && event.ctrlKey) {
    event.preventDefault()
    toggleSidebar()
  }
}

const addKeydwownSidebarFx = createEffect(() => {
  window.addEventListener('keydown', KeyDownToSidebar)
})
const removeKeydwownSidebarFx = createEffect(() => {
  window.removeEventListener('keydown', KeyDownToSidebar)
})

const toggleSidebar = createEvent()

const SidebarGate = createGate()

const $isCollapsedSidebar = createStore<boolean>(false)

sample({
  clock: SidebarGate.open,
  target: [addKeydwownSidebarFx]
})

sample({
  clock: SidebarGate.close,
  target: [removeKeydwownSidebarFx]
})

sample({
  clock: toggleSidebar,
  source: $isCollapsedSidebar,
  fn: (isCollapsed) => !isCollapsed,
  target: $isCollapsedSidebar
})

export { SidebarGate, $isCollapsedSidebar, toggleSidebar }

// $isCollapseSidebar.watch((state) => console.log('isCollapseSidebar: ', state))
