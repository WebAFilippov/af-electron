import { createEvent, restore } from 'effector'

window.api.onDeviceConnected((state) => {
  setDeviceConnected(state)
})

const setDeviceConnected = createEvent<boolean>()

const $deviceConnected = restore(setDeviceConnected, false)

export { $deviceConnected }

// $deviceConnected.watch((state) => console.log('device connected status: ', state))
