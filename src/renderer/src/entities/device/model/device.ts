import { createEvent, restore } from 'effector'

window.api.isConnectedDevice((state) => {
  setDeviceConnected(state)
})

const setDeviceConnected = createEvent<boolean>()

const $deviceConnected = restore(setDeviceConnected, false)

export { $deviceConnected }
