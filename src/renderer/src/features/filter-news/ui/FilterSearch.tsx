import { useUnit } from 'effector-react'
import { ChangeEvent, FC } from 'react'

import { fetchCategoriesFx } from '@entities/categories'

import { SearchInput } from '@shared/ui'

import { $searchInput, setSearchInput } from '../model/search'

export const FilterSearch: FC = () => {
  const [searchInput, handleSearchInput] = useUnit([$searchInput, setSearchInput])
  const isLoading = useUnit(fetchCategoriesFx.$pending)

  return (
    <SearchInput
      isLoaded={isLoading}
      value={searchInput}
      onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearchInput(e.target.value)}
      onRemove={() => {
        !isLoading && handleSearchInput('')
      }}
    />
  )
}
