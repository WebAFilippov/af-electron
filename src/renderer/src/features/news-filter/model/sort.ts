import { createEvent, restore } from 'effector'

const SORT_OPTIONS: { label: string; value: { by: string; order: string } }[] = [
  { label: 'Дата: новые', value: { by: 'pubDate', order: 'desc' } },
  { label: 'Дата: старые', value: { by: 'pubDate', order: 'asc' } },
  { label: 'Популярные: сверху', value: { by: 'likes', order: 'desc' } },
  { label: 'Популярные: снизу', value: { by: 'likes', order: 'asc' } }
]

const setSort = createEvent<{ by: string; order: string }>()

const $sort = restore(setSort, { by: 'pubDate', order: 'desc' })

export { SORT_OPTIONS, $sort, setSort }

$sort.watch((sort) => console.log('#sort', sort))
