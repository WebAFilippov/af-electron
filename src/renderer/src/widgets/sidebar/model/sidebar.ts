import { createEffect, createEvent, createStore, sample } from 'effector'

import { SIDEBAR_KEYBOARD_SHORTCUT } from '@shared/config/constant'

const KeyDownToSidebar = (event: KeyboardEvent) => {
  if (SIDEBAR_KEYBOARD_SHORTCUT.includes(event.key) && event.ctrlKey) {
    event.preventDefault()
    toggleSidebar()
  }
}

const addListenerSidebarFx = createEffect(() => {
  window.addEventListener('keydown', KeyDownToSidebar)
})
const removeListenerSidebarFx = createEffect(() => {
  window.removeEventListener('keydown', KeyDownToSidebar)
})

const toggleSidebar = createEvent()

const $sidebar = createStore<boolean>(true)

sample({
  clock: toggleSidebar,
  source: $sidebar,
  fn: (state) => !state,
  target: $sidebar
})

export { $sidebar, addListenerSidebarFx, removeListenerSidebarFx, toggleSidebar }
