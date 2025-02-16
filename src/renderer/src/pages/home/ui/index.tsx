import { FC } from 'react'

import { useDebugLayer } from '@entities/debug-mode/ui/use-debug-layer'

export const Home = () => {
  const { ref } = useDebugLayer<HTMLDivElement>('pages')
  return (
    <div ref={ref} className="min-h-[1000rem] border border-solid border-transparent">
      HOME
    </div>
  )
}
