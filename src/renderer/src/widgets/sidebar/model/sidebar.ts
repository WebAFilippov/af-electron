import { createEvent, createStore, sample } from 'effector'

const toggleSidebar = createEvent()

const $sidebar = createStore<boolean>(true)

sample({
  clock: toggleSidebar,
  source: $sidebar,
  fn: (state) => !state,
  target: $sidebar
})

export { $sidebar, toggleSidebar }
