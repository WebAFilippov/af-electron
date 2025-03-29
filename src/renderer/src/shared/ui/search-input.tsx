import { LoaderCircle, Search, X } from 'lucide-react'
import { ChangeEvent, ComponentProps, forwardRef } from 'react'

import { cn } from '@shared/lib'

interface SearchInputProps extends ComponentProps<'input'> {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onRemove: () => void
  isLoaded: boolean
  value: string
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, type = 'text', isLoaded = false, value, onChange, onRemove, ...props }, ref) => {
    return (
      <div className="group relative">
        <input
          ref={ref}
          type={type}
          value={value}
          disabled={isLoaded}
          onChange={onChange}
          className={cn(
            'flex h-8 w-full rounded-md border border-input bg-transparent px-7 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-progress disabled:opacity-50 md:text-sm',
            className
          )}
          {...props}
        />
        {isLoaded ? (
          <LoaderCircle
            className={cn(
              'absolute left-2 top-2 h-4 w-4 animate-spin stroke-foreground/50 stroke-[3] transition-colors'
            )}
          />
        ) : (
          <Search
            className={cn(
              'absolute left-2 top-2 h-4 w-4 stroke-foreground/50 stroke-[3] transition-colors'
            )}
          />
        )}
        {value && (
          <X
            className={cn(
              'absolute right-2 top-2 h-4 w-4 cursor-pointer stroke-foreground/50 stroke-[3] transition-colors',
              !isLoaded && 'hover:stroke-foreground hover:stroke-[4]'
            )}
            onClick={onRemove}
          />
        )}
      </div>
    )
  }
)

SearchInput.displayName = 'SearchInput'

export { SearchInput }
