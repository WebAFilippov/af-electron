import { sample } from 'effector'
import { createGate, useGate } from 'effector-react'
import { Outlet } from 'react-router-dom'

import { loadCategories } from '@features/news-filter'

import { NewsFilters } from '@entities/news-filter'

const Gate = createGate()
sample({
  clock: Gate.open,
  target: [loadCategories]
})

export const NewsLayout = () => {
  useGate(Gate)

  return (
    <div className="relative flex h-full w-full select-none flex-col overflow-y-auto overflow-x-hidden">
      <NewsFilters />

      <Outlet />
    </div>
  )
}
