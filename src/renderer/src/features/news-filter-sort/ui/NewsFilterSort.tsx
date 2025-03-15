import { useUnit } from 'effector-react'
import { FC } from 'react'

import { cn } from '@shared/lib'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/ui'

import { $sort, setSort, Sort } from '../model/model'

export const NewsFilterSort: FC = () => {
  const [sort, handleSetSort] = useUnit([$sort, setSort])

  const sortOptions: { value: Sort; label: string }[] = [
    { value: { by: 'date', order: 'desc' }, label: 'Дата публикации' },
    { value: { by: 'date', order: 'asc' }, label: 'Дата публикации' },
  ]

  const currentValue = `${sort.by}-${sort.order}`

  return (
    <Select
      value={currentValue}
      onValueChange={(value) => {
        const [by, order] = value.split('-') as [Sort['by'], Sort['order']]
        handleSetSort({ by, order })
      }}
    >
      <SelectTrigger className={cn('h-8 w-fit overflow-hidden')}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem
            key={`${option.value.by}-${option.value.order}`}
            value={`${option.value.by}-${option.value.order}`}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
