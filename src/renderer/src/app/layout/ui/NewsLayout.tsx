import { Outlet } from 'react-router-dom'

import { NewsTopbar } from '@widgets/news-topbar'

import { NewsFilter } from '@features/news-filter'
import { NewsFilterSearch } from '@features/news-filter-queryString'
import { NewsRefresh } from '@features/news-refresh'

export const NewsLayout = () => {
  return (
    <div className="relative flex h-full w-full select-none flex-col overflow-y-auto overflow-x-hidden">
      <NewsTopbar
        NewsRefresh={<NewsRefresh />}
        NewsFilter={<NewsFilter />}
        NewsFilterSearch={<NewsFilterSearch />}
      />

      <Outlet />
    </div>
  )
}
