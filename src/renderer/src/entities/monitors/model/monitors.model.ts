import { AppStarter } from '@shared/model'
import { createEffect, createStore, sample } from 'effector'
import { createGate } from 'effector-react'
import { Display } from 'electron'

window.api.addPhysicalDisplay((newDisplay) => {
  addMonitorFx(newDisplay)
})
window.api.removePhysicalDisplay((oldDisplay) => {
  removeMonitorFx(oldDisplay)
})
window.api.changeMetricsPhisycalDisplay(({ display, changeMetrics }) => {
  console.log(display)
  console.log(changeMetrics)
})

const getMonitorsFx = createEffect(async () => {
  try {
    return window.api.getPhysicalDisplays()
  } catch (error) {
    throw new Error('Error getPhysicalDisplays()')
  }
})

const addMonitorFx = createEffect((newDisplay: Display): Display => {
  return newDisplay
})
const removeMonitorFx = createEffect((oldDisplay: Display): Display => {
  return oldDisplay
})

const $monitors = createStore<Display[]>([])
const $fetchMonitors = getMonitorsFx.pending

const MonitorsGate = createGate()

sample({
  clock: addMonitorFx.doneData,
  source: $monitors,
  fn: (monitors, newDisplay) => {
    const isAlreadyExists = monitors.some(
      (monitor) => monitor.id === newDisplay.id
    )
    return isAlreadyExists ? monitors : [...monitors, newDisplay]
  },
  target: $monitors
})

sample({
  clock: removeMonitorFx,
  source: $monitors,
  fn: (monitors, oldDisplay) => {
    return monitors.filter((monitor) => monitor.id !== oldDisplay.id)
  },
  target: $monitors
})

sample({
  clock: AppStarter,
  target: [getMonitorsFx]
})

sample({
  clock: getMonitorsFx.doneData,
  target: $monitors
})

export { MonitorsGate, $monitors, $fetchMonitors }

// $monitors.watch(console.log)
// $fetchMonitors.watch(console.log)
