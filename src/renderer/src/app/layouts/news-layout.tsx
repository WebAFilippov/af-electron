import { Outlet } from 'react-router-dom'

import { NewsTopbar } from '@widgets/news-topbar'

import { NewsRefresh } from '@features/news-refresh'

export const NewsLayout = () => {
  return (
    <div className="relative flex h-full w-full select-none flex-col overflow-y-auto overflow-x-hidden">
      <NewsTopbar NewsRefresh={<NewsRefresh />} />

      <Outlet />
    </div>
  )
}
