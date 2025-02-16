import { UniqueIdentifier } from '@dnd-kit/core'

import { createEffect, createEvent, createStore, sample } from 'effector'

import { SIDEBAR_KEYBOARD_SHORTCUT } from '@shared/config/constant'

import { SidebarNavItemProps, SortSidebarItemsProps } from './types'

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

const getSidebarItemsFx = createEffect(async () => {
  return await window.api.getSidebarList()
})
const updateSidebarItemsFx = createEffect(async (list: SidebarNavItemProps[]) => {
  await window.api.updateSidebarOrder(list)
})

const openSidebar = createEvent()
const closeSidebar = createEvent()
const toggleSidebar = createEvent()

const getSidebarItemById = createEvent<UniqueIdentifier>()
const sortSidebarItems = createEvent<SortSidebarItemsProps>()
const setSidebarActiveId = createEvent<UniqueIdentifier | null>()
const resetSidebarActiveId = createEvent()

const $sidebar = createStore<boolean>(true)
const $sidebarItems = createStore<SidebarNavItemProps[]>([])
const $sidebarIds = $sidebarItems.map((item) => item.map((itemId) => itemId.id))
const $sidebarActiveId = createStore<UniqueIdentifier | null>(null).reset(resetSidebarActiveId)
const $sidebarActiveIndex = sample({
  clock: $sidebarActiveId,
  source: $sidebarIds,
  fn: (store, activeId) =>
    activeId != null ? store.findIndex((item) => item === Number(activeId)) : -1
})
const $isDnd = sample({
  clock: $sidebarActiveId,
  fn: (activeId) => (activeId != null ? true : false)
})

sample({
  clock: sortSidebarItems,
  source: $sidebarItems,
  fn: (list, { array, oldIndex, newIndex }) => {
    const sortedArrayIds = array.slice()
    sortedArrayIds.splice(
      newIndex < 0 ? sortedArrayIds.length + newIndex : newIndex,
      0,
      sortedArrayIds.splice(oldIndex, 1)[0]
    )

    const sortedItems = list.sort((a, b) => {
      return sortedArrayIds.indexOf(a.id) - sortedArrayIds.indexOf(b.id)
    })

    const updatedOrderItems = sortedItems.map((item, index) => {
      return { ...item, order: index + 1 }
    })

    return updatedOrderItems
  },
  target: [$sidebarItems, updateSidebarItemsFx]
})
sample({
  clock: getSidebarItemById,
  source: $sidebarItems,
  fn: (store, itemId) => {
    return store.find((item) => item.id === itemId)
  }
})
sample({
  clock: setSidebarActiveId,
  target: $sidebarActiveId
})
sample({
  clock: getSidebarItemsFx.doneData,
  target: $sidebarItems
})
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

export {
  $sidebar,
  $sidebarItems,
  $sidebarIds,
  $sidebarActiveId,
  $isDnd,
  $sidebarActiveIndex,
  addListenerSidebarFx,
  removeListenerSidebarFx,
  closeSidebar,
  openSidebar,
  toggleSidebar,
  getSidebarItemsFx,
  sortSidebarItems,
  setSidebarActiveId,
  resetSidebarActiveId,
  getSidebarItemById
}

// $sidebar.watch((state) => console.log(state))
// $sidebarItems.watch((state) => console.log('sidebarItems ', state))
// $sidebarIds.watch((state) => console.log('sidebarIds ', state))
// $sidebarActiveId.watch((state) => console.log(state))
// $sidebarActiveIndex.watch((state) => console.log(state))
// $isDnd.watch((state) => console.log('isDnd ', state))
