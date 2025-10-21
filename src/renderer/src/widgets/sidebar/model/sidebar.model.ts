import { SIDEBAR_KEYBOARD_SHORTCUT } from '@shared/config/constants'
import { createEffect, createEvent, createStore, sample } from 'effector'
import { createGate } from 'effector-react'
import { persist } from 'effector-storage/local'

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

const GateSidebar = createGate()
sample({
  clock: GateSidebar.open,
  target: [addListenerSidebarFx]
})
sample({
  clock: GateSidebar.close,
  target: [removeListenerSidebarFx]
})

const toggleSidebar = createEvent()

const $sidebar = createStore<boolean>(false)

sample({
  clock: toggleSidebar,
  source: $sidebar,
  fn: (state) => !state,
  target: $sidebar
})

persist({ store: $sidebar, key: 'sidebar' })

export {
  GateSidebar,
  $sidebar,
  toggleSidebar,
  addListenerSidebarFx,
  removeListenerSidebarFx
}
