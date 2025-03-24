import { createEffect, createEvent, restore, sample } from 'effector'

import { AppStarted } from '@shared/config/init'

window.api.onDeviceConnected((state) => {
  setDeviceConnected(state)
})

const setDeviceConnected = createEvent<boolean>()

const $deviceConnected = restore(setDeviceConnected, false)

const getDeviceConnectedFx = createEffect(async () => {
  return await window.api.getDeviceConnection()
})

sample({
  clock: AppStarted,
  target: getDeviceConnectedFx
})

sample({
  clock: getDeviceConnectedFx.doneData,
  target: setDeviceConnected
})

export { $deviceConnected }

// $deviceConnected.watch((state) => console.log('device connected status: ', state))
