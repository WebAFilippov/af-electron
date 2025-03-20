import { ChevronsLeft } from 'lucide-react'
import { FC, ReactNode } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { FilterNews } from '@features/filter-news'

import { Button } from '@shared/ui'

interface Props {
  NewsRefresh: ReactNode
}

export const NewsTopbar: FC<Props> = ({ NewsRefresh }) => {
  const { category, slug } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

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
        <h1 className="text-3xl font-bold">widget</h1>
        <div className="flex items-center justify-center gap-2">
          {NewsRefresh}
          <FilterNews />
        </div>
      </div>
    </div>
  )
}
