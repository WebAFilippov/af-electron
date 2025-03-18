import { useUnit } from 'effector-react'

import { SearchInput } from '@shared/ui'

import { $searchQuery, setSearchQuery } from '../model/search'

export const NewsFilterSearch = () => {
  const [searchQuery, handleSetSearchQuery] = useUnit([$searchQuery, setSearchQuery])

  return (
    <SearchInput
      defaultValue={searchQuery}
      onChange={(event) => handleSetSearchQuery(event.target.value)}
      isLoaded={false}
      placeholder="Поиск..."
    />
  )
}
