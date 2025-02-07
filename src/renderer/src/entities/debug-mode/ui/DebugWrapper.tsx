import { useStoreMap, useUnit } from 'effector-react'
import { FC, useEffect, useRef } from 'react'

import { $debug, $debugMenu, DebugLayerInfo } from '@entities/debug-mode/model/debug'

import { cn } from '@shared/lib'

interface DebugWrapperProps {
  layer?: DebugLayerInfo['layer']
}

export const DebugWrapper: FC<DebugWrapperProps> = ({ layer = 'unknown' }) => {
  const link = useRef<HTMLDivElement>(null)
  const debug = useUnit($debug)
  const debugLayer = useStoreMap({
    store: $debugMenu,
    keys: [layer],
    fn: (store, [layer]) => store.find((store) => store.layer === layer)
  })

  useEffect(() => {
    const parent = link.current?.parentElement

    if (parent) {
      if (debug && debugLayer?.enabled) {
        parent.style.setProperty(
          'border-top',
          `0.1rem ${debugLayer.type} ${debugLayer?.color}`,
          'important'
        )
        parent.style.setProperty(
          'border-right',
          `0.1rem ${debugLayer.type} ${debugLayer?.color}`,
          'important'
        )
        parent.style.setProperty(
          'border-bottom',
          `0.1rem ${debugLayer.type} ${debugLayer?.color}`,
          'important'
        )
        parent.style.setProperty(
          'border-left',
          `0.1rem ${debugLayer.type} ${debugLayer?.color}`,
          'important'
        )
      } else {
        parent.style.removeProperty('border-top')
        parent.style.removeProperty('border-right')
        parent.style.removeProperty('border-bottom')
        parent.style.removeProperty('border-left')
      }
    }
  }, [debug, debugLayer])

  return <div ref={link} className={cn('absolute right-0 top-0')} />
}
