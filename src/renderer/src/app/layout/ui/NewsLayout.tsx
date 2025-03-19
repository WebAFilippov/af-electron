import { Outlet } from 'react-router-dom'

import { NewsTopbar } from '@widgets/news-topbar'

import { NewsFilterCount } from '@features/news-filter-count'
import { NewsFilterSearch } from '@features/news-filter-queryString'
import { NewsFilterSorting } from '@features/news-filter-sort'
import { NewsRefresh } from '@features/news-refresh'

export const NewsLayout = () => {
  return (
    <div className="relative flex h-full w-full select-none flex-col overflow-y-auto overflow-x-hidden">
      <NewsTopbar
        NewsRefresh={<NewsRefresh />}
        NewsFilterCount={<NewsFilterCount />}
        NewsFilterSorting={<NewsFilterSorting />}
        NewsFilterSearch={<NewsFilterSearch />}
      />

      <Outlet />
    </div>
  )
}
