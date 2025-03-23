const SORT_OPTIONS: { label: string; value: { by: string; order: string } }[] = [
  { label: 'Дата: новые', value: { by: 'pubDate', order: 'desc' } },
  { label: 'Дата: старые', value: { by: 'pubDate', order: 'asc' } },
  { label: 'Популярные: сверху', value: { by: 'likes', order: 'desc' } },
  { label: 'Популярные: снизу', value: { by: 'likes', order: 'asc' } }
]

const TAKE_OPTIONS: number[] = [10, 25, 50]

export { SORT_OPTIONS, TAKE_OPTIONS }
