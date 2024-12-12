'use client'

import { ChevronsUpDown } from 'lucide-react'
import { PropsWithChildren, useState } from 'react'

import { SearchCitiesParams } from '../../../../../shared/types'
import { Button } from './button'
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from './command'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

type Props<T> = {
  data: T[] | undefined
  isLoading: boolean
  isError: boolean
  searchQuery: string
  setSearchQuery: (value: string) => void
  selected: T | undefined
  setectedField: string | undefined
  comboboxPlaceholder?: string
  searchInputPlaceholder?: string
  loadingPlaceholder?: string
  notFoundPlaceholder?: string
}

export const SearchSelect = <T,>({
  children,
  data,
  isLoading,
  isError,
  searchQuery,
  setSearchQuery,
  selected,
  setectedField,
  comboboxPlaceholder = 'comboboxPlaceholder',
  searchInputPlaceholder = 'searchInputPlaceholder',
  loadingPlaceholder = 'loadingPlaceholder',
  notFoundPlaceholder = 'notFoundPlaceholder'
}: PropsWithChildren<Props<T>>) => {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between user-select-none"
        >
          {selected ? setectedField : comboboxPlaceholder}
          <ChevronsUpDown className="text-primary opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={searchInputPlaceholder}
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandGroup>
              {isLoading && (
                <CommandItem>
                  <div className="flex h-7 flex-col items-start justify-center text-muted-foreground">
                    {loadingPlaceholder}
                  </div>
                </CommandItem>
              )}
              {!isLoading && !data?.length && !isError && (
                <CommandItem>
                  <div className="flex h-7 flex-col items-start justify-center text-muted-foreground">
                    {notFoundPlaceholder}
                  </div>
                </CommandItem>
              )}
              {isError && !data?.length && (
                <CommandItem>
                  <div className="flex h-7 flex-col items-start justify-center text-muted-foreground">
                    Error
                  </div>
                </CommandItem>
              )}
              {children}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
