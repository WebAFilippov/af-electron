


import { AppStarter } from '@shared/model'
import { createEffect, createEvent, createStore, sample } from 'effector'
import { createGate } from 'effector-react'
import { Display } from 'electron'
import { debounce } from 'patronum/debounce'

window.api.addedDisplay((data) => {
  addedDisplayFx(data)
})
window.api.removedDisplay((data) => {
  removedDisplayFx(data)
})
window.api.displayMetricsChange((data) => {
  displayMetricsChangeFx(data)
})

const getDisplaysFx = createEffect(async () => {
  try {
    return window.api.getDisplays()
  } catch (error) {
    throw new Error(`Error getDisplays ${error}}`)
  }
})

const addedDisplayFx = createEffect((newDisplay: Display): Display => {
  return newDisplay
})
const removedDisplayFx = createEffect((oldDisplay: Display): Display => {
  return oldDisplay
})
const displayMetricsChangeFx = createEffect(
  (data: {
    display: Display
    changeMetrics: string[]
  }): { display: Display; changeMetrics: string[] } => {
    return data
  }
)

const selectActiveDisplay = createEvent<number>()

const $displays = createStore<Array<Display>>([])
const $activeIdDisplay = createStore<number | null>(null)
const $pendingGetDisplay = getDisplaysFx.pending

$activeIdDisplay.on(getDisplaysFx.doneData, (_, displays) => displays[0].id)
$activeIdDisplay.on(selectActiveDisplay, (_, id) => id)

const MonitorsGate = createGate()

sample({
  clock: addedDisplayFx.doneData,
  source: $displays,
  fn: (displays, newDisplay) => [...displays, newDisplay],
  target: $displays
})

sample({
  clock: removedDisplayFx.doneData,
  source: $displays,
  fn: (displays, oldDisplay) => {
    return displays.filter((display) => display.id !== oldDisplay.id)
  },
  target: $displays
})

sample({
  clock: debounce({
    source: displayMetricsChangeFx.doneData,
    timeout: 300
  }),
  fn: (data) => {
    return [data.display]
  },
  target: $displays
})

sample({
  clock: getDisplaysFx.doneData,
  target: [$displays, $activeIdDisplay]
})

sample({
  clock: AppStarter,
  target: getDisplaysFx
})

export {
  MonitorsGate,
  $displays,
  $activeIdDisplay,
  $pendingGetDisplay,
  selectActiveDisplay
}

$displays.watch(console.log)
// $activeIdDisplay.watch(console.log)
// $activeDisplay.watch(console.log)
// $pendingGetDisplay.watch(console.log)
