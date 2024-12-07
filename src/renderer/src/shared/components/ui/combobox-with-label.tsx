'use client'

import { ArrowUpCircle, CheckCircle2, Circle, HelpCircle, LucideIcon, XCircle } from 'lucide-react'
import * as React from 'react'

import { cn } from '@shared/lib/utils'

import { Button } from './button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from './command'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

type Status = {
  value: string
  label: string
  icon: LucideIcon
}

const statuses: Status[] = [
  
]

export function ComboboxPopover() {
  const [open, setOpen] = React.useState(false)
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(null)

  return (
    <div className="flex items-center space-x-4">
      <p className="text-sm text-muted-foreground">Добавить город:</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="w-[150px] justify-start">
            {selectedStatus ? (
              <>
                <selectedStatus.icon className="mr-2 h-4 w-4 shrink-0" />
                {selectedStatus.label}
              </>
            ) : (
              <></>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={(value) => {
                      setSelectedStatus(
                        statuses.find((priority) => priority.value === value) || null
                      )
                      setOpen(false)
                    }}
                  >
                    <status.icon
                      className={cn(
                        'mr-2 h-4 w-4',
                        status.value === selectedStatus?.value ? 'opacity-100' : 'opacity-40'
                      )}
                    />
                    <span>{status.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
