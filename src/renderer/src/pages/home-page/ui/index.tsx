import { createRoute } from 'atomic-router'
import { FC } from 'react'

import { DebugWrapper } from '@entities/debug-mode/ui/DebugWrapper'

export const homePage = createRoute()

export const HomePage: FC = () => {
  return (
    <div className="min-h-[1000rem]">
      <DebugWrapper layer="pages" />
      HOME
    </div>
  )
}
