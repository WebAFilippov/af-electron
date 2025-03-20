import { FC } from 'react'
import { Link } from 'react-router-dom'

import { ICategory } from '@entities/categories/types'

import { Card, CardDescription, CardTitle } from '@shared/ui'

interface CategoryPreviewProps {
  category: ICategory
  onClick: () => void
}

export const CategoryPreview: FC<CategoryPreviewProps> = ({ category, onClick }) => {
  return (
    <Link to={category.slug} key={category.slug} onClick={onClick}>
      <Card className="h-full p-10 transition-shadow duration-300 hover:shadow-lg">
        <CardTitle>{category.title}</CardTitle>
        <CardDescription>{category.count}</CardDescription>
      </Card>
    </Link>
  )
}
