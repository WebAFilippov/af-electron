import { useUnit } from 'effector-react'
import { ChevronsLeft } from 'lucide-react'
import { FC, ReactNode } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { $categories } from '@features/news-filter'

import { Button } from '@shared/ui'

interface Props {
  NewsRefresh: ReactNode
  NewsFilter: ReactNode
  NewsFilterSearch: ReactNode
}

export const NewsTopbar: FC<Props> = ({ NewsRefresh, NewsFilter, NewsFilterSearch }) => {
  const { category } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const categories = useUnit($categories)

  const BackButton =
    location.pathname !== `/news` ? (
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
          {NewsFilter}
          {NewsFilterSearch}
        </div>
      </div>
    </div>
  )
}
