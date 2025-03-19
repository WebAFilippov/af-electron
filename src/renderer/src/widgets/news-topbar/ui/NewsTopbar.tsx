import { useUnit } from 'effector-react'
import { ChevronsLeft } from 'lucide-react'
import { FC, ReactNode } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { $categories } from '@features/news-filter'

import { Button, Popover, PopoverContent, PopoverTrigger, Skeleton } from '@shared/ui'

interface Props {
  NewsRefresh: ReactNode
  NewsFilterSorting: ReactNode
  NewsFilterCount: ReactNode
  NewsFilterSearch: ReactNode
}

export const NewsTopbar: FC<Props> = ({
  NewsRefresh,
  NewsFilterSorting,
  NewsFilterCount,
  NewsFilterSearch
}) => {
  const { category, slug } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const categories = useUnit($categories)

  const BackButton =
    location.pathname === `/news/${slug}/detail` || location.pathname === `/news/${category}` ? (
      <Button
        variant="ghost"
        className="h-full rounded-none rounded-tl-2xl border-r border-border"
        onClick={() => navigate(-1)}
      >
        <ChevronsLeft className="h-8 w-8" strokeWidth={2} />
      </Button>
    ) : null

  return (
    <div className="sticky top-0 z-30 flex min-h-14 items-center rounded-tl-2xl border-b border-border bg-card/65 backdrop-blur-xl">
      {BackButton}
      <div className="flex w-full items-center justify-between px-4">
        <h1 className="text-3xl font-bold">
          {categories.find((c) => c.slug === category)?.title || 'Новости'}
        </h1>
        <div className="flex items-center justify-center gap-2">
          {NewsRefresh}
          {/* {NewsFilter} */}

          <Popover defaultOpen={false}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="h-8">
                Фильтр
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex divide-x-2 p-2" align="center">
              <div className="flex flex-col gap-2 pr-2">
                <h1 className="mt-1 select-none text-base font-bold leading-none">Категории</h1>
                <div className="custom-scrollbar flex max-h-[26rem] w-fit min-w-40 flex-col overflow-auto">
                  {/* {pending ? (
                    <Skeleton className="h-60 w-44 rounded-none" />
                  ) : (
                    categories.map((category) => {
                      return (
                        <Button
                          key={category.title}
                          variant={currentCategory === category.title ? 'default' : 'ghost'}
                          className="flex max-h-6 min-w-44 select-none items-center justify-between rounded-none px-3 py-1"
                          size="sm"
                          onClick={() => {
                            handleSetCurrentCategory(category.title)
                            navigate(`/news/${category.slug}`)
                          }}
                        >
                          <p>{category.title}</p>
                          <b>{category.count}</b>
                        </Button>
                      )
                    })
                  )} */}
                </div>
              </div>

              <div className="flex flex-col divide-y-2 pl-2">
                {NewsFilterSorting}
                {NewsFilterCount}
              </div>
            </PopoverContent>
          </Popover>

          {NewsFilterSearch}
        </div>
      </div>
    </div>
  )
}
