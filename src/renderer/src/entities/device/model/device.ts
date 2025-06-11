import { createEvent, restore } from 'effector'

// window.api.onDeviceConnected((state) => {
//   setDeviceConnected(state)
// })

const setDeviceConnected = createEvent<boolean>()

const $deviceConnected = restore(setDeviceConnected, false)

// const getDeviceConnectedFx = createEffect(async () => {
//   return await window.api.getDeviceConnection()
// })

// sample({
//   clock: AppStarted,
//   target: getDeviceConnectedFx
// })

// sample({
//   clock: getDeviceConnectedFx.doneData,
//   target: setDeviceConnected
// })

export { $deviceConnected }
