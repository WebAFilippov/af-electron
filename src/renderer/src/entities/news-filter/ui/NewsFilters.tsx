import { useUnit } from 'effector-react'

import { $currentCategory, NewsFilter } from '@features/news-filter'
import { NewsFilterSearch } from '@features/news-filter-queryString'
import { NewsRefresh } from '@features/news-refresh'

export const NewsFilters = () => {
  const currentCategory = useUnit($currentCategory)

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between rounded-tl-2xl border-b bg-background/65 px-8 py-3 backdrop-blur-xl">
      <h1 className="text-3xl font-bold">{!currentCategory ? 'Новости' : currentCategory}</h1>
      <div className="flex items-center justify-center gap-2">
        <NewsRefresh />
        <NewsFilter />
        <NewsFilterSearch />
      </div>
    </div>
  )
}
