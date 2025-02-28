import { useUnit } from 'effector-react'
import { FC } from 'react'

import { $isLoading } from '@entities/news'

import { cn } from '@shared/lib'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/ui'

import { $categories, $currentCategory, setCategory } from '../model/news-filter'

export const NewsFilter: FC = () => {
  const [categories, currentCategory, handleSetCategory] = useUnit([
    $categories,
    $currentCategory,
    setCategory
  ])
  const isLoading = useUnit($isLoading)

  return (
    <Select value={currentCategory} onValueChange={handleSetCategory} disabled={isLoading}>
      <SelectTrigger className={cn('h-8 flex-1 overflow-hidden', isLoading && 'disabled:cursor-progress')}>
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
