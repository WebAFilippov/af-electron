import { FC } from 'react'
import { Link } from 'react-router-dom'

import { Card } from '@shared/ui'

import { Category } from '../../types'

interface CategoryPreviewProps {
  category: Category
  onClick: () => void
}

export const CategoryPreview: FC<CategoryPreviewProps> = ({ category, onClick }) => {
  return (
    <Link to={`/news/${category.id}`} onClick={onClick}>
      <Card className="flex h-24 flex-col items-start justify-center p-4 transition-all duration-300 hover:shadow-md">
        <span className="truncate text-lg font-semibold text-foreground">{category.title}</span>
        <span className="text-sm text-muted-foreground">{category.count} новостей</span>
      </Card>
    </Link>
  )
}
