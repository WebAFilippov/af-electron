import { createEffect, createEvent, createStore, sample } from 'effector'

import { MOBILE_BREAKPOINT } from '@shared/config/constant'

const widthUpdated = createEvent<number>()
const $isMobile = createStore(false)

const getWindowWidthFx = createEffect(async () => {
  const width = await window.api.getWindowWidth()
  return width
})

window.api.onUpdateWindowWidth((width) => {
  widthUpdated(width)
})

sample({
  clock: [getWindowWidthFx.doneData, widthUpdated],
  fn: (width) => width <= MOBILE_BREAKPOINT,
  target: $isMobile
})

await getWindowWidthFx()

export { $isMobile, getWindowWidthFx }
