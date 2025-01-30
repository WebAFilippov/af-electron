import { createEvent, createStore, sample } from 'effector'

const openSidebar = createEvent()
const closeSidebar = createEvent()
const toggleSidebar = createEvent()

const $sidebar = createStore<boolean>(true)

sample({
  clock: openSidebar,
  fn: () => true,
  target: $sidebar
})

sample({
  clock: closeSidebar,
  fn: () => false,
  target: $sidebar
})

sample({
  clock: toggleSidebar,
  source: $sidebar,
  fn: (state) => !state,
  target: $sidebar
})

export { openSidebar, closeSidebar, toggleSidebar, $sidebar }
