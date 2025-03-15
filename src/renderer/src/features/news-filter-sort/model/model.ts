import { createEvent, restore } from 'effector'

type SortBy = 'date' | 'popularity'
type SortOrder = 'desc' | 'asc'

interface Sort {
  by: SortBy
  order: SortOrder
}

const setSort = createEvent<Sort>()

const $sort = restore<Sort>(setSort, { by: 'date', order: 'desc' })

export { $sort, setSort, type Sort, type SortBy, type SortOrder }

$sort.watch((sort) => console.log(`#sorting ${JSON.stringify(sort)}`))
