import { useUnit } from 'effector-react'
import { FC } from 'react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/ui'

import { $categories, $currentCategory, setCategory } from '../model/news-filter'

interface NewsFilterProps {
  disabled: boolean
}

export const NewsFilter: FC<NewsFilterProps> = ({ disabled }) => {
  const [categories, currentCategory, handleSetCategory] = useUnit([
    $categories,
    $currentCategory,
    setCategory
  ])

  return (
    <Select value={currentCategory} onValueChange={handleSetCategory} disabled={disabled}>
      <SelectTrigger className="h-8 w-48">
        <SelectValue placeholder="Выберите категорию" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
