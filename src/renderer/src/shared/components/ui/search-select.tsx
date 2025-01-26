// 'use client'

// import { Check, ChevronsUpDown, PlusIcon } from 'lucide-react'
// import { PropsWithChildren, useState } from 'react'

// import { City } from '@pages/weather-page/model/types'


// import { useAppSelector, useToast } from '@shared/hooks'
// import { cn } from '@shared/lib'
// import { formatFullAdressCity } from '@shared/utils'

// import { Button } from './button'
// import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from './command'
// import { Popover, PopoverContent, PopoverTrigger } from './popover'
// // import { getAllCityWeather } from '@entities/city'

// type Props = {
//   data: City[] | undefined
//   isLoading: boolean
//   isError: boolean
//   searchQuery: string
//   setSearchQuery: (value: string) => void
//   selectedCity: City | undefined
//   setectedField: string | undefined
//   handleSetActive: (value: City | undefined) => void
//   handleFetchCreate: (value: number) => void
//   comboboxPlaceholder?: string
//   searchInputPlaceholder?: string
//   loadingPlaceholder?: string
//   notFoundPlaceholder?: string
// }

// export const SearchSelect = ({
//   data,
//   isLoading,
//   isError,
//   searchQuery,
//   setSearchQuery,
//   selectedCity,
//   setectedField,
//   handleSetActive,
//   handleFetchCreate,
//   comboboxPlaceholder = 'comboboxPlaceholder',
//   searchInputPlaceholder = 'searchInputPlaceholder',
//   loadingPlaceholder = 'loadingPlaceholder',
//   notFoundPlaceholder = 'notFoundPlaceholder'
// }: PropsWithChildren<Props>) => {
//   const { toast } = useToast()
//   // const CityForWeather = useAppSelector(getAllCityWeather)

//   const [open, setOpen] = useState(false)

//   return (
//     <div className="flex items-center justify-end gap-1">
//       <Popover open={open} onOpenChange={setOpen}>
//         <PopoverTrigger asChild>
//           <Button
//             disabled={CityForWeather.length === 10}
//             variant="outline"
//             role="combobox"
//             aria-expanded={open}
//             className="w-[300px] justify-between user-select-none"
//           >
//             {selectedCity ? setectedField : comboboxPlaceholder}
//             <ChevronsUpDown className="text-primary opacity-50" />
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-[300px] p-0">
//           <Command shouldFilter={false}>
//             <CommandInput
//               placeholder={searchInputPlaceholder}
//               value={searchQuery}
//               onValueChange={setSearchQuery}
//             />
//             <CommandList>
//               <CommandGroup>
//                 {isLoading && (
//                   <CommandItem>
//                     <div className="flex h-7 flex-col items-start justify-center text-muted-foreground">
//                       {loadingPlaceholder}
//                     </div>
//                   </CommandItem>
//                 )}
//                 {!isLoading && !data?.length && !isError && (
//                   <CommandItem>
//                     <div className="flex h-7 flex-col items-start justify-center text-muted-foreground">
//                       {notFoundPlaceholder}
//                     </div>
//                   </CommandItem>
//                 )}
//                 {isError && !data?.length && (
//                   <CommandItem>
//                     <div className="flex h-7 flex-col items-start justify-center text-muted-foreground">
//                       Error
//                     </div>
//                   </CommandItem>
//                 )}
//                 {data &&
//                   data.map((item) => (
//                     <CommandItem
//                       key={item.id}
//                       value={item.city}
//                       onSelect={(currentValue) => {
//                         currentValue === selectedCity?.city
//                           ? handleSetActive(undefined)
//                           : handleSetActive(item)
//                       }}
//                     >
//                       <div className="flex cursor-pointer flex-col items-start justify-start border-border text-primary">
//                         <span>{item.city}</span>
//                         <span className="text-xs text-muted-foreground">
//                           {formatFullAdressCity({
//                             type_region: item.type_region,
//                             region: item.region
//                           })}
//                         </span>
//                       </div>
//                       <Check
//                         className={cn(
//                           'ml-auto text-primary',
//                           selectedCity?.id === item.id ? 'opacity-100' : 'opacity-0'
//                         )}
//                       />
//                     </CommandItem>
//                   ))}
//               </CommandGroup>
//             </CommandList>
//           </Command>
//         </PopoverContent>
//       </Popover>

//       <Button
//         variant="outline"
//         size="icon"
//         disabled={CityForWeather.length === 10}
//         onClick={() => {
//           if (selectedCity) {
//             try {
//               handleFetchCreate(selectedCity.id)

//               toast({
//                 title: 'Scheduled: Catch up',
//                 description: 'Friday, February 10, 2023 at 5:57 PM'
//               })
//             } catch (error) {
//               toast({
//                 title: 'Scheduled: Catch up',
//                 description: '111111111111'
//               })
//             }
//           } else {
//             toast({
//               title: 'Внимание',
//               description: 'Выберите город',
//               defaultChecked: true
//             })
//           }
//         }}
//       >
//         <PlusIcon />
//       </Button>
//     </div>
//   )
// }
