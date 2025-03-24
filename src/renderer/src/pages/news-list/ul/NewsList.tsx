import { useUnit } from 'effector-react'
import { ChevronsLeft } from 'lucide-react'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { FilterNews, FilterSearch } from '@features/filter-news'
import { NewsRefresh } from '@features/news-refresh'

import { $currentCategory } from '@entities/categories'
import { fetchNewsQuery, NewsPreviewObserver } from '@entities/news'

import { Button } from '@shared/ui'

export const NewsList: FC = () => {
  const navigate = useNavigate()

  const [currentCategory] = useUnit([$currentCategory])

  const [isLoading] = useUnit([fetchNewsQuery.$pending])

  return (
    <div className="relative flex h-full w-full select-none flex-col overflow-y-auto overflow-x-hidden">
      <div className="sticky top-0 z-30 flex min-h-14 items-center justify-start gap-4 rounded-tl-2xl border-b border-border bg-card/65 backdrop-blur-xl">
        <Button
          variant="ghost"
          className="h-full rounded-none rounded-tl-2xl border-r border-border"
          onClick={() => navigate('/news')}
        >
          <ChevronsLeft className="h-8 w-8 stroke-2" />
        </Button>
        <NewsRefresh isLoading={isLoading} />
        <div className="flex w-full items-center justify-between gap-4 pr-4">
          <h1 className="text-3xl font-bold">{currentCategory?.title}</h1>
          <div className="flex items-center justify-center gap-2">
            <FilterNews />
            <FilterSearch />
          </div>
        </div>
      </div>
      <div className="relative grid h-full w-full select-none grid-cols-4 flex-col gap-6 overflow-y-auto overflow-x-hidden p-10"></div>
      <NewsPreviewObserver />
    </div>
  )
}
