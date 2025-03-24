import { useUnit } from 'effector-react'
import { FC } from 'react'
import { Link } from 'react-router-dom'

import { setCurrentCategory } from '@features/filter-news'

import { Category } from '@entities/categories/types'

import { Card } from '@shared/ui'

interface CategoryPreviewProps {
  category: Category
}

export const CategoryPreview: FC<CategoryPreviewProps> = ({ category }) => {
  const handleSetCurrentCategory = useUnit(setCurrentCategory)

  return (
    <Link to={`/news/${category.id}`} onClick={() => handleSetCurrentCategory(category)}>
      <Card className="flex h-32 flex-col items-start justify-center p-8 transition-shadow duration-300 hover:shadow-lg">
        <span className="text- text-xl font-bold">{category.title}</span>
        <span className="text-lg italic text-muted-foreground">{category.count}</span>
      </Card>
    </Link>
  )
}
