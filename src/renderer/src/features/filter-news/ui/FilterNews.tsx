// import { useUnit } from 'effector-react'
// import { Link } from 'react-router-dom'

// import { $categories, $currentCategory, fetchCategoriesFx } from '@entities/categories'

// import { Button, Popover, PopoverContent, PopoverTrigger, Skeleton } from '@shared/ui'

// import { setCurrentCategory } from '../model/categories'
// import { $currentSorting, $sorting, setCurrentSorting } from '../model/sorting'
// import { $currentTake, $take, setCurrentTake } from '../model/take'

// export const FilterNews = () => {
//   const [categories, currentCategory, isLoading] = useUnit([
//     $categories,
//     $currentCategory,
//     fetchCategoriesFx.$pending
//   ])
//   const [sorting, currentSorting, handleSetCurrentSorting] = useUnit([
//     $sorting,
//     $currentSorting,
//     setCurrentSorting
//   ])
//   const [take, currentTake, handleSetCurrentTake] = useUnit([$take, $currentTake, setCurrentTake])
//   const handleSelectCurrentCetegory = useUnit(setCurrentCategory)

//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button variant="outline" className="h-8">
//           Фильтр
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="flex divide-x-2 p-2" align="center">
//         <div className="flex flex-col gap-2 pr-2">
//           <h1 className="mt-1 select-none text-base font-bold leading-none">Категории</h1>
//           <div className="custom-scrollbar flex max-h-[26rem] w-fit min-w-40 flex-col overflow-auto">
//             {isLoading ? (
//               <Skeleton className="h-60 w-44 rounded-none" />
//             ) : (
//               categories.map((category) => {
//                 return (
//                   <Link
//                     key={category.id}
//                     to={`/news/${category.id}`}
//                     className="select-none"
//                     onClick={() => handleSelectCurrentCetegory(category)}
//                   >
//                     <Button
//                       variant={currentCategory?.id === category.id ? 'default' : 'ghost'}
//                       className="flex max-h-6 min-w-44 select-none items-center justify-between rounded-none px-3 py-1"
//                       size="sm"
//                     >
//                       <p>{category.title}</p>
//                       <b>{category.count}</b>
//                     </Button>
//                   </Link>
//                 )
//               })
//             )}
//           </div>
//         </div>
//         <div className="flex flex-col divide-y-2 pl-2">
//           <div className="flex flex-1 flex-col gap-2">
//             <h1 className="mt-1 select-none text-base font-bold leading-none">Сортировка</h1>
//             <div className="mb-2 flex max-h-[22rem] min-w-32 flex-col overflow-auto">
//               {sorting.map((option) => {
//                 return (
//                   <Button
//                     key={option.label}
//                     variant={
//                       currentSorting.by === option.value.by &&
//                       currentSorting.order === option.value.order
//                         ? 'default'
//                         : 'ghost'
//                     }
//                     className="max-h-6 select-none items-center justify-start rounded-none px-2 py-1 text-[0.7rem]"
//                     size="sm"
//                     onClick={() =>
//                       handleSetCurrentSorting({ by: option.value.by, order: option.value.order })
//                     }
//                   >
//                     {option.label}
//                   </Button>
//                 )
//               })}
//             </div>
//           </div>
//           <div className="flex flex-col gap-2">
//             <h1 className="mt-2 select-none text-base font-bold leading-none">Количество</h1>
//             <div className="flex justify-center">
//               {take.map((option) => {
//                 return (
//                   <Button
//                     key={option}
//                     variant={option === currentTake ? 'default' : 'ghost'}
//                     className="max-h-6 w-full select-none rounded-none px-2 py-1 text-[0.7rem]"
//                     size="sm"
//                     onClick={() => handleSetCurrentTake(option)}
//                   >
//                     {option}
//                   </Button>
//                 )
//               })}
//             </div>
//           </div>
//         </div>
//       </PopoverContent>
//     </Popover>
//   )
// }
