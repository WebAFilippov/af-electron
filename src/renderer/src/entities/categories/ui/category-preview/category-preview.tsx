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
      <Card className="flex h-32 flex-col items-start justify-center p-8 transition-shadow duration-300 hover:shadow-lg">
        <span className="text- text-xl font-bold">{category.title}</span>
        <span className="text-lg italic text-muted-foreground">{category.count}</span>
      </Card>
    </Link>
  )
}
