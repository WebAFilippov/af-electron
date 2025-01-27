import { createApi, createStore } from 'effector'

type Sidebar = boolean

export const $sidebar = createStore<Sidebar>(true)

export const { openSidebar, closeSidebar, toggleSidebar } = createApi($sidebar, {
  openSidebar: () => true,
  closeSidebar: () => false,
  toggleSidebar: (state) => !state
})
