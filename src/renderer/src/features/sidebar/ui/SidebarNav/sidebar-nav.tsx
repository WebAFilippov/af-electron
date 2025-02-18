import {
  closestCenter,
  DndContext,
  DndContextProps,
  DragCancelEvent,
  DragOverlay,
  KeyboardSensor,
  MeasuringConfiguration,
  MouseSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { DragStartEvent } from '@dnd-kit/core'
import { DragEndEvent } from '@dnd-kit/core'
import {
  restrictToParentElement,
  restrictToVerticalAxis,
  restrictToWindowEdges
} from '@dnd-kit/modifiers'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'

import { useList, useUnit } from 'effector-react'
import { FC } from 'react'

import {

  $sidebarIds,
  resetSidebarActiveId,
  setSidebarActiveId,
  sortSidebarItems
} from '@features/sidebar/model/sidebar'



import { cn } from '@shared/lib'

import { MeasuringStrategy } from './types'
import { WrapperSidebarItem } from './wrapper-nav-sidebar-item'

const measuring: MeasuringConfiguration = {
  droppable: {
    strategy: MeasuringStrategy.Always
  }
}

export const SidebarNav: FC<DndContextProps> = () => {
  const sidebarIds = useUnit($sidebarIds)
  const handleSortSidebarList = useUnit(sortSidebarItems)
  const handleSetSidebarActiveId = useUnit(setSidebarActiveId)
  const handleResetSidebarActiveId = useUnit(resetSidebarActiveId)

  const sidebarIdsList = useList($sidebarIds, (item) => {
    return <WrapperSidebarItem id={item} />
  })

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over.id) {
      const oldIndex = sidebarIds.indexOf(active.id)
      const newIndex = sidebarIds.indexOf(over.id)

      handleSortSidebarList({ array: sidebarIds, oldIndex, newIndex })
    }

    handleResetSidebarActiveId()
  }

  const handleDragStart = ({ active }: DragStartEvent) => {
    handleSetSidebarActiveId(active.id)
  }

  const handleDragCancel = (_event: DragCancelEvent) => {
    handleResetSidebarActiveId()
  }

  return (
    <DndContext
      autoScroll={true}
      collisionDetection={closestCenter}
      sensors={sensors}
      modifiers={[restrictToVerticalAxis, restrictToWindowEdges, restrictToParentElement]}
      measuring={measuring}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <ul
        className={cn(
          'custom-scrollbar flex flex-1 snap-y snap-center flex-col gap-y-[1rem] overflow-y-auto overflow-x-hidden scroll-smooth py-[1rem] pl-[1rem] pr-[calc(1rem_-_0.3rem)]'
        )}
      >
        <SortableContext items={sidebarIds} strategy={verticalListSortingStrategy}>
          {sidebarIdsList}
        </SortableContext>
      </ul>
    </DndContext>
  )
}
