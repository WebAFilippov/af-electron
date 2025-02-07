import { UniqueIdentifier } from '@dnd-kit/core'

export interface SidebarNavItemProps {
  id: UniqueIdentifier
  path: string
  order: number
  name: string
  icon: string
}

export interface SortSidebarItemsProps {
  array: UniqueIdentifier[]
  oldIndex: number
  newIndex: number
}
