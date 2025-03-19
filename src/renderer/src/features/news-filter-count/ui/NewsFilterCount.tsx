import { useUnit } from 'effector-react'

import { $currentTake, $take } from '@entities/news'

import { Button } from '@shared/ui'

import { setCurrentTake } from '../model/take'

export const NewsFilterCount = () => {
  const [take, currentTake, handleSetCurrentTake] = useUnit([$take, $currentTake, setCurrentTake])

  return (
    <div className='flex flex-col gap-2'>
      <h1 className="mt-2 select-none text-base font-bold leading-none">Количество</h1>
      <div className="flex justify-center">
        {take.map((option) => {
          return (
            <Button
              key={option}
              variant={option === currentTake ? 'default' : 'ghost'}
              className="max-h-6 w-full select-none rounded-none px-2 py-1 text-[0.7rem]"
              size="sm"
              onClick={() => handleSetCurrentTake(option)}
            >
              {option}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
