import { LoaderCircle, Search } from 'lucide-react'
import * as React from 'react'

import { cn } from '@shared/lib'

interface SearchInputProps extends React.ComponentProps<'input'> {
  isLoaded: boolean
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, type = 'text', isLoaded = false, ...props }, ref) => {
    return (
      <div className="group relative">
        <input
          type={type}
          className={cn(
            'flex h-8 w-full rounded-md border border-input bg-transparent py-1 pl-7 pr-3 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            className
          )}
          ref={ref}
          {...props}
        />
        {isLoaded ? (
          <LoaderCircle
            className={cn(
              'absolute left-2 top-2 h-4 w-4 animate-spin stroke-foreground/50 transition-colors',
              'group-focus-within:stroke-foreground'
            )}
          />
        ) : (
          <Search
            className={cn(
              'absolute left-2 top-2 h-4 w-4 stroke-foreground/50 transition-colors',
              'group-focus-within:stroke-foreground'
            )}
          />
        )}
      </div>
    )
  }
)

SearchInput.displayName = 'SearchInput'

export { SearchInput }
