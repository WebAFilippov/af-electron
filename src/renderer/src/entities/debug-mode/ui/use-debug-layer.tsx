import { useStoreMap, useUnit } from 'effector-react'
import { RefObject, useEffect, useRef } from 'react'

import { $debug, $debugMenu, DebugLayerInfo } from '../model/debug'

type ReturnProps<T extends HTMLElement> = {
  ref: RefObject<T>
}

export const useDebugLayer = <T extends HTMLElement>(
  layer: DebugLayerInfo['layer'] = 'unknown'
): ReturnProps<T> => {
  const ref = useRef<T>(null)

  const debug = useUnit($debug)
  const debugLayer = useStoreMap({
    store: $debugMenu,
    keys: [layer],
    fn: (store, [layer]) => {
      return (
        store.find((item) => item.layer === layer) || {
          enabled: true,
          layer: 'unknown',
          type: 'solid',
          color: '#FF0000'
        }
      )
    },
    updateFilter: (newValue, oldValue) => {
      return (
        newValue.enabled !== oldValue.enabled ||
        newValue.type !== oldValue.type ||
        newValue.color !== oldValue.color
      )
    }
  })

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    const originalOutline = element.style.outline
    const originalOutlineOffset = element.style.outlineOffset

    if (debug && debugLayer.enabled) {
      element.style.setProperty(
        'outline',
        `1px ${debugLayer.type} ${debugLayer.color}`,
        'important'
      )
      element.style.setProperty('outline-offset', '-1px', 'important')
    } else {
      element.style.outline = originalOutline
      element.style.outlineOffset = originalOutlineOffset
    }

    return () => {
      element.style.outline = originalOutline
      element.style.outlineOffset = originalOutlineOffset
    }
  }, [debug, debugLayer.enabled, debugLayer.type, debugLayer.color])

  return { ref }
}
